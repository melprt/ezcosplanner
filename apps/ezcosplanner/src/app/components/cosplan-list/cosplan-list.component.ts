import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosplanCardComponent } from '../cosplan-card/cosplan-card.component';
import { CosplanService } from '../../services/cosplan.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CosplanAddCardComponent } from '../cosplan-add-card/cosplan-add-card.component';

@Component({
  selector: 'ezc-cosplan-list',
  standalone: true,
  imports: [CommonModule, CosplanCardComponent, CosplanAddCardComponent],
  templateUrl: './cosplan-list.component.html',
  styleUrl: './cosplan-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanListComponent {
  private cosplanService = inject(CosplanService);
  cosplans = toSignal(this.cosplanService.getAllCosplans$());
}
