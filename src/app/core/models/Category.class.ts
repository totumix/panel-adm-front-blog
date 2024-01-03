export class Category {
    _id: string;
    name: string;
    create_at: number;
    enabled: boolean;
    constructor() {
        this._id = "";
        this.name = "";
        this.create_at = 0;
        this.enabled = true;
    }
}