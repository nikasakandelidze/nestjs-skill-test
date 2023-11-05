import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "./dto/login.dto";
import { S3_STORAGE_OPTIONS } from "../../config/file-upload.config";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { UploadFiles } from "../../utils/types";

@Controller("api")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "photos" }], S3_STORAGE_OPTIONS),
  )
  async register(
    @Body() registerDto: RegisterDto,
    @UploadedFiles()
    files: UploadFiles,
  ) {
    return this.authService.registerClient(registerDto, files);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
