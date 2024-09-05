import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Part } from '../../../../models/part';
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
  protected part;

  ngOnInit(): void {
    console.log(this.cosplanService.cosplan())
  }

  constructor() {
    const cosplan = this.cosplan();
    console.log(cosplan?.parts)
    console.log(this.partId)
    this.part = cosplan?.parts?.find(p => p.id === +this.partId);
  }
}
