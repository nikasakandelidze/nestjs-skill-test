import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { Client } from "../entities/client.entity";
import {
  NOT_FOUND_MESSAGE,
  SPECIFIED_MEDIA_NOT_FOUND,
} from "../../utils/constants";
import { S3Service } from "../../media/service/s3.service";
import { Photo } from "../../media/entities/photo.entity";
import { Readable } from "stream";

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly s3Service: S3Service,
  ) {}

  async getUserInformation(userId: string) {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      const client: Client = await manager.findOne(Client, {
        where: { id: userId },
        relations: ["photos"],
      });
      if (!client) {
        throw new NotFoundException({
          message: NOT_FOUND_MESSAGE("User", "id"),
        });
      }
      delete client["password"];
      return client;
    });
  }

  async getMediaForUser(mediaId: string, userId: string): Promise<Readable> {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      const client: Client = await manager.findOne(Client, {
        where: { id: userId },
        relations: ["photos"],
      });
      if (!client) {
        throw new NotFoundException({
          message: NOT_FOUND_MESSAGE("User", "Id"),
        });
      }
      const photo: Photo = client.photos.find((e) => e.id === mediaId);
      if (!photo) {
        throw new BadGatewayException({ message: SPECIFIED_MEDIA_NOT_FOUND });
      }
      return this.s3Service.getMedia(photo.name);
    });
  }
}
