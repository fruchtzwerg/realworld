
import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'realworld-comment-shell',
  imports: [],
  templateUrl: './comment-shell.component.html',
  styleUrl: './comment-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentShellComponent {
  @ContentChild('slot')
  public slot?: TemplateRef<HTMLElement>;
}
