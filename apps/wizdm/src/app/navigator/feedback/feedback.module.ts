import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ContentModule } from '@wizdm/content';
import { IconModule } from '../../elements/icon';
import { FeedbackComponent } from './feedback.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    ContentModule,
    IconModule
  ],
  declarations: [
    FeedbackComponent
  ],
  exports: [
    FeedbackComponent
  ],
  entryComponents: [
    FeedbackComponent
  ]
})
export class FeedbackModule { }
