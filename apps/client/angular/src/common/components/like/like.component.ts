import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  inject,
} from '@angular/core';
import classNames from 'classnames';

import { Article } from '@realworld/dto';

import { ArticleService } from '../../../modules/article/services/article.service';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'realworld-like',
  imports: [CommonModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LikeComponent {
  public readonly classNames = classNames;

  @Input()
  public article?: Article;

  @Input()
  public btnClass?: string;

  @ContentChild('slot')
  public slot?: TemplateRef<HTMLElement>;

  public readonly authService = inject(AuthService);
  public readonly articleService = inject(ArticleService);
}
