import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, shareReplay, tap, throwError } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { LoadingService } from "src/app/services/loading.service";
import { MessagesService } from "src/app/services/messages.service";
import { Category } from "../models/Category.class";

@Injectable({
    providedIn: 'root'
})
export class CategoryManager {

    private subject = new BehaviorSubject<Category[]>([]);
    categories$: Observable<Category[]> = this.subject.asObservable();

    constructor(
        private _categoryService: CategoryService,
        private _messages: MessagesService,
        private _loading: LoadingService
    ) {
        // this.getCategories();
    }


    getCategories() {
        const loadCategories$ = this._categoryService.getCategories().pipe(
            catchError(err => {
                let { error: { message } } = err;
                this.subject.next([])
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            map(res => res['categories']),
            tap(categories => this.subject.next(categories)),
            shareReplay()
        );

        this._loading.showLoaderUntilCompleted(loadCategories$)
            .subscribe();
    }

    returnCategories(): Observable<Category[]> {
        return this.categories$
    }

    saveCategory(body: Category) {
        const categories = this.subject.getValue();
        return this._categoryService.saveCategory(body).pipe(
            tap(category => {
                categories.push(category);
                this.subject.next(categories);
            }),
            shareReplay()
        )
    }

    updateCategory(categoryId, changes: Category) {
        const categories = this.subject.getValue();
        const index = categories.findIndex(category => category._id == categoryId);
        const newBranchCategory: Category = {
            ...categories[index],
            ...changes
        };
        const newCategories: Category[] = categories.slice(0);
        newCategories[index] = newBranchCategory;
        return this._categoryService.updateCategory(categoryId, changes).pipe(
            tap(() => this.subject.next(newCategories)),
            catchError(err => {
                const message = "Could not update category";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }

    deleteCategory(categoryId) {
        const categories = this.subject.getValue();
        const index = categories.findIndex(category => category._id == categoryId);
        categories.splice(index, 1);
        this.subject.next(categories);
        return this._categoryService.deleteCategory(categoryId).pipe(
            catchError(err => {
                const message = "Could not delete  category";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }
}