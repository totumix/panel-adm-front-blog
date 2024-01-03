import { Injectable } from "@angular/core";
import { ArticleManager } from "../manager/article.manager";

@Injectable({
    providedIn: 'root'
})
export class StartViewVm {

    constructor(
        private _articleManager: ArticleManager
    ) {
    }

    returnArticles() {
        return this._articleManager.returnArticles()
    }

}