import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterModule } from '@angular/router';
import classNames from 'classnames';

import { ArticlesQuery } from '@realworld/dto';

import { RouterCommand } from '../../utils/navigation.utils';

export interface Tab {
  id: string;
  label: string;
  href?: string | RouterCommand;
  icon?: string | null;
  filter: ArticlesQuery;
}

@Component({
  selector: 'realworld-tabs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabsComponent),
      multi: true,
    },
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsComponent implements ControlValueAccessor {
  public readonly classNames = classNames;

  @Input()
  public tabs: Tab[] = [];

  public disabled = false;
  public selectedTabId: Tab['id'] | null = null;

  onChange: CallableFunction = () => {};
  onTouched: CallableFunction = () => {};

  writeValue(value: Tab['id']): void {
    this.selectedTabId = value;
  }

  registerOnChange(fn: CallableFunction): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: CallableFunction): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(value: typeof this.selectedTabId) {
    this.selectedTabId = value;
    this.onChange(value);
    this.onTouched();
  }
}
