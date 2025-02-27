import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ArticleService } from '../../services/article.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'realworld-comment-list',
  imports: [CommonModule, CommentComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {
  public readonly articleService = inject(ArticleService);
}
