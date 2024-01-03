import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { Observable, map } from "rxjs";
import { article } from "../core/networking/article.api";
import { Article } from "../core/models/Article.class";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private url: string;
    constructor(
        private _baseService: BaseService,
    ) {
        this.url = environment.gateway;
    }

    getArticles(): Observable<Article[]> {
        return this._baseService.get(`${this.url}/${article.articles}`).pipe(
            map(res => res['data'])
        )
    }

    saveArticle(body: Article): Observable<Article> {
        return this._baseService.post(`${this.url}/${article.article}`, body).pipe(
            map(res => res['data'])
        )
    }

    updateArticle(articleId: string, changes: Partial<Article>): Observable<any> {
        return this._baseService.put(`${this.url}/${article.article}/${articleId}`, changes).pipe(
            map(res => res['data'])
        )
    }

    deleteArticle(articleId) {
        return this._baseService.delete(`${this.url}/${article.article}/${articleId}`)
    }
}