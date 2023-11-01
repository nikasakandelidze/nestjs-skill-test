import { ChildEntity, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Photo } from "../../media/entities/photo.entity";

@ChildEntity("Client")
export class Client extends User {
  @Column()
  avatar: string;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];
}
