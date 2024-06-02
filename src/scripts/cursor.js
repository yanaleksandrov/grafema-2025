/**
 * Beautiful cursor design
 *
 * @version: 1.0.0
 * @license: Released under the MIT License
 * @see:     Fork of https://github.com/seattleowl/Pointer.js
 */
(function () {
    'use strict';

    const cursor = document.createElement('div');
    cursor.id = 'cursor-dot';

    const ring = document.createElement('div');
    ring.id = 'cursor-ring';

    document.body.insertAdjacentElement('afterEnd', cursor);
    document.body.insertAdjacentElement('afterEnd', ring);

    let mouseX    = -100;
    let mouseY    = -100;
    let ringX     = -100;
    let ringY     = -100;
    let isHover   = false;
    let mouseDown = false;
    let border    = parseInt(getComputedStyle(cursor).getPropertyValue('border-left-width'));

    const initCursor = () => {
        let root = document.getElementsByTagName('html')[0];
        if (root) {
            root.classList.add('hide-cursor');
        }

        window.onmousemove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            let hoverElement = e.target.closest('.js-cursor-arrow');
            if (hoverElement) {
                ring.classList.add('cursor');
                cursor.classList.add('cursor');
            } else {
                ring.classList.remove('cursor');
                cursor.classList.remove('cursor');
            }
        };
        window.onmousedown = () => {
            mouseDown = true;
        };
        window.onmouseup = () => {
            mouseDown = false;
        };
        const trace = (a, b, n) => {
            return (1 - n) * a + n * b;
        };
        window['trace'] = trace;

        const render = () => {
            ringX   = trace(ringX, mouseX, 0.5);
            ringY   = trace(ringY, mouseY, 0.5);
            isHover = !!(document.querySelector('a:hover') || document.querySelector('button:hover'));
            if (isHover && !cursor.classList.contains('active')) {
                cursor.classList.add('active');
            }
            if (!isHover && cursor.classList.contains('active')) {
                cursor.classList.remove('active');
            }
            ring.style.transform   = `translate(${ringX}px, ${ringY}px)`;
            cursor.style.transform = `translate(${mouseX - border}px, ${mouseY - border}px)`;

            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    };
    initCursor();
})();