import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing.module';
import { DashboardModule } from '@red-probeaufgabe/dashboard';
import { UiModule } from '@red-probeaufgabe/ui';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, UiModule, DashboardModule],
})
export class MainModule {}
