import { Injectable } from "@angular/core";
import { CategoryManager } from "../manager/category.manager";

@Injectable({
    providedIn: 'root'
})
export class CategoriesVm {

    constructor(
        private _categoryManager: CategoryManager
    ) { }

    returnCategories() {
        return this._categoryManager.returnCategories();
    }

    deleteCategory(categoryId) {
        return this._categoryManager.deleteCategory(categoryId);
    }

}