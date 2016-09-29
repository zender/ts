import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tsImageFilter'})
export class TestbirdsImageFilterPipe implements PipeTransform {

  transform(value: string, filter?: string): string {
    return filter ? value + '?filter=' + filter : value;
  }
}