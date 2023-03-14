import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FhirUtilService, SearchFacadeService } from '@red-probeaufgabe/search';
import { IPreparedIFhirPatient, IPreparedIFhirPractitioner } from '@red-probeaufgabe/types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss'],
})
export class DetailedViewComponent implements OnInit {
  public id: string;
  public resourceType = 'Patient';

  public resource$: Observable<IPreparedIFhirPatient | IPreparedIFhirPractitioner>;

  constructor(
    private readonly _searchFacade: SearchFacadeService,
    private readonly _fhirUtilService: FhirUtilService,
    private readonly _router: Router,
  ) {}

  public ngOnInit(): void {
    const segments = this._router.parseUrl(this._router.url)?.root?.children?.['primary']?.segments;

    if (segments === undefined) {
      return;
    }

    this.resourceType = String(segments[1]);
    this.id = String(segments[2]);

    if (this.resourceType === 'Patient') {
      this.resource$ = this._searchFacade
        .findPatientById(this.id)
        .pipe(map((patient) => this._fhirUtilService.prepareData(patient)));
    } else {
      this.resource$ = this._searchFacade
        .findPractitionerById(this.id)
        .pipe(map((practitioner) => this._fhirUtilService.prepareData(practitioner)));
    }
  }
}
