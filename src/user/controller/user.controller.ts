import { Controller, UseGuards, Request, Get } from "@nestjs/common";
import { AuthGuard } from "../../auth/service/crypto.service";
import { UserService } from "../service/user.service";

@Controller("/api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseGuards(AuthGuard)
  async getUserInformation(@Request() request: any) {
    console.log(123);
    const user: { sub: string } = request["user"];
    return this.userService.getUserInformation(user.sub);
  }
}
