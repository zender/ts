
import {LanguageStatModel} from '../../+language/shared/language_stat.model';

export class ProjectStatsModel {

  completeness: number;

  numberOfUsers: number;

  numberOfTranslationIds: number;

  numberOfTranslations: number;

  numberOfBuilds: number;

  latestBuildDate: Date;

  languageStats: LanguageStatModel[] = [];

  constructor(obj?: any) {
    this.completeness   = obj && obj.completeness || 0.0;
    this.numberOfUsers  = obj && obj.numberOfUsers || 0;
    this.numberOfTranslations   = obj && obj.numberOfTranslations || 0;
    this.numberOfTranslationIds = obj && obj.numberOfTranslationIds || 0;
    this.numberOfBuilds = obj && obj.numberOfBuilds || 0;
    this.latestBuildDate = obj && obj.latestBuildDate ? new Date(obj.latestBuildDate) : null;

    if(obj && obj.languageStats instanceof Array) { 
      obj.languageStats.forEach((data: any) => this.languageStats.push(new LanguageStatModel(data)));
    }
  }

  getLanguageStat(code: string): LanguageStatModel {
    let filtered: LanguageStatModel[] = this.languageStats
      .filter((languageStat: LanguageStatModel) => languageStat.languageCode === code)
    ;

    if(filtered.length !== 1) {
      throw Error(`LanguageStat with code ${code} not found`);
    }

    return filtered.pop();
  }
}
