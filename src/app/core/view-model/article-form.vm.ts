import { Injectable } from "@angular/core";
import { CategoryManager } from "../manager/category.manager";
import { map } from "rxjs";
import { Article } from "../models/Article.class";
import { ArticleManager } from "../manager/article.manager";

@Injectable({
    providedIn: 'root'
})
export class ArticleFormVm {

    constructor(
        private _categoriesManager: CategoryManager,
        private _articleManager: ArticleManager
    ) { }

    getCategories() {
        return this._categoriesManager.getCategories().pipe(
            map(res => res['categories'])
        );
    }

    saveArticle(data: Article) {
        return this._articleManager.saveArticle(data)
    }

    deleteArticle(articleId) {
        return this._articleManager.deleteArticle(articleId)
    }

    updateArticle(data: Article) {
        return this._articleManager.updateArticle(data._id, data)
    }

}