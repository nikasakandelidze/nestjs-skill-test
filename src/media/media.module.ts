import { Module } from "@nestjs/common";
import { Photo } from "./entities/photo.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  exports: [TypeOrmModule],
})
export class MediaModule {}
