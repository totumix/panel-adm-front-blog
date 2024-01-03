import { AUTH_DATA, Storage } from "../storage";

export class Article {
    _id: string;
    user: string;
    category: string;
    name: string;
    image: string;
    description: string;
    creation_date: number;
    enabled: Boolean;
    constructor() {
        this.user = Storage.getAll(AUTH_DATA).user?._id;
        this.category = '';
        this.name = '';
        this.image = '';
        this.description = '';
        this.creation_date = 0;
        this.enabled = false;
    }
}