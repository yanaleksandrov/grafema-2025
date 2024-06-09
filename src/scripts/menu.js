import { scroll } from './helpers';

document.body.addEventListener('click', ({target}) => {
    let element = target.closest('[data-js-burger]'),
        icon    = element?.querySelector('i'),
        menu    = document.querySelector('[data-js-menu]');
    if (icon && menu) {
        icon.classList.toggle('active');
        menu.classList.toggle('active');

        if (icon.classList.contains('active')) {
            scroll.lock();
        } else {
            scroll.unlock();
        }
    }
});