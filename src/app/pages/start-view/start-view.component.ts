import { Component, OnInit } from '@angular/core';
import { DrawerEvent } from 'src/app/core/events/drawer.event';
import { BranchOfficeFormComponent } from '../../shared/components/branch-office-form/branch-office-form.component';
import { BranchOffice } from 'src/app/core/models/branch-office.class';
import { StartViewVm } from 'src/app/core/view-model/start-view.vm';
import { Observable } from 'rxjs';
import { Article } from 'src/app/core/models/Article.class';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/article-form.component';

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit {
  listOfData$: Observable<Article[]>

  constructor(
    private _drawerEvent: DrawerEvent,
    private _vm: StartViewVm
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getBranchOfficeByBusiness();
  }

  createBranchOffice() {
    console.log("entra aqui")
    this._drawerEvent.changeOpenComponent({ component: ArticleFormComponent, data: new Article })
  }

  getBranchOfficeByBusiness() {
    this.listOfData$ = this._vm.returnArticles()
  }
}
