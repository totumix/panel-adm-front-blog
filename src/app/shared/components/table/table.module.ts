import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule,
    NzToolTipModule,
    NgxPaginationModule
  ],
  exports:[
    TableComponent
  ]
})
export class TableModule { }
