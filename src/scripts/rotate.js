const rotate = {
    /**
     * DTO
     *
     * @property {string} cardClass - CSS класс обертка элемента
     * @property {string} cardItemClass - CSS класс элемент
     * @property {number} angle - коэффициент изменения угла наклона элемента
     * @property {boolean} animateRotate - включение/отключение анимации поворота
     */
    settings: {
        cardClass: 'js-card',
        cardItemClass: 'js-card-item',
        angle: 40,
        animateRotate: true,
    },
    /**
     * Инициализация скрипта
     * @param {{}} userSettings Переданные настройки от пользователя
     */
    init(userSettings = {}) {
        this.settings = Object.assign(this.settings, userSettings);

        const cards = document.querySelectorAll(`.${this.settings.cardClass}`);
        if (cards) {
            cards.forEach(card => {
                card.addEventListener('mousemove', e => this.animateRotateStart(e));
                card.addEventListener('mouseout', e => this.animateRotateStop(e));
            });
        }
    },
    /**
     * Метод определяющий, на нужном ли элементе произошло событие
     * @param {event} e событие, которое произошло на элементе
     * @return {HTMLElement || boolean} возвращает элемент на котором произошло событие либо false если нет нужного элемента
     */
    isSoughtElement(e) {
        let target = e.target.closest(`.${this.settings.cardItemClass}`);
        if (target) {
            return target;
        } else {
            return false;
        }
    },
    /**
     * Метод поворота элемента
     * @param {Event} e событие полученное обработчиком
     */
    animateRotateStart(e) {
        const card = this.isSoughtElement(e);
        if (card && this.settings.animateRotate) {
            let halfHeight = card.offsetHeight / 2,
                halfWidth  = card.offsetWidth / 2;

            card.style.transform = `
                perspective(5000px) 
                rotateX(${-(e.offsetY - halfHeight) / this.settings.angle}deg)
                rotateY(${(e.offsetX - halfWidth) / this.settings.angle}deg)`;
        }
    },
    /**
     * Метод отмены поворота и возврата в исходное состояние
     * @param {Event} e событие полученное обработчиком
     */
    animateRotateStop(e) {
        const card = this.isSoughtElement(e);
        if (card && this.settings.animateRotate) {
            card.style.transform = 'rotate(0)';
        }
    },
};
window.onload = () => rotate.init();