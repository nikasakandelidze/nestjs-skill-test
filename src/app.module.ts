import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./config/type-orm-config.service";
import { CryptoModule } from "./crypto/crypto.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === "development" ? ".env.development" : ".env", //In case of production no development flag will be passed and .env.development will be ignored
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    CryptoModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
})
export class AppModule {}
