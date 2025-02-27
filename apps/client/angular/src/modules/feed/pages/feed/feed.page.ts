import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TagListComponent } from '../../../../common/components/tag-list/tag-list.component';

@Component({
  selector: 'realworld-feed-page',
  imports: [CommonModule, RouterModule, TagListComponent],
  templateUrl: './feed.page.html',
  styleUrl: './feed.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedPage {}
