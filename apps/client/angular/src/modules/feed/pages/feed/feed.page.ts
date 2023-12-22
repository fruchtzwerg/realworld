import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TagListComponent } from '../../../../common/components/tag-list/tag-list.component';
import { FeedComponent } from '../../components/feed/feed.component';

@Component({
  selector: 'realworld-feed-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TagListComponent, FeedComponent],
  templateUrl: './feed.page.html',
  styleUrl: './feed.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedPage {}
