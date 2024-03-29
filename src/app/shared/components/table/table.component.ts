import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { LARGE, MEDIUM } from 'src/app/core/break-points';
import { ScreenWidth } from 'src/app/core/events/screen-width.event';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  p: number = 1;
  @Input() listOfData: Observable<any>;
  @Input() listOfColumn: any[] = [];
  @Input() objectKeys: any;
  @Input() isEditable: boolean = false;
  @Input() isErasable: boolean = false;
  @Input() isCancelable: boolean = false;
  @Input() isShowItem: boolean = false;
  @Output() sendItem = new EventEmitter();
  isLargeScreenWidth: boolean;
  actions
  constructor(
    private _screenWidth: ScreenWidth,
  ) { }

  ngOnInit(): void {
    this.actions = [
      { tooltipText: 'Ver detalles', show: this.isShowItem, icon: 'eye', type: 'show' },
      { tooltipText: 'Editar', show: this.isEditable, icon: 'edit', type: 'edit' },
      { tooltipText: 'Eliminar', show: this.isErasable, icon: 'delete', type: 'delete' },
      { tooltipText: 'Cancelar', show: this.isCancelable, icon: 'close-circle', type: 'cancel' },
      { tooltipText: 'Finalizar', show: this.isCancelable, icon: 'stop', type: 'stop' },

    ]
    this.objectKeys = Object.keys(this.objectKeys);
    this.setScreenWidth();
  }

  sendEventItem(type, data) {
    this.sendItem.emit({ type: type, data })
  }

  setScreenWidth() {
    this._screenWidth.width$.subscribe((width) => {
      if (width < LARGE) {
        this.isLargeScreenWidth = true;
      } else {
        this.isLargeScreenWidth = false;
      }
    });
  }
}
