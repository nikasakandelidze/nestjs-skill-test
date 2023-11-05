import { Module } from "@nestjs/common";
import { Photo } from "./entities/photo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaService } from "./service/media.service";
import { S3Service } from "./service/s3.service";

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  exports: [TypeOrmModule, MediaService],
  providers: [MediaService, S3Service],
})
export class MediaModule {}
