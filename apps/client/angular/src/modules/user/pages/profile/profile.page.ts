
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeedComponent } from '../../../feed/components/feed/feed.component';

@Component({
  selector: 'realworld-profile',
  imports: [RouterModule],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {}
