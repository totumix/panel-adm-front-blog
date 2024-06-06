import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PhoneModule } from '../phone/phone.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { ImgUploadComponent } from '../img-upload/img-upload.component';
import { Article } from 'src/app/core/models/Article.class';
import { DrawerEvent } from 'src/app/core/events/drawer.event';
import { BaseFormArticleService } from 'src/app/core/baseForm/base-form-article.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Category } from 'src/app/core/models/Category.class';
import { Observable } from 'rxjs';
import { ArticleFormVm } from 'src/app/core/view-model/article-form.vm';

const MODULES = [
  ButtonModule,
  ReactiveFormsModule,
  NzFormModule,
  PhoneModule,
  NzInputModule,
  NzSelectModule,
  CommonModule,
  MapComponent,
  ImgUploadComponent
]
@Component({
  selector: 'app-article-form',
  standalone: true,
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
  providers: [NzModalService, BaseFormArticleService],
  imports: [...MODULES]
})
export class ArticleFormComponent implements OnInit{

  @Input() form: FormGroup;
  @Input() dataForm: Article;
  public showDrawerActions: boolean;
  public categorySelected: Category;
  public categoryList$: Observable<Category[]>

  constructor(
    private _drawerEvent: DrawerEvent,
    private _articleForm: BaseFormArticleService,
    private _vm: ArticleFormVm,
  ) { }

  ngOnInit() {
    this.init()
  }

  init() {
    this.initForm();
    // this.getCategories();
  }

  getCategories() {
    this.categoryList$ = this._vm.getCategories();
  }

  initForm() {
    if (this.dataForm) {
      this.form = this._articleForm.getArticleFormGroup(new Article);
      this.form.patchValue({ ...this.dataForm })
      this.showDrawerActions = true;
    } else {
      this.showDrawerActions = false;
    }
  }

  getImages(images) {
    this.form.get('images')?.setValue(images);
  }

  closeDrawer() {
    this._drawerEvent.changeCloseComponent(true)
  }

  saveArticle() {
    if (!this.form.invalid) {
      this._vm.saveArticle(this.form.value).subscribe(res => this.closeDrawer())
    } else {
      this.showFormError();
    }
  }
  showFormError() {
    Object.values(this.form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  deleteArticle(articleId) {
    this._vm.deleteArticle(articleId).subscribe(() => this.closeDrawer())
  }

  updateArticle(data) {
    const body = {
      ...data,
      ...this.form.value
    }
    this._vm.updateArticle(body).subscribe(res => this.closeDrawer())
  }

}
