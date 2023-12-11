import { BehaviorSubject } from 'rxjs';

export class ModelSubject<T> extends BehaviorSubject<T> {
  get model() {
    console.log('get model', this.getValue());
    return super.value;
  }

  set model(value) {
    console.log('set model', value);
    super.next(value);
  }
}
