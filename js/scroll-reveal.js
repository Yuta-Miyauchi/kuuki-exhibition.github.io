document.documentElement.classList.add('js-scroll-reveal');

window.addEventListener('load', function () {
    var $items = document.querySelectorAll('.lead-item, .info');

    if (!$items.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        $items.forEach(function ($item) {
            $item.classList.add('is-visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
            else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    });

    $items.forEach(function ($item) {
        observer.observe($item);
    });
});
