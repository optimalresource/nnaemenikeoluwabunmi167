import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisualizeDataService {

  private tableData = new BehaviorSubject<object>({});
  private filterNames = new BehaviorSubject<string>('');
  private filterValues = new BehaviorSubject<object>({});
  private numberOfItems = new BehaviorSubject<number>(null);
  private itemTotal = new BehaviorSubject<number>(null);
  private staffInfo = new BehaviorSubject<object>({});

  currentTableData = this.tableData.asObservable();
  currentFilterNames = this.filterNames.asObservable();
  currentFilterValues = this.filterValues.asObservable();
  currentNumberOfItems = this.numberOfItems.asObservable();
  currentItemTotal = this.itemTotal.asObservable();
  currentStaffInfo = this.staffInfo.asObservable();

  constructor() { }

  changeTableData(obj: object) {
    this.tableData.next(obj);
  }

  changeFilterNames(names: string) {
    this.filterNames.next(names);
  }

  changeFilterValues(values: object) {
    this.filterValues.next(values)
  }
  changeNumberOfItems(value: number) {
    this.numberOfItems.next(value)
  }
  changeItemTotal(value: number) {
    this.itemTotal.next(value)
  }

  changeStaffInfo(staff: object) {
    this.staffInfo.next(staff)
  }
}
