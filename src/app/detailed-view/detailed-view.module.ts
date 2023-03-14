import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedViewComponent } from './detailed-view.component';
import { DetailedViewRoutingModule } from './detailed-view-routing.module';

@NgModule({
  declarations: [DetailedViewComponent],
  imports: [CommonModule, DetailedViewRoutingModule],
})
export class DetailedViewModule {}
