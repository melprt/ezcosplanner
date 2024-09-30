import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosplanService } from '../../../../services/cosplan.service';
import { ActivatedRoute } from '@angular/router';
import { DashboardTitleComponent } from '../../title/dashboard-title.component';
import { AddWipPictureCardComponent } from '../wip-picture/add-card/add-wip-picture-card.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WipPictureCardComponent } from '../wip-picture/card/wip-picture-card.component';

@Component({
  selector: 'ezc-cosplan-part',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTitleComponent,
    AddWipPictureCardComponent,
    WipPictureCardComponent,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './cosplan-part.component.html',
  styleUrl: './cosplan-part.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanPartComponent {
  private route = inject(ActivatedRoute);
  private cosplanService = inject(CosplanService);
  protected cosplan = this.cosplanService.cosplan;
  // Safe cast as access to this component is protected by guard that warranty existence of this id
  protected partId: string = this.route.snapshot.paramMap.get('id') as string;

  part = computed(() =>
    this.cosplan()?.parts?.find((p) => p.id === +this.partId)
  );

  addTime(event: Event): void {
    event.preventDefault();
    event.stopPropagation();    
  }
}
