import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'realworld-feed-header',
  imports: [CommonModule],
  templateUrl: './feed-header.component.html',
  styleUrl: './feed-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedHeaderComponent {}
