import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, shareReplay, tap, throwError } from "rxjs";
import { ArticleService } from "src/app/services/article.service";
import { Article } from "../models/Article.class";
import { MessagesService } from "src/app/services/messages.service";
import { LoadingService } from "src/app/services/loading.service";

@Injectable({
    providedIn: 'root'
})
export class ArticleManager {

    private subject = new BehaviorSubject<Article[]>([]);
    articles$: Observable<Article[]> = this.subject.asObservable();

    constructor(
        private _articleService: ArticleService,
        private _messages: MessagesService,
        private _loading: LoadingService
    ) {
        this.getArticles();
    }

    getArticles() {
        this.subject.next([])
        const loadBranchOfficeByBusiness$ = this._articleService.getArticles().pipe(
            catchError(err => {
                let { error: { message } } = err
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            map(res => res['articles']),
            tap(articles => this.subject.next(articles)),
            shareReplay()
        );

        this._loading.showLoaderUntilCompleted(loadBranchOfficeByBusiness$)
            .subscribe();
    }

    returnArticles(): Observable<Article[]> {
        return this.articles$
    }

    saveArticle(body: Article) {
        const articles = this.subject.getValue();
        return this._articleService.saveArticle(body).pipe(
            tap(article => {
                articles.push(article);
                this.subject.next(articles);
            }),
            shareReplay()
        )
    }

    deleteArticle(articleId) {
        const articles = this.subject.getValue();
        const index = articles.findIndex(article => article._id == articleId);
        articles.splice(index, 1);
        this.subject.next(articles);
        return this._articleService.deleteArticle(articleId).pipe(
            catchError(err => {
                const message = "Could not delete branch office";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }

    updateArticle(articleId, changes: Article) {
        const articles = this.subject.getValue();
        const index = articles.findIndex(article => article._id == articleId);
        const newBranchOffice: Article = {
            ...articles[index],
            ...changes
        };
        const newBranchOffices: Article[] = articles.slice(0);
        newBranchOffices[index] = newBranchOffice;
        return this._articleService.updateArticle(articleId, changes).pipe(
            tap(() => this.subject.next(newBranchOffices)),
            catchError(err => {
                const message = "Could not update branch office";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }
}