import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../shared/testbirds/tb/alert/alert.service';
import {ErrorHandlerService} from '../../shared/testbirds/shared/error_handler.service';
import {TranslationIdentifierModel} from '../shared/translation_identifier.model';
import {TranslationIdentifierService, TranslationCriteria} from '../shared/translation-identifier.service';
import {TranslationDomainService} from '../../+translation-domain/shared/translation_domain.service';
import {Collection} from '../../shared/testbirds/shared/collection';
import {ProjectService} from '../../+project/shared/project.service';

@Component({
  moduleId: module.id,
  selector: 'tb-translation-id-add',
  templateUrl: 'translation-id-add.component.html',
  providers: [TranslationDomainService, TranslationIdentifierService],
})
export class TranslationIdAddComponent implements OnInit {

  translationIdentifiers: TranslationIdentifierModel[] = [];

  totalItems: number = 0;

  currentPage: number = 1;

  selectedRow: TranslationIdentifierModel;

  isTabsetVisible: boolean = false;

  projectId: string;

  query?: string = null;

  loading: boolean = false;

  constructor(protected route: ActivatedRoute, protected translationIdentifierService: TranslationIdentifierService,
              protected translationDomainService: TranslationDomainService, protected projectService: ProjectService,
              protected alertService: AlertService, protected errorHandlerService: ErrorHandlerService) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.params['projectId'];
    this.loadTranslationIdentifiers(this.currentPage);
  }

  selectRow(row: TranslationIdentifierModel) : void {
    if(!this.isRowSelected(row)) {
      this.isTabsetVisible = false;
    }

    this.selectedRow = row;
  }

  isRowSelected(row: TranslationIdentifierModel): boolean {
    return this.selectedRow === row;
  }

  updateRow(row: TranslationIdentifierModel): void {
    this.translationIdentifierService
      .update(this.projectId, row.id, row.getFormData())
      .subscribe(
        () => {
          this.selectedRow = null;
          this.isTabsetVisible = false;
          this.projectService.triggerUpdate(this.projectId);
          this.alertService.publish({
            'message': 'flash.translationIdentifier.updated',
            'params': {'name': row.name}
          });
        }),
      (error: any) => this.errorHandlerService.handleErrors(error)
    ;
  }

  removeRow(row: TranslationIdentifierModel): void {
    let idx: number = this.translationIdentifiers.indexOf(row);
    this.translationIdentifiers.splice(idx, 1);

    this.translationIdentifierService
      .delete(this.projectId, row.id)
      .subscribe(
        () => {
          this.selectedRow = null;
          this.isTabsetVisible = false;
          this.projectService.triggerUpdate(this.projectId);
          this.alertService.publish({
            'message': 'flash.translationIdentifier.deleted',
            'params': {'name': row.name}
          });

          this.loadTranslationIdentifiers(this.currentPage);
        }),
      (error: any) => this.errorHandlerService.handleErrors(error)
    ;
  }

  pageChanged(event: any): void {
    this.selectedRow = null;
    this.isTabsetVisible = false;
    this.loadTranslationIdentifiers(event.page);
  }

  toogleTabset(): void {
    this.isTabsetVisible = !this.isTabsetVisible;
  }

  search(term: string): void {
    this.query = term;
    this.loadTranslationIdentifiers(this.currentPage);
  }

  protected loadTranslationIdentifiers(page: number = 1): void {
    this.loading = true;

    let criteria = new TranslationCriteria({
      'term': this.query
    });
    
    this.translationIdentifierService.find(this.projectId, page, criteria)
      .subscribe((collection: Collection<TranslationIdentifierModel>) => {
        this.translationIdentifiers = collection.data;
        this.totalItems = collection.total;
        this.currentPage = collection.current;
        this.loading = false;
    });
  }
}
