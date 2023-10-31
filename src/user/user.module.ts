import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Photo } from "./entities/photo.entity";
import { Client } from "./entities/client.entity";
import { UserService } from "./service/user.service";
import { UserController } from "./controller/user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo, Client])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
