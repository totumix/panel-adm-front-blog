import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { CATEGORIES_TABLE } from 'src/app/core/tables-info';
import { CategoriesVm } from 'src/app/core/view-model/categories.vm';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  providers: [NzModalService]
})
export class CategoriesComponent implements OnInit {
  listOfColumn = CATEGORIES_TABLE.columns;
  categoryModelList: any = {
    name: ''
  }
  listOfData$: Observable<any>;

  constructor(
    private _vm: CategoriesVm,
    private modal: NzModalService,) {

  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getCategories();
  }

  getCategories() {
    this.listOfData$ = this._vm.returnCategories();
  }

  showModalCategory(data?): void {
    this.modal.create({
      nzTitle: 'Crear categoría',
      nzContent: CategoryFormComponent,
      nzFooter: null,
      nzData: data
    });
  }

  getTableActions(item): void {
    let { type, data } = item;
    if (type == 'edit') {
      this.showModalCategory(data);
    }
    if (type == 'delete') {
      this.showDeleteCategory(data);
    }
  }

  showDeleteCategory(data) {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar esta categoría?',
      nzContent: 'Si eliminas esta categoría no podrás recuperarla',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteCategory(data),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteCategory(data) {
    this._vm.deleteCategory(data._id).subscribe()
  }
}
