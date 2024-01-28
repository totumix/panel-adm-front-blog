import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './category-form/category-form.component';

const antdModule = [
  NzFormModule,
  NzInputModule,
]

@NgModule({
  declarations: [CategoriesComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    ...antdModule
  ]
})
export class CategoriesModule { }
