import { Like } from "./like.model";
import { User } from "./user.model";


export class Message {
    id!: number;
    title!: string;
    content!: string;
    attachment!: string;
    createdAt!: Date;
    User!: User;
    Likes!: [Like];
}