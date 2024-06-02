import Splitting from 'splitting';

const elements = document.querySelectorAll('[data-splitting]');
if (elements) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                Splitting({
                    target: entry.target
                });
                observer.unobserve(entry.target);
            }
        });
    });

    elements.forEach((element) => {
        observer.observe(element);
    });
}