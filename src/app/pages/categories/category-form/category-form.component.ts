import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { BaseFormCategoryService } from 'src/app/core/baseForm/base-form-category.services';
import { Category } from 'src/app/core/models/Category.class';
import { CategoryFormVM } from 'src/app/core/view-model/category-form.vm';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  providers: [NzModalService, BaseFormCategoryService],
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup
  readonly nzModalData = inject(NZ_MODAL_DATA);

  constructor(
    private _modal: NzModalRef,
    public _baseForm: BaseFormCategoryService,
    private _vm: CategoryFormVM
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.setDataForm();
  }
  setDataForm() {
    this.categoryForm = this._baseForm.getCategoryFormGroup(new Category)
    if (this.nzModalData) {
      this.categoryForm.patchValue({ ...this.nzModalData })
    }
  }

  destroyModal(): void {
    this._modal.destroy();
  }

  saveCategory() {
    if (!this.categoryForm.invalid) {
      this.nzModalData ?
        this._vm.updateCategory(this.categoryForm.value).subscribe() :
        this._vm.saveCategory(this.categoryForm.value).subscribe();
      this._modal.destroy();
    } else {
      this.showFormError();
    }
  }

  showFormError() {
    Object.values(this.categoryForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}
