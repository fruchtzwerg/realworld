import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ArticleService } from '../../services/article.service';
import { ImpressionComponent } from '../impression/impression.component';

@Component({
  selector: 'realworld-article-header',
  imports: [CommonModule, ImpressionComponent],
  templateUrl: './article-header.component.html',
  styleUrl: './article-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleHeaderComponent {
  public readonly article$ = inject(ArticleService).articleQuery$;
}
