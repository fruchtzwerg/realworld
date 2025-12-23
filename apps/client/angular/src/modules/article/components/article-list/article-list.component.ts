
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { QueryObserverResult } from '@ngneat/query';

import { ArticlesDto } from '@realworld/dto';

import { EmptyComponent } from '../../../../common/components/empty/empty.component';
import { ArticleModule } from '../../article.module';
import { ArticleItemComponent } from '../article-item/article-item.component';

@Component({
  selector: 'realworld-article-list',
  imports: [ArticleItemComponent, ArticleModule, EmptyComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  @Input()
  public articlesQuery: QueryObserverResult<ArticlesDto> | null = null;
}
