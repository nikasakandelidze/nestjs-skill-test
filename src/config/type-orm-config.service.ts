import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.config.get<string>("POSTGRES_HOST"),
      port: this.config.get<number>("POSTGRES_PORT"),
      database: this.config.get<string>("POSTGRES_DB"),
      username: this.config.get<string>("POSTGRES_USER"),
      password: this.config.get<string>("POSTGRES_PASSWORD"),
      entities: ["dist/**/**.entity{.js,.ts}"],
      migrations: ["dist/**/**-migrations.js"],
      migrationsRun: false,
      synchronize: true,
    };
  }
}
