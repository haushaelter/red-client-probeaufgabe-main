import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { SiteTitleService } from '@red-probeaufgabe/core';
import { FhirSearchFn, IFhirPatient, IFhirPractitioner, IFhirSearchResponse } from '@red-probeaufgabe/types';
import { IUnicornTableColumn } from '@red-probeaufgabe/ui';
import { SearchFacadeService } from '@red-probeaufgabe/search';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Init unicorn columns to display
  columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>([
    'number',
    'resourceType',
    'name',
    'gender',
    'birthDate',
  ]);
  isLoading = true;

  /*
   * Implement search on keyword or fhirSearchFn change
   **/
  search$: Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> = this.searchFacade
    .search(FhirSearchFn.SearchAll, '')
    .pipe(
      catchError(this.handleError),
      tap(() => {
        this.isLoading = false;
      }),
      shareReplay(),
    );

  entries$: Observable<Array<IFhirPatient | IFhirPractitioner>> = this.search$.pipe(
    map((data) => !!data && data.entry),
    startWith([]),
  );

  totalLength$ = this.search$.pipe(
    map((data) => !!data && data.total),
    startWith(0),
  );

  /**
   * Zu Beginn wurde ein NullInjectorError geworfen, da der AbstractSearchFacadeService anstelle des SearchFacadeService verwendet wurde.
   * Der Fehler ist aufgetreten, da der AbstractSearchFacadeService nicht Teil des SearchModule ist.
   * Man hätte auch den AbstractSearchFacadeService in das Module aufnehmen können, wäre dann aber vor dem Problem gestanden,
   * dass die Functions nicht implementiert sind, da sie abstract sind
   */
  constructor(private siteTitleService: SiteTitleService, private searchFacade: SearchFacadeService) {
    this.siteTitleService.setSiteTitle('Dashboard');
  }

  public search(query: { filter: FhirSearchFn; searchTerm: string }): void {
    this.search$ = this.searchFacade.search(query.filter, query.searchTerm).pipe(
      catchError(this.handleError),
      tap(() => {
        this.isLoading = false;
      }),
      shareReplay(),
    );

    this.entries$ = this.search$.pipe(
      map((data) => !!data && data.entry),
      startWith([]),
    );
  }

  private handleError(): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return of({ entry: [], total: 0 });
  }
}
