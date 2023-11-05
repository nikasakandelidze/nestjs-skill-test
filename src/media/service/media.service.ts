import { Injectable, Logger } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { CreateMediaDto } from "../controller/dto/create-media.dto";
import { Client } from "../../user/entities/client.entity";
import { Photo } from "../entities/photo.entity";
import { S3Service } from "./s3.service";
import { Readable } from "stream";

@Injectable()
export class MediaService {
  private logger: Logger = new Logger(MediaService.name);

  constructor(
    private dataSource: DataSource,
    private readonly s3Service: S3Service,
  ) {}

  async saveFilesForClient(
    files: Express.Multer.File[],
    clientId: string,
    manager: EntityManager,
  ): Promise<Photo[]> {
    return await Promise.all(
      files.map(async (file) => {
        const url: { url: string } = await this.s3Service.uploadFile(
          Readable.from(file.buffer),
          file.originalname,
        );
        return this.storeMediaMetadataOfFile(
          {
            originalname: file.originalname,
            filename: url.url,
          },
          clientId,
          manager,
        );
      }),
    );
  }

  async storeMediaMetadataOfFile(
    file: { originalname: string; filename: string },
    userId: string,
    manager?: EntityManager,
  ): Promise<Photo> {
    return this.storeMedia(
      {
        name: file.originalname,
        userId,
        url: `${file.filename}`, //change this part in case of using other implementations
      },
      manager,
    );
  }

  async storeMedia(
    createMediaDto: CreateMediaDto,
    manager?: EntityManager,
  ): Promise<Photo> {
    if (manager) {
      return this.storeMediaWithEntityManager(createMediaDto, manager);
    } else {
      return this.dataSource.transaction(async (manager: EntityManager) =>
        this.storeMediaWithEntityManager(createMediaDto, manager),
      );
    }
  }

  private async storeMediaWithEntityManager(
    media: CreateMediaDto,
    manager: EntityManager,
  ): Promise<Photo> {
    const client: Client = await manager.findOne(Client, {
      where: { id: media.userId },
    });
    return await manager.save(
      Photo,
      manager.create(Photo, { ...media, user: client }),
    );
  }
}
