import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { getRandomWidth } from '@realworld/utils';

import { CommentCreatorComponent } from '../../components/comment-creator/comment-creator.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { ImpressionComponent } from '../../components/impression/impression.component';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'realworld-article',
  imports: [CommonModule, ImpressionComponent, CommentCreatorComponent, CommentListComponent],
  templateUrl: './article.page.html',
  styleUrl: './article.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePage {
  #articleService = inject(ArticleService);

  public readonly slug$ = this.#articleService.slug$;
  public readonly article$ = this.#articleService.articleQuery$;

  public get skeletonLines() {
    return Array.from({ length: 24 });
  }

  public get skeletonWidth() {
    return getRandomWidth();
  }
}
