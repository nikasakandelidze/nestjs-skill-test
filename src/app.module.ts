import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./config/type-orm-config.service";
import { AuthModule } from "./auth/auth.module";
import { MediaModule } from "./media/media.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
    }),
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === "development" ? ".env.development" : ".env", //In case of production no development flag will be passed and .env.development will be ignored
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthModule,
    MediaModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
})
export class AppModule {}
