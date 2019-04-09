import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LearningObjectsComponent } from './pages/learning-objects/learning-objects.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { UsersComponent } from './pages/users/users.component';
import { ContentWrapperComponent } from './components/content-wrapper/content-wrapper.component';
import { FilterSearchComponent } from 'app/admin/components/filter-search/filter-search.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'app/shared/tooltips/tip.module';
import { ContextMenuModule } from 'app/shared/contextmenu/contextmenu.module';

import { ModalModule } from 'app/shared/modals';
import { PopupModule } from 'app/shared/popups/popup.module';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SharedModule } from 'app/shared/shared.module';
import { UserSearchWrapperComponent } from './components/user-search-wrapper/user-search-wrapper.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AdminUserCardComponent } from './components/user-card/user-card.component';
import { UserPrivilegesComponent } from './components/user-privileges/user-privileges.component';
import { PrivilegesListComponent } from './components/user-privileges/privileges-list/privileges-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    LearningObjectsComponent,
    AnalyticsComponent,
    UsersComponent,
    SearchBarComponent,
    ContentWrapperComponent,
    FilterSearchComponent,
    UserSearchWrapperComponent,
    AdminUserCardComponent,
    UserPrivilegesComponent,
    PrivilegesListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TooltipModule,
    ContextMenuModule,
    ModalModule,
    PopupModule,
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule
  ],
})
export class AdminModule { }