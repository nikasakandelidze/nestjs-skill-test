import { Column, Entity } from "typeorm";
import { User } from "./user.entity";
import { Photo } from "./photo.entity";

@Entity()
export class Client extends User {
  @Column()
  avatar: string;

  @Column({ type: "jsonb" })
  photos: Array<Photo>;
}
