import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectPipe'
})
export class ObjectPipePipe implements PipeTransform {

  transform(value: {[key: string]: string}): string {
    let key = Object.keys(value)[0];
    return key + 's um ' + value[key];
  }

}
