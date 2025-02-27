import { BehaviorSubject } from 'rxjs';

export class ModelSubject<T> extends BehaviorSubject<T> {
  get model() {
    return super.value;
  }

  set model(value) {
    super.next(value);
  }
}
