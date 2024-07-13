import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { Cosplan } from '../../models/cosplan';

@Component({
  selector: 'ezc-cosplan-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, NgOptimizedImage, MatIconModule],
  templateUrl: './cosplan-card.component.html',
  styleUrl: './cosplan-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosplanCardComponent {
  @Input({required: true}) cosplan! : Cosplan;

  ngOnInit(): void {
    console.log(this.cosplan);
  
  }


}
