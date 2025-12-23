
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { injectArticleApi } from '../../../api/api.module';

@Component({
  selector: 'realworld-tag-list',
  imports: [RouterModule],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  public tags = injectArticleApi().getTags().result;
}
