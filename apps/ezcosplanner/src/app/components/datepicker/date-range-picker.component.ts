import { ChangeDetectionStrategy, Component, inject, Input, Output, signal, EventEmitter } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormField, MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomDateAdapter } from '../../utils/custom-date-adapter';

@Component({
  selector: 'ezc-date-range-picker',
  standalone: true,
  imports: [ MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, MatFormField, CommonModule ],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.scss',
  providers: [provideNativeDateAdapter(), {provide: DateAdapter, useClass: CustomDateAdapter }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerComponent {
  @Input() appearance : MatFormFieldAppearance = 'fill';
  @Input() bgTransparent = false;
  @Input({"required": true}) formControlStart !: FormControl;  
  @Input({"required": true}) formControlEnd !: FormControl;  
  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));

  constructor () {
    this._locale.set('fr');
    this._adapter.setLocale(this._locale());
  }

}
