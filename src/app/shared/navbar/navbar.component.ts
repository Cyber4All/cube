import {
  Component,
  OnInit,
  AfterContentChecked,
  HostListener,
  OnDestroy
} from '@angular/core';
import { ModalService, Position, ModalListElement } from '../modals';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  NavigationStart
} from '@angular/router';

import { AuthService } from '../../core/auth.service';
import * as md5 from 'md5';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'clark-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentChecked, OnDestroy {
  // FIXME: Convert 'class' to 'type' for consistancy
  responsiveThreshold = 750;
  windowWidth: number;
  version: any;
  subs: Subscription[] = [];

  // flags
  hideNavbar = false;
  isOnion = false;
  loggedin = this.authService.user ? true : false;
  searchFocused = false; // boolean, true when user has the default searchbar focused
  searchByMappings = false; // if false, default search bar shown, if true mappings filter component shown
  menuOpen = false; // flag for wheher or not the mobile menu is out
  searchDown = false; // flag for wheher or not the mobile search is down

  // This is passed to the mappings-filter component, which will subscribe to it. On event, the component will close all dropdowns
  closeMappingsDropdown: Subject<string> = new Subject();

  selectedSource: string;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }

  constructor(
    private modalCtrl: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.windowWidth = window.innerWidth;

    this.subs.push(this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        // if we're in the onion client, make sure the navigation switcher reflects it
        if (e.url.match(/\/*onion[\/*[0-z]*]*/)) {
          this.isOnion = true;
        } else {
          this.isOnion = false;
        }

        this.menuOpen = this.searchDown = false;
      } else if (e instanceof NavigationEnd) {
        // scroll to top of page when any router event is fired
        window.scrollTo(0, 0);

        // hide navbar if it should be hidden
        const root: ActivatedRoute = this.route.root;
        this.hideNavbar = root.children[0].snapshot.data.hideTopbar;
      }
    }));

    // pull the version number out of package.json and extract the prefix (alpha, beta, release-candidate, etc)
    const { version: appVersion } = require('../../../../package.json');
    const versionRegex = /[0-9]+\-([A-z]+(?=\.[0-9]+))/;
    const matched = versionRegex.exec(appVersion);

    if (matched.length >= 1) {
      this.version = matched[1];
    }
  }

  ngOnInit() {
    this.subs.push(this.authService.isLoggedIn.subscribe(val => {
      this.loggedin = val ? true : false;
    }));
  }

  ngAfterContentChecked(): void {
    // FIXME there has to be a better way to do this
    if (window.location.pathname.indexOf('auth') >= 0) {
      this.hideNavbar = true;
    } else {
      this.hideNavbar = false;
    }
  }


  logout() {
    this.authService.logout().then(() => {
      window.location.reload();
    });
  }

  userprofile() {
    this.router.navigate(['users', this.authService.user.username]);
  }

  /**
   * Click events on the user section of the topbar, displays context menu
   * @param event
   */
  userDropdown(event): void {
    this.subs.push(this.modalCtrl
      .makeContextMenu(
        'UserContextMenu',
        'dropdown',
        [
          new ModalListElement(
            '<i class="fas fa-user-circle fa-fw"></i>View profile',
            'userprofile'
          ),
          new ModalListElement(
            '<i class="far fa-sign-out"></i>Sign out',
            'logout'
          )
        ],
        true,
        null,
        new Position(
          this.modalCtrl.offset(event.currentTarget).left -
            (190 - event.currentTarget.offsetWidth),
          this.modalCtrl.offset(event.currentTarget).top + 50
        )
      )
      .subscribe(val => {
        if (val === 'logout') {
          this.logout();
        } else if (val === 'userprofile') {
          this.userprofile();
        }
      }));
  }

  /**
   * Click events on the contributor section of the topbar, displays context menu
   * @param event
   */
  contributorDropdown(event): void {
    this.subs.push(this.modalCtrl
      .makeContextMenu(
        'ContributorContextMenu',
        'dropdown',
        [
          new ModalListElement(
            'Your dashboard',
            'dashboard'
          ),
          new ModalListElement(
            'Create a Learning Object',
            'create'
          )
        ],
        true,
        null,
        new Position(
          this.modalCtrl.offset(event.currentTarget).left -
            (190 - event.currentTarget.offsetWidth),
          this.modalCtrl.offset(event.currentTarget).top + 40
        )
      )
      .subscribe(val => {
        if (val === 'create') {
          this.router.navigate(['onion', 'learning-object-builder']);
        }
        if (val === 'dashboard') {
          this.router.navigate(['onion', 'dashboard']);
        }
      }));
  }

  /**
   * Takes a reference to the searchbar input to pass as a query to the browse component.
   * @param searchbar reference to input
   */
  performSearch(searchbar) {
    searchbar.value = searchbar.value.trim();
    const query = searchbar.value;
    if (query.length) {
      this.router.navigate(['/browse', { query }]);
    }

    this.searchDown = false;
  }

  /**
   * Takes am outcome id and passes it to the browse component as a query parameter
   * @param outcomeId id of outcome
   */
  performOutcomeSearch(outcomeId) {
    this.closeMappingsDropdown.next();
    this.router.navigate(['/browse', { standardOutcomes: outcomeId }]);
  }

  toggleMappingsFilterSource(sourceName: string) {
    if (sourceName === this.selectedSource) {
      // we're toggling it off
      this.selectedSource = undefined;
    } else {
      // we're changing it
      this.selectedSource = sourceName;
    }
  }

  gravatarImage(size): string {
    // r=pg checks the rating of the Gravatar image
    return (
      'https://www.gravatar.com/avatar/' +
      md5(this.authService.user.email) +
      '?s=' + size + '?r=pg&d=identicon'
    );
  }

  get isMobile(): boolean {
    return this.windowWidth <= this.responsiveThreshold;
  }

  ngOnDestroy() {
    // close all subscriptions
    for (let i = 0, l = this.subs.length; i < l; i++) {
      this.subs[i].unsubscribe();
    }

    this.subs = [];
  }
}
