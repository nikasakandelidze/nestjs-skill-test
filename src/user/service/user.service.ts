import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { Client } from "../entities/client.entity";
import { NOT_FOUND_MESSAGE } from "../../utils/constants";

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async getUserInformation(userId: string) {
    console.log(userId);
    return this.dataSource.transaction(async (manager: EntityManager) => {
      const client: Client = await manager.findOne(Client, {
        where: { id: userId },
      });
      if (!client) {
        throw new NotFoundException({
          message: NOT_FOUND_MESSAGE("User", "id"),
        });
      }
      delete client["password"];
      return client;
    });
  }
}
