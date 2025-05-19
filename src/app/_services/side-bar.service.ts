import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  // Track both open state and expanded state
  private isOpen = new BehaviorSubject<boolean>(true);
  private isExpanded = new BehaviorSubject<boolean>(true);

  isOpen$ = this.isOpen.asObservable();
  isExpanded$ = this.isExpanded.asObservable();

  // Toggle sidebar visibility (open/close)
  toggle(): void {
    this.isOpen.next(!this.isOpen.value);
  }

  // Toggle sidebar expansion (full width/collapsed width)
  toggleExpand(): void {
    this.isExpanded.next(!this.isExpanded.value);
  }

  // Set specific states if needed
  setOpenState(isOpen: boolean): void {
    this.isOpen.next(isOpen);
  }

  setExpandedState(isExpanded: boolean): void {
    this.isExpanded.next(isExpanded);
  }

}
