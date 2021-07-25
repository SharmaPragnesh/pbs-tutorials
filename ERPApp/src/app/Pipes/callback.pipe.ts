import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'callback',
  pure: false
})
export class CallbackPipe implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => callback(item));
  }
}

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'callback'
// })
// export class CallbackPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// }
