import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleFilter'
})
export class ScheduleFilterPipe implements PipeTransform {

  transform(items: {[key: string]:string}[]) {
    const newItems = [];
    items.forEach(item => {
      let key = Object.keys(item)[0];
      let newItem: any = {...item};
      newItem['key'] = key;
      newItems.push(newItem);
    })
    return newItems;
  }

}
