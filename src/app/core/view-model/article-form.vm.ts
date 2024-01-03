import { Injectable } from "@angular/core";
import { CategoryManager } from "../manager/category.manager";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ArticleFormVm {

    constructor(
        private _categoriesManager : CategoryManager
    ) { }

    getCategories(){
        return this._categoriesManager.getCategories().pipe(
            map(res => res['categories'])
        );
    }

}