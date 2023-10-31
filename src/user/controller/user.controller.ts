import { Controller, Post } from "@nestjs/common";

@Controller("/api/users")
export class UserController {
  @Post("me")
  async getUserInformation() {
    return { ok: true };
  }

  @Post("/api/login")
  async login() {}
}
