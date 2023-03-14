import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchFacadeService } from '@red-probeaufgabe/search';
import { FhirSearchFn } from '@red-probeaufgabe/types';
import { UmlautValidator } from './umlaut-validator';
import { WhiteSpaceValidator } from './white-space-validator';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  @Output()
  public submitSearch: EventEmitter<{ filter: FhirSearchFn; searchTerm: string }> = new EventEmitter();

  public form: FormGroup;

  public readonly dropdownOptions = [
    { value: 'Patients + Practitioners (Patient/Ärzte)', key: FhirSearchFn.SearchAll },
    { value: 'Patients (Patient)', key: FhirSearchFn.SearchPatients },
    { value: 'Practitioners (Ärzte)', key: FhirSearchFn.SearchPractitioners },
  ];

  constructor(private readonly searchFacade: SearchFacadeService) {
    this.form = new FormGroup({
      search: new FormControl<string>('', [WhiteSpaceValidator.containWhiteSpace, UmlautValidator.containUmlaut]),
      filter: new FormControl<FhirSearchFn>(FhirSearchFn.SearchAll),
    });
  }

  public submit(): void {
    const { search, filter } = this.form.controls;
    if (!search.valid) {
      return;
    }

    this.submitSearch.next({ filter: filter.value, searchTerm: search.value });
  }
}
