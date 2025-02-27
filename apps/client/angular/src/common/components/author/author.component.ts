import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Article, Profile } from '@realworld/dto';

import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'realworld-author',
  imports: [CommonModule, RouterModule, AvatarComponent],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorComponent {
  @Input()
  public author!: Profile;

  @Input()
  public createdAt!: Article['createdAt'];
}
