import { Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { AuthController } from "./controller/auth.controller";
import { MediaModule } from "../media/media.module";

@Module({
  imports: [MediaModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
