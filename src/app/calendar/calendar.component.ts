import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {
  date = new Date();
  month: number =  this.date.getMonth();
  year: number = this.date.getFullYear();
  weekdays: string[] = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  months: string[] = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  constructor() { }

  ngOnInit(): void {
    
  }

  checkToday(day, month, year) {
    const d = new Date();
    return day === d.getDay() && month === d.getMonth() && year === d.getFullYear();
  }

  getRangedArray(size: number, start: number) {
    return [...Array(size).keys()].map(i => i + start);
  }

  setDate(year: number, month: number) {
    return new Date(year, month, 1);
  }

  getMonthDays(month: number, year: number) {
    if(month <= 6) { // Alle Monate bis zum Juli
      if(month % 2 && month !== 1) { // Alle Monate mit 31 Tagen
        return 30;
      } else {
        if(month === 1 && this.isLeapYear(year)) {
          return 29;
        } else if(month === 1 && !this.isLeapYear(year)) {
          return 28;
        } else {
          return 31;
        }
      }
    } else if (month > 6) { // Alle Monate ab August
      if(month % 2) {
        return 31;
      } else {
        return 30;
      }
    }
  }

  getFirstWeekDay(month: number, year: number) {
    const firstWeekDay = new Date(year, month, 1).getDay();
    return firstWeekDay;
  }

  isLeapYear(year: number) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  getCellCount(month, year) {
    return this.getMonthDays(month, year) + this.getFirstWeekDay(month, year);
  }

  getMissingCellCount(month: number, year: number) {
    return (7 - this.getCellCount(month, year) % 7) === 7 ? 0 : (7 - this.getCellCount(month, year) % 7);
  }

  onNextMonth() {
    if (this.month === 11) {
      this.date = new Date(this.year + 1, 0);
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
    } else {
      this.date = new Date(this.year, this.month + 1);
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
    }
  }

  onPrevMonth() {
    if (this.month === 0) {
      this.date = new Date(this.year - 1, 11);
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
    } else {
      this.date = new Date(this.year, this.month - 1);
      this.month = this.date.getMonth();
      this.year = this.date.getFullYear();
    }
  }
}
