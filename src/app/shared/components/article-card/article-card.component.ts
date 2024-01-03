import { Component, Input, OnInit } from '@angular/core';
import { DrawerEvent } from '../../../core/events/drawer.event';
import { Article } from 'src/app/core/models/Article.class';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    NzIconModule
  ],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article;
  color = '';

  constructor(private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
    this.getRandomColor();
  }

  getRandomColor() {
    this.color = '#' + ('000000' + Math.floor(0x1000000 * Math.random()).toString(16)).slice(-6);
  }

  editBranchOffice(article: Article) {
    console.log(article)
    this.drawerEvent.changeOpenComponent({ component: ArticleFormComponent, data: article })
  }

}
