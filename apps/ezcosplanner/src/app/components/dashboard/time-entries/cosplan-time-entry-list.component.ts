import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { getFrenchPaginatorIntl } from '../../../french-paginator-intl';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { TimeEntry } from '../../../models/time-entry';
import { TimeEntryApiService } from '../../../services/time-entry-api.service';
import { CosplanService } from '../../../services/cosplan.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SecondToTimePipe } from '../../../pipes/second-to-time.pipe';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  templateUrl: './cosplan-time-entry-list.component.html',
  styleUrl: './cosplan-time-entry-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() },
  ],
})
export class CosplanTimeEntryListComponent implements AfterViewInit {
  timeEntries = signal<TimeEntry[] | null>(null);
  loading = signal<boolean>(true);
  dataSource = new MatTableDataSource<TimeEntry>();
  selection = new SelectionModel<TimeEntry>(true, []);
  displayedColumns: string[] = ['select', 'day', 'part', 'task', 'time'];

  protected route = inject(ActivatedRoute);
  private timeEntryApiService = inject(TimeEntryApiService);
  private cosplanService = inject(CosplanService);
  private cosplan = this.cosplanService.cosplan;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  setTimeEntries(): void {
    if (this.cosplan() && this.cosplan()?.id) {
      this.timeEntryApiService
        .getAllByCosplan$(this.cosplan()?.id as number)
        .subscribe((res) => {
          this.loading.set(false);
          this.timeEntries.set(res);
          this.dataSource.data = res;
        });
    }
  }

  ngAfterViewInit() {
    this.setTimeEntries();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //to find sublayer data (ex. timeentry.part.name)
    this.dataSource.filterPredicate = (record, filter) => {
      const stringifyRecord = JSON.stringify(record);
      return stringifyRecord.toLowerCase().includes(filter.toLowerCase());
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

  getTotalTime(): number | undefined {
    return this.timeEntries()
      ?.map((t) => t.time)
      .reduce((acc, value) => acc + value, 0);
  }

  deleteSelection () : void {
    const ids = this.selection.selected.map(record => record.id)
  
    this.timeEntryApiService
    .deleteTimeEntries$(ids)
    .subscribe(() => {
      this.setTimeEntries();
    });
  }
}
