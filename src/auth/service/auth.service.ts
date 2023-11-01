import { MediaService } from "./../../media/service/media.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterDto } from "../controller/dto/register.dto";
import { LoginDto } from "../controller/dto/login.dto";
import { DataSource, EntityManager } from "typeorm";
import { Client } from "../../user/entities/client.entity";
import { ALREADY_EXISTS_MESSAGE, DEFAULT_AVATAR } from "../../utils/constants";
import * as bcrypt from "bcrypt";
import { UploadFiles } from "../../utils/types";
import { Photo } from "../../media/entities/photo.entity";

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private mediaService: MediaService,
  ) {}

  async registerUser(registerDto: RegisterDto, files: UploadFiles) {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      const client: Client = await manager.findOneBy(Client, {
        email: registerDto.email,
      });
      if (!client) {
        registerDto.password = await bcrypt.hash(registerDto.password, 10);
        // Maybe change this with local file and serving it from assets to not be dependant on WEB
        if (!registerDto.avatar) {
          registerDto.avatar = DEFAULT_AVATAR;
        }
        const createdClient: Client = await manager.save(
          manager.create(Client, { ...registerDto }),
        );
        const photos: Photo[] =
          await this.mediaService.storeMediaFromUploadedFiles(
            files,
            createdClient.id,
            manager,
          );
        delete createdClient["password"];
        return { ...createdClient, photos };
      } else {
        throw new BadRequestException({
          message: ALREADY_EXISTS_MESSAGE("user", "email"),
        });
      }
    });
  }

  async loginUser(loginDto: LoginDto) {
    console.log(loginDto);
  }
}
