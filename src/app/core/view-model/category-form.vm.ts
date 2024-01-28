import { Injectable } from "@angular/core";
import { CategoryManager } from "../manager/category.manager";
import { Category } from "../models/Category.class";

@Injectable({
    providedIn: 'root'
})
export class CategoryFormVM {

    constructor(
        private _categoryManager: CategoryManager
    ) { }

    saveCategory(data: Category) {
        return this._categoryManager.saveCategory(data)
    }

    updateCategory(data: Category) {
        return this._categoryManager.updateCategory(data._id, data)
    }

}