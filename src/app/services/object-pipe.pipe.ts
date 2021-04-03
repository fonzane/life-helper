import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectPipe'
})
export class ObjectPipePipe implements PipeTransform {

  transform(value: {[key: string]: string}, mode: string): string {
    let key = Object.keys(value)[0];
    if (mode === "full") {
      return key + 's um ' + value[key];
    } else if (mode === "time") {
      return value[key];  
    } else {
      return "lol";
    }
  }

}
