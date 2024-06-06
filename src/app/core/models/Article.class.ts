import { AUTH_DATA, Storage } from "../storage";

export class Article {
    _id: string;
    title: string;
    user: string;
    content: string;
    create_at: number;
    images: any;
    posts: any;
    constructor() {
        this.user = Storage.getAll(AUTH_DATA).user?._id;
        this.title = '';
        this.content = '';
        this.create_at = 0;
        this.images = [];
        this.posts = [];
    }
}