import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  ViewChild,
  inject,
  signal,
  DestroyRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { getFrenchPaginatorIntl } from '../../../french-paginator-intl';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import {
  TimeEntry,
  TimeEntryApiResult,
  TimeEntryFilters,
} from '../../../models/time-entry';
import { TimeEntryApiService } from '../../../services/time-entry-api.service';
import { CosplanService } from '../../../services/cosplan.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SecondToTimePipe } from '../../../pipes/second-to-time.pipe';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerComponent } from '../../datepicker/date-range-picker.component';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  iif,
  map,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  CustomDateAdapter,
  MY_DATE_FORMAT,
} from '../../../utils/custom-date-adapter';
import { MatIcon } from '@angular/material/icon';
import { DashboardTitleComponent } from '../title/dashboard-title.component';

@Component({
  selector: 'ezc-cosplan-time-entry-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    RouterLink,
    SecondToTimePipe,
    MatButtonModule,
    NgOptimizedImage,
    DateRangePickerComponent,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    DashboardTitleComponent
  ],
  templateUrl: './cosplan-time-entry-list.component.html',
  styleUrl: './cosplan-time-entry-list.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class CosplanTimeEntryListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = signal<boolean>(true);
  timeEntryCount = signal<number>(0);
  timeEntrySum = signal<number>(0);
  dataSource = new MatTableDataSource<TimeEntry>();
  selection = new SelectionModel<TimeEntry>(true, []);
  displayedColumns: string[] = ['select', 'day', 'part', 'task', 'time'];
  filterForm = new FormGroup({
    element: new FormControl<string>(''),
    task: new FormControl<string>(''),
    dateStart: new FormControl<Date | null>(null),
    dateEnd: new FormControl<Date | null>(null),
  });

  protected cosplanService = inject(CosplanService);
  protected cosplan = this.cosplanService.cosplan;
  protected route = inject(ActivatedRoute);
  
  private detectorRef = inject(ChangeDetectorRef);
  private timeEntryApiService = inject(TimeEntryApiService);
  private offset = 0;
  private pageSize = 0;
  private destroyRef = inject(DestroyRef);
  private elementFilter$: Observable<null | string> = this.filterForm
    .get('element')!
    .valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
      startWith('')
    );
  private taskFilter$: Observable<null | string> = this.filterForm
    .get('task')!
    .valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
      startWith('')
    );
  private endDateFilter$: Observable<null | undefined | Date> = this.filterForm
    .get('dateEnd')!
    .valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
      startWith(undefined)
    );
  private startDateFilter$: Observable<null | undefined | Date> =
    this.filterForm
      .get('dateStart')!
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
        startWith(undefined)
      );

  ngAfterViewInit() {
    this.pageSize = this.paginator.pageSize;
    this.setTimeEntries();
    this.dataSource.sort = this.sort;

    //to find sublayer data (ex. timeentry.part.name)
    this.dataSource.filterPredicate = (record, filter) => {
      const stringifyRecord = JSON.stringify(record);
      return stringifyRecord.toLowerCase().includes(filter.toLowerCase());
    };
  }

  onPaginateChange(event: PageEvent) {
    //if page size has changed go to first page
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.paginator.firstPage();
    }
    this.offset = this.paginator.pageSize * this.paginator.pageIndex;
    this.setTimeEntries();
  }

  setTimeEntries(): void {
    if (this.cosplan() && this.cosplan()?.id) {
      combineLatest([
        this.elementFilter$,
        this.taskFilter$,
        this.startDateFilter$,
        this.endDateFilter$,
      ])
        .pipe(
          switchMap(([element, task, startDate, endDate]) =>
            this.timeEntryApiService.getAllByCosplan$(
              this.cosplan()?.id as number,
              this.offset,
              this.paginator.pageSize,
              {
                startDate,
                endDate,
                element,
                task,
              }
            )
          )
        )
        .subscribe((res: TimeEntryApiResult) => {
          this.dataSource.data = res.timeEntries;
          this.timeEntryCount.set(res.count);
          this.timeEntrySum.set(res.sum);
          this.loading.set(false);
          this.detectorRef.markForCheck();
        });
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TimeEntry): string {
    if (!row) {
      return `tout ${this.isAllSelected() ? 'déselectionner' : 'sélectionner'}`;
    }
    return `${
      this.selection.isSelected(row) ? 'déselectionner' : 'sélectionner'
    }`;
  }

  deleteSelection(): void {
    const ids = this.selection.selected.map((record) => record.id);

    this.timeEntryApiService.deleteTimeEntries$(ids).subscribe(() => {
      this.setTimeEntries();
    });
  }

  resetFilters(): void {
    this.filterForm.reset();
  }
}
