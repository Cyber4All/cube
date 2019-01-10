import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { CubeSharedModule } from '../shared/cube-shared.module';
import { PhilosophyComponent } from './philosophy/philosophy.component';
import { UsageStatsModule } from './usage-stats/usage-stats.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    CubeSharedModule,
    UsageStatsModule,
    RouterModule
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent, PhilosophyComponent],
  providers: []
})
export class HomeModule {}
