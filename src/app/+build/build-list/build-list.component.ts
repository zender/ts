import { Component, OnInit, ViewChild, OnDestroy, HostBinding,
  trigger, transition, animate,
  style, state } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BuildService} from '../shared/build.service';
import {BuildModel} from '../shared/build.model';
import {TestbirdsInputDebounceComponent} from '../../shared/testbirds/tb-form/tb-input-debounce.component';
import {Observable, Subscription} from 'rxjs/Rx';
import {NextObserver} from 'rxjs/Observer';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {Collection} from '../../shared/testbirds/shared/collection';

@Component({
  moduleId: module.id,
  selector: 'tb-build-list',
  templateUrl: 'build-list.component.html',
  providers: [BuildService],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class BuildListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  @ViewChild(TestbirdsInputDebounceComponent)
  searchComponent: TestbirdsInputDebounceComponent;

  projectId: string;

  currentPage: number = 1;

  nextPage: number = null;

  loading: boolean = true;

  builds: BuildModel[] = [];

  query?: string;

  longPollingBuildsSubscription: Subscription;

  constructor(protected buildService: BuildService, protected errorHandlerService: ErrorHandlerService, protected route: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
    this.loadBuilds(this.currentPage);
    this.longPollingBuilds();
  }

  ngOnDestroy() {
    this.longPollingBuildsSubscription.unsubscribe();
  }

  longPollingBuilds(): void {
    this.longPollingBuildsSubscription =
      Observable
        .interval(5000)
        .switchMap(() => this.buildService.find(this.projectId, this.currentPage, 5, this.query))
        .subscribe(this.observer())
      ;
  }

  loadBuilds(page: number): void {
    this.buildService.find(this.projectId, page, 5, this.query)
      .subscribe(this.observer())
    ;
  }

  onQuery(query: string): void {
    this.loading = true;
    this.query = query;
    this.loadBuilds(this.currentPage);
  }

  loadBuildsAndClearSearch(): void {
    this.query = null;
    this.searchComponent.clearInputValue();
    this.loadBuilds(this.currentPage);
  }

  protected observer(): NextObserver<Collection<BuildModel>> {
    return {
      'next': (collection: Collection<BuildModel>) => {
        this.nextPage = collection.next;
        this.currentPage = collection.current;
        this.builds = collection.data;
        this.loading = false;
      },
      'error': (errors: any) => this.errorHandlerService.handleErrors(errors)
    }
  }

}
