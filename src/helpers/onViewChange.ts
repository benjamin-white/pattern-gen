import debounce from 'lodash/debounce'

export const onViewChange = (cb: Function) => {
  ['resize', 'orientationchange'].forEach(event => {
    window.addEventListener(event, debounce(cb, 100, {trailing: true}));
  });
}