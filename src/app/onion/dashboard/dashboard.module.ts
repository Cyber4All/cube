import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';

import { SplashComponent } from './components/splash/splash.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardItemComponent } from './components/new-dashboard-item/dashboard-item.component';
import { SidePanelModule } from './components/side-panel/side-panel.module';
import { SidePanelContentModule } from './components/side-panel-content/side-panel-content.module';
import { OnionSharedModule } from '../shared/onion-shared.module';
@NgModule({
  imports: [
    CommonModule,
    OnionSharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      }
    ]),
    SharedModule,
    SidePanelModule,
    SidePanelContentModule
  ],
  declarations: [
    DashboardComponent,
    SplashComponent,
    SearchComponent,
    ListComponent,
    DashboardItemComponent
  ]
})
export class DashboardModule { }
