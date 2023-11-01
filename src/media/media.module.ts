import { Module } from "@nestjs/common";
import { Photo } from "./entities/photo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaService } from "./service/media.service";

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  exports: [TypeOrmModule, MediaService],
  providers: [MediaService],
})
export class MediaModule {}
