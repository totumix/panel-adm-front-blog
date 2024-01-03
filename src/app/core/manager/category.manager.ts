import { Injectable } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryManager {

    constructor(private _categoryService: CategoryService) { }

    getCategories() {
        return this._categoryService.getCategories()
    }
}