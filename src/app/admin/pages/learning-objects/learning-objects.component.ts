import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LearningObjectService as PublicLearningObjectService } from 'app/cube/learning-object.service';
import { LearningObjectService as PrivateLearningObjectService } from 'app/onion/core/learning-object.service';
import { Query } from 'app/shared/interfaces/query';
import { LearningObject } from '@entity';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'clark-learning-objects',
  templateUrl: './learning-objects.component.html',
  styleUrls: ['./learning-objects.component.scss'],
  providers: [
    PublicLearningObjectService,
    PrivateLearningObjectService
  ]
})
export class LearningObjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('list') listElement: ElementRef<HTMLElement>;

  learningObjects: any;
  searchBarPlaceholder = 'Learning Objects';
  loading = false;
  displayStatusModal = false;
  activeLearningObject;
  adminStatusList =  Object.keys(LearningObject.Status);
  selectedStatus: string;
  currentSearchText: string;
  currentCollectionFilter = '';
  currentStatusfilters = [''];
  componentDestroyed$: Subject<void> = new Subject();

  listViewHeightOffset: number;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      if (username !== null) {
        this.getLearningObjects(username);
      }
   });
  }

  ngAfterViewInit() {
    if (!this.loading) {
      this.listViewHeightOffset =
        // 50 here is the browser-rendered height of the table-headers
        this.listElement.nativeElement.getBoundingClientRect().top + 50;
    }
  }

  constructor(
    private publicLearningObjectService: PublicLearningObjectService,
    private privateLearningObjectService: PrivateLearningObjectService,
    private route: ActivatedRoute,
  ) { }

  getLearningObjects(text: string) {
    this.loading = true;
    this.currentSearchText = text;
    const query: Query = {
      text,
    };
    this.publicLearningObjectService.getLearningObjects(query)
      .then(val => {
        this.learningObjects = val.learningObjects;
        this.loading = false;

        if (!this.listViewHeightOffset) {
          this.listViewHeightOffset =
            // 50 here is the browser-rendered height of the table-headers
            this.listElement.nativeElement.getBoundingClientRect().top + 50;
        }
      });
  }

  getUserLearningObjects(author: string) {
    this.loading = true;
    const query = {
      text: author
    };
    this.publicLearningObjectService.getLearningObjects(query)
      .then(val => {
        this.learningObjects = val.learningObjects;
        this.loading = false;
      });
  }

  openChangeStatusModal(learningObject: LearningObject) {
    this.displayStatusModal = true;
    this.activeLearningObject = learningObject;
  }

  updateLearningObjectStatus() {
    this.privateLearningObjectService.save(
      this.activeLearningObject.id,
      this.activeLearningObject.author.username,
      { status: this.selectedStatus }
    );
    this.displayStatusModal = false;
  }

  isCurrentStatus(status: string) {
    return this.activeLearningObject.status === status.toLowerCase();
  }

  toggleStatus(status: string) {
    this.selectedStatus = status.toLowerCase();
  }

  getStatusFilteredLearningObjects(statuses: string[]) {
    this.loading = true;
    const query: Query = {
      text: this.currentSearchText,
      status : statuses,
      collection: this.currentCollectionFilter,
    };

    this.publicLearningObjectService.getLearningObjects(query)
      .then(val => {
        this.learningObjects = val.learningObjects;
        this.loading = false;
      });
   }

   getCollectionFilteredLearningObjects(collection: string) {
    this.loading = true;
    const query: Query = {
      text: this.currentSearchText,
      status: this.currentStatusfilters,
      collection,
    };
    this.publicLearningObjectService.getLearningObjects(query)
      .then(val => {
        this.learningObjects = val.learningObjects;
        this.loading = false;
      });
   }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }
 }