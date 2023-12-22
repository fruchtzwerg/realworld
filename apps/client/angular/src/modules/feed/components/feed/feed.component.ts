import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QueryObserverResult } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';
import { map, switchMap } from 'rxjs';

import { ArticlesDto } from '@realworld/dto';

import { Tab, TabsComponent } from '../../../../common/components/tabs/tabs.component';
import { ArticleListComponent } from '../../../article/components/article-list/article-list.component';

@Component({
  selector: 'realworld-feed',
  standalone: true,
  imports: [CommonModule, ArticleListComponent, TabsComponent, FormsModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {
  #route = inject(ActivatedRoute);

  public readonly articlesQuery$ = this.#route.data.pipe(
    map((data) => data['articles'] as Result<QueryObserverResult<ArticlesDto>>),
    switchMap((res) => res.result$)
  );

  public readonly tabs$ = this.#route.data.pipe(map((data) => (data['tabs'] ?? []) as Tab[]));
}
