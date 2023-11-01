import { Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { AuthController } from "./controller/auth.controller";
import { MediaModule } from "../media/media.module";
import { CryptoService } from "./service/crypto.service";

@Module({
  imports: [MediaModule],
  providers: [AuthService, CryptoService],
  controllers: [AuthController],
})
export class AuthModule {}
