import {
  Controller,
  UseGuards,
  Request,
  Get,
  Res,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "../../auth/service/crypto.service";
import { UserService } from "../service/user.service";
import { Readable } from "stream";
import { Response } from "express";

@Controller("/api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseGuards(AuthGuard)
  async getUserInformation(@Request() request: any) {
    const user: { sub: string } = request["user"];
    return this.userService.getUserInformation(user.sub);
  }

  /* 
    Note: This endpoint might be used in use case of photos being available only for logged in users and not directly by publicly available links.
    If this is the use case, we'll also need to eliminate returning public links to users
  */
  @Get("media/:mediaId")
  @UseGuards(AuthGuard)
  async getImage(
    @Param("mediaId") mediaId: string,
    @Request() request: any,
    @Res() res: Response,
  ) {
    const user: { sub: string } = request["user"];
    const stream: Readable = await this.userService.getMediaForUser(
      mediaId,
      user.sub,
    );
    stream.pipe(res);
  }
}
