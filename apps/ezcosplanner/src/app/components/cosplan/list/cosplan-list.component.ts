import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosplanCardComponent } from '../card/cosplan-card.component';
import { CosplanApiService } from '../../../services/cosplan-api.service';
import { CosplanAddCardComponent } from '../add-card/cosplan-add-card.component';
import { Cosplan } from '../../../models/cosplan';

@Component({
  selector: 'ezc-cosplan-list',
  standalone: true,
  imports: [CommonModule, CosplanCardComponent, CosplanAddCardComponent],
  templateUrl: './cosplan-list.component.html',
  styleUrl: './cosplan-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanListComponent {
  private cosplanApiService = inject(CosplanApiService);
  cosplans = signal<Cosplan[] | null>(null);

  constructor() {
    this.setCosplans();
  }

  setCosplans(): void {
    this.cosplanApiService
      .getAllCosplans$()
      .subscribe((res) => this.cosplans.set(res));
  }
}
