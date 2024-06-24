import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTopBarComponent } from '../app-top-bar/app-top-bar.component';
import { CosplanCardComponent } from '../cosplan-card/cosplan-card.component';
import { CosplanService } from '../../services/cosplan.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ezc-cosplan-list',
  standalone: true,
  imports: [CommonModule, AppTopBarComponent, CosplanCardComponent],
  templateUrl: './cosplan-list.component.html',
  styleUrl: './cosplan-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanListComponent {
  private cosplanService = inject(CosplanService);
  cosplans = toSignal(this.cosplanService.getAllCosplans$());

}
