import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(value: number, fileSizeType: string): number {

    if (fileSizeType == undefined) {
      fileSizeType = 'MB';
    }

    if (fileSizeType == 'GB') {
      value = value / (1024 * 1024 * 1024);
    }
    else if (fileSizeType == 'MB') {
      value = value / (1024 * 1024);
    }
    else if (fileSizeType == 'KB') {
      value = value / (1024);
    }
    return value;
  }
}
