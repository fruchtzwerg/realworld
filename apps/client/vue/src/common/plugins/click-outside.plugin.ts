import type { Plugin } from 'vue';

export const ClickOutsidePlugin: Plugin = {
  install(app) {
    app.directive('click-outside', {
      beforeMount(el, binding) {
        el.clickOutsideEvent = function (event: MouseEvent) {
          if (!(el === event.target || el.contains(event.target as Node))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    });
  },
};
