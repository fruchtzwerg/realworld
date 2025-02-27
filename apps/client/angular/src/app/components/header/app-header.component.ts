import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { ArticleHeaderComponent } from '../../../modules/article/components/header/article-header.component';
import { ArticleService } from '../../../modules/article/services/article.service';
import { FeedHeaderComponent } from '../../../modules/feed/components/header/feed-header.component';
import { UserHeaderComponent } from '../../../modules/user/components/header/user-header.component';
import { UserService } from '../../../modules/user/services/user.service';

@Component({
  selector: 'realworld-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ArticleHeaderComponent, FeedHeaderComponent, UserHeaderComponent],
})
export class AppHeaderComponent {
  public readonly selected$ = combineLatest({
    slug: inject(ArticleService).slug$,
    profile: inject(UserService).username$,
  }).pipe(
    map(({ slug, profile }) => {
      switch (true) {
        case Boolean(slug):
          return 'article';
        case Boolean(profile):
          return 'profile';

        default:
          return 'home';
      }
    })
  );
}
