import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { Observable, map, tap } from "rxjs";
import { AuthResponse } from "../core/models/auth-response.class";
import { category } from "../core/networking/category.api";
import { Category } from "../core/models/Category.class";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private url: string;
    constructor(
        private _baseService: BaseService,
    ) {
        this.url = environment.gateway;
    }

    getCategories(): Observable<Category[]> {
        return this._baseService.get(`${this.url}/${category.categories}`).pipe(
            map(res => res['data'])
        )
    }

    saveCategory(body: Category): Observable<Category> {
        return this._baseService.post(`${this.url}/${category.category}`, body).pipe(
            map(res => res['data'])
        )
    }

    updateCategory(categoryId: string, changes: Partial<Category>): Observable<any> {
        return this._baseService.put(`${this.url}/${category.category}/${categoryId}`, changes).pipe(
            map(res => res['data'])
        )
    }

    deleteCategory(categoryId) {
        return this._baseService.delete(`${this.url}/${category.category}/${categoryId}`)
    }
}