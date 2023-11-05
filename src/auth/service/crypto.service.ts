import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Client } from "../../user/entities/client.entity";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class CryptoService {
  private JWT_SECRET: string;
  private readonly logger: Logger = new Logger(CryptoService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_SECRET = this.configService.get("JWT_SECRET");
  }

  async generateJwt(user: Client): Promise<string> {
    const signResult: string = await this.jwtService.signAsync(
      {
        sub: user.id,
        username: user.email,
      },
      {
        secret: this.JWT_SECRET,
      },
    );
    return signResult;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  private JWT_SECRET: string;
  private logger: Logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_SECRET = this.configService.get("JWT_SECRET");
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.JWT_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request["user"] = payload;
    } catch (err) {
      this.logger.warn(err);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
