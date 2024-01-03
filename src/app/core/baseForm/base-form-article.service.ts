import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Article } from "../models/Article.class";

@Injectable()
export class BaseFormArticleService {

    constructor(private fb: FormBuilder) { }

    getArticleFormGroup(article: Article): FormGroup {
        let form = this.fb.group({
            ...article
        });
        return this.setValidators(article, form)
    }

    setValidators(article: Article, form: FormGroup) {
        Object.keys(article).forEach(key => {
            if (key == 'name' || key == 'category' || key == 'description') {
                form.get(key)?.setValidators(Validators.required)
            }
        })
        form.updateValueAndValidity();
        return form
    }
}