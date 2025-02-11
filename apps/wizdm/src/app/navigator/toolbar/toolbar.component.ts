import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { wmAction } from './toolbar.service';
import { $animations } from './toolbar.animations';

@Component({
  selector: 'wm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { 'class': 'wm-toolbar' },
  animations: $animations
})
export class ToolbarComponent {

  @Input() buttons: wmAction[];
  
  @Output() action = new EventEmitter<string>();
}
