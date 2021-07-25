import { Pipe, PipeTransform } from '@angular/core';
import { Study } from '../Models/study.model';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.InstitutionId == Number(filter["InstitutionId"]));
    // return items.filter(item => item.StudyName.indexOf(filter.StudyName) !== -1);
  }

}
