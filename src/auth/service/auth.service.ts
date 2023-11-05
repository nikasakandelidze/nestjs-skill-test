import { MediaService } from "./../../media/service/media.service";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "../controller/dto/register.dto";
import { LoginDto } from "../controller/dto/login.dto";
import { DataSource, EntityManager } from "typeorm";
import { Client } from "../../user/entities/client.entity";
import {
  ALREADY_EXISTS_MESSAGE,
  AUTHORIZATION_ERROR_MESSAGE,
  CRYPTO_SALT,
  DEFAULT_AVATAR,
  NOT_FOUND_MESSAGE,
  Roles,
} from "../../utils/constants";
import * as bcrypt from "bcrypt";
import { UploadFiles } from "../../utils/types";
import { Photo } from "../../media/entities/photo.entity";
import { CryptoService } from "./crypto.service";

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private mediaService: MediaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async registerClient(registerDto: RegisterDto, files: UploadFiles) {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      const client: Client = await manager.findOneBy(Client, {
        email: registerDto.email,
      });
      if (!client) {
        registerDto.password = await bcrypt.hash(
          registerDto.password,
          CRYPTO_SALT,
        );
        registerDto.role = Roles.CLIENT;
        // TODO: Maybe change this later with local file and serving it from assets to not be dependant on WEB resources
        if (!registerDto.avatar) {
          registerDto.avatar = DEFAULT_AVATAR;
        }
        const createdClient: Client = await manager.save(
          manager.create(Client, { ...registerDto }),
        );
        let photos: Photo[] = [];
        if (files.photos.length) {
          photos = await this.mediaService.saveFilesForClient(
            files.photos,
            createdClient.id,
            manager,
          );
        }
        delete createdClient["password"];
        photos = photos.map((photo) => {
          delete photo["user"];
          return photo;
        });
        return { ...createdClient, photos };
      } else {
        throw new BadRequestException({
          message: ALREADY_EXISTS_MESSAGE("User", "Email"),
        });
      }
    });
  }

  async loginUser(loginDto: LoginDto) {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      const client: Client = await manager.findOne(Client, {
        where: { email: loginDto.email },
      });
      if (!client) {
        throw new BadRequestException({
          message: NOT_FOUND_MESSAGE("User", "Email"),
        });
      }
      const passwordCorrect: boolean = await bcrypt.compare(
        loginDto.password,
        client.password,
      );
      if (!passwordCorrect) {
        throw new UnauthorizedException({
          message: AUTHORIZATION_ERROR_MESSAGE,
        });
      }
      const jwtToken: string = await this.cryptoService.generateJwt(client);
      return { token: jwtToken };
    });
  }
}
