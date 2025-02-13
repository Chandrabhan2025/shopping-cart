// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>(''); // Default value is empty
  searchQuery$ = this.searchQuerySubject.asObservable();

  // Method to update the search query
  setSearchQuery(query: string): void {
    console.log(query);
    this.searchQuerySubject.next(query);
  }
}
