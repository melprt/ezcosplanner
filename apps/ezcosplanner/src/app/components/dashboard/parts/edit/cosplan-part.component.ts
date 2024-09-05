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

@Component({
  selector: 'ezc-cosplan-part',
  standalone: true,
  imports: [CommonModule, DashboardTitleComponent],
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

  part = computed(
    () => this.cosplan()?.parts?.find(p => p.id === +this.partId)
  );
}
