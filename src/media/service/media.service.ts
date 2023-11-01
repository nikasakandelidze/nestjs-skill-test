import { DataSource, EntityManager } from "typeorm";
import { CreateMediaDto } from "../controller/dto/create-media.dto";
import { Client } from "../../user/entities/client.entity";
import { Photo } from "../entities/photo.entity";
import { UploadFiles } from "../../utils/types";

export class MediaService {
  constructor(private dataSource: DataSource) {}

  async storeMediaFromUploadedFiles(
    files: UploadFiles,
    userId: string,
    entityManager?: EntityManager,
  ): Promise<Photo[]> {
    const medias: CreateMediaDto[] = files.photos.map((file) => {
      return {
        name: file.originalname,
        userId,
        url: `${file.filename}`, //change this part
      };
    });
    return this.storeMedia(medias, entityManager);
  }

  async storeMedia(
    createMediaDtos: CreateMediaDto[],
    manager?: EntityManager,
  ): Promise<Photo[]> {
    if (manager) {
      return this.storeMediasWithEntityManager(createMediaDtos, manager);
    } else {
      return this.dataSource.transaction(async (manager: EntityManager) =>
        this.storeMediasWithEntityManager(createMediaDtos, manager),
      );
    }
  }

  private async storeMediasWithEntityManager(
    createMediaDtos: CreateMediaDto[],
    manager: EntityManager,
  ): Promise<Photo[]> {
    return Promise.all(
      createMediaDtos.map(async (media: CreateMediaDto) => {
        const client: Client = await manager.findOne(Client, {
          where: { id: media.userId },
        });
        return await manager.save(
          Photo,
          manager.create(Photo, { ...media, user: client }),
        );
      }),
    );
  }
}
