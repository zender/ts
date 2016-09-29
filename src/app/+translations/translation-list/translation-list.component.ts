import {Component, OnInit, OnDestroy} from '@angular/core';
import {Option} from '../../shared/testbirds/shared/option.model';
import {TestbirdsDropdownComponent} from '../../shared/testbirds/tb/dropdown/tb-dropdown.component';
import {Subscription} from 'rxjs/Rx';
import {TestbirdsInputDebounceComponent} from '../../shared/testbirds/tb-form/tb-input-debounce.component';
import {LanguageModel} from '../../+language/shared/language.model';
import {TranslationRowComponent} from '../translation-row/translation-row.component';
import {TranslationIdentifierModel} from '../shared/translation_identifier.model';
import {TranslationIdentifierService, TranslationCriteria} from '../shared/translation-identifier.service';
import {ProjectModel} from '../../+project/shared/project.model';
import {LanguageDropdownComponent} from '../../+language/language-dropdown/language-dropdown.component';
import {LanguageService} from '../../+language/shared/language.service';
import {ProjectService} from '../../+project/shared/project.service';
import {Collection} from '../../shared/testbirds/shared/collection';

@Component({
  moduleId: module.id,
  selector: 'tb-translation-list',
  templateUrl: 'translation-list.component.html',
  directives: [TranslationRowComponent, TestbirdsDropdownComponent, TestbirdsInputDebounceComponent, LanguageDropdownComponent],
  inputs: ['projectId'],
  outputs: [],
})
export class TranslationListComponent implements OnInit, OnDestroy {

  projectId: string;

  project: ProjectModel;

  projectSubscription: Subscription;

  currentPage: number = 1;

  nextPage: number = null;

  previousPage: number = null;

  loading: boolean = false;

  translations: TranslationIdentifierModel[] = [];

  languages: LanguageModel[] = [];

  selectedLanguageCodes: string[] = [];

  availableLanguageCodes: string[] = [];

  translationStates: Option[] = [];

  selectedTranslationState: Option;

  languageOptions: Option[] = [new Option({'id': 'ALL', 'label': 'ALL_LANGUAGES'})];

  query: string = '';

  showList: boolean = true;

  constructor(protected translationIdentifierService: TranslationIdentifierService,
              protected languageService: LanguageService,
              protected projectService: ProjectService) {}

  ngOnInit() {
    this.loading = true;

    this.languageService.getLanguagesAsObservable()
      .subscribe((languages: LanguageModel[]) => {
        this.languages = languages;
        languages.map((language: LanguageModel) => {
          this.availableLanguageCodes.push(language.code);
        });

        this.selectedLanguageCodes = this.availableLanguageCodes;
      })
    ;

    this.translationStates = this.translationIdentifierService.getTranslationStateOptions();
    this.loadTranslationIdentifiers(this.currentPage);

    this.projectSubscription = this.projectService.getProjectObservable().subscribe((project: ProjectModel) => {
      if(this.projectId !== project.id) {
        throw new Error('Project has not valid ID');
      }

      this.project = project;

      this.languageService.getLanguageOptions()
        .subscribe((options: Option[]) => {
          options.map((option: Option) => {
            if(this.project.languages.indexOf(option.id) !== -1) {
              option.extraData.languageStats = this.project.stats.getLanguageStat(option.id);
              this.languageOptions.push(option);
            }
          });

        })
      ;
    });
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
  }

  setShowList(showList: boolean): void {
    this.showList = showList;
    this.loadTranslationIdentifiers(this.currentPage, true);
  }

  loadTranslationIdentifiers(page: number, clear: boolean = false): void {

    let criteria = new TranslationCriteria({
      'translationState': this.selectedTranslationState ? this.selectedTranslationState.id : null,
      'term': this.query,
      'limit': this.showList ? 10 : 1
    });

    this.translationIdentifierService.find(this.projectId, page, criteria)
      .subscribe((collection: Collection<TranslationIdentifierModel>) => { console.log(collection);
        this.nextPage = collection.next;
        this.previousPage = collection.previous;
        this.currentPage = collection.current;
        clear ? this.translations = [] : null;
        collection.data.forEach((translation: TranslationIdentifierModel) => this.translations.push(translation));
        this.loading = false;
      });
  }

  onQuery(query: string): void {
    this.loading = true;
    this.query = query;
    this.loadTranslationIdentifiers(this.currentPage, true);
  }

  onTranslationStateChange(option: Option) {
    this.loading = true;
    this.selectedTranslationState = option;
    this.loadTranslationIdentifiers(this.currentPage, true);
  }

  onLanguageChange(option: Option) {
    this.selectedLanguageCodes = (option.id === 'ALL') ? this.availableLanguageCodes : [option.id];
  }
}
