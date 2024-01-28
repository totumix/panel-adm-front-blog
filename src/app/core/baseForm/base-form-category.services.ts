import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from "../models/Category.class";

@Injectable()
export class BaseFormCategoryService {

    constructor(private fb: FormBuilder) { }

    getCategoryFormGroup(category: Category): FormGroup {
        let form = this.fb.group({
            ...category
        });
        return this.setValidators(category, form)
    }

    setValidators(category: Category, form: FormGroup) {
        Object.keys(category).forEach(key => {
            if (key == 'name') {
                form.get(key)?.setValidators(Validators.required)
            }
        })
        form.updateValueAndValidity();
        return form
    }
}