import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Article } from '@realworld/dto';

import { AuthorComponent } from '../../../../common/components/author/author.component';
import { LikeComponent } from '../../../../common/components/like/like.component';

@Component({
  selector: 'realworld-article-item',
  imports: [CommonModule, RouterModule, AuthorComponent, LikeComponent],
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleItemComponent {
  @Input()
  public article!: Article;

  public readonly wrapperClass = 'py-6 border-t border-t-neutral';
}
