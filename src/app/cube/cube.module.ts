// Core
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Routes
import { CubeRoutingModule } from './cube.routing';

// Services
import { LearningObjectService } from './learning-object.service';
import { CartService } from './cube-core/services/cart.service';
import { CartV2Service } from './cube-core/services/cartv2.service';

// Redux
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './cube-core/redux/reducers/cart.reducer';

// Pipes
import { EscapeHtmlPipe } from '../shared/pipes/keep-html.pipe';


// Modules
import { CubeCoreModule } from './cube-core/cube-core.module';
import { CubeSharedModule } from './cube-shared/cube-shared.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from '@cyber4all/clark-modal';
import { NotificationModule } from 'clark-notification';
import { CheckBoxModule } from 'clark-checkbox';
import { AuthModule } from './auth/auth.module';

// Components
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from './cube-shared/footer/footer.component';
import { CubeComponent } from './cube.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './learning-object-details/details/details.component';
import { DetailsContentComponent } from './learning-object-details/details/details-content.component';
import { CartComponent } from './cart/cart.component';
import { BrowseComponent } from './browse/browse.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { RouterComponent } from './cube-shared/breadcrumb/router.component';

// Other
import { VirtualScrollModule } from 'angular2-virtual-scroll';
// TODO: is ng-click-outside being used?
import { ClickOutsideModule } from 'ng-click-outside';
import { ParticlesModule } from 'angular-particle';

/**
 * A feature collection module that bundles all feature modules related to the cube.
 *
 * @class CubeModule
 */
@NgModule({
  declarations: [
    CubeComponent,
    EscapeHtmlPipe,
    DetailsComponent,
    DetailsContentComponent,
    CartComponent, // TODO Create Details module
    DetailsContentComponent, // TODO Create Details module
    RouterComponent,
    BrowseComponent, UserProfileComponent, UserPreferencesComponent,
  ],
  imports: [
    // Angular imports
    HttpModule,
    FormsModule,
    CommonModule,
    HomeModule,
    // 3rd Party imports
    ClickOutsideModule,
    ParticlesModule,
    VirtualScrollModule,
    // Local module imports
    StoreModule.forRoot({ cart: cartReducer }),
    ModalModule.forRoot(),
    NotificationModule.forRoot(),
    CheckBoxModule,
    AuthModule.forRoot(),
    CubeCoreModule,
    CubeSharedModule,
    CubeRoutingModule,
    SharedModule,
  ],
  providers: [
    LearningObjectService,
    CartService,
    CartV2Service
  ],
  // bootstrap: [CubeComponent]
})
export class CubeModule { }
