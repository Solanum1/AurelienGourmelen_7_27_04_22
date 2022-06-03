export class MessageModel {
    id!: number;
    title!: string;
    content!: string;
    attachment!: string;
    likes!: number;

    constructor(id: number, title: string, content: string, attachment: string,  likes: number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.attachment = attachment;
        this.likes = likes;
    }
}