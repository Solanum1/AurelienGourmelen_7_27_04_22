export class MessageModel {
    title!: string;
    content!: string;
    attachment!: string;
    likes!: number;

    constructor(title: string, content: string, attachment: string,  likes: number) {
        this.title = title;
        this.content = content;
        this.attachment = attachment;
        this.likes = likes;
    }
}