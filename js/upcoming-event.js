window.addEventListener('DOMContentLoaded', function () {
    var $popup = document.querySelector('.upcoming-event');

    // クラス名ではなく日付の属性で拾う。
    // メイン／サブで見た目が違っても、日付を持つ要素はすべて対象になる。
    var $events = Array.from(document.querySelectorAll('[data-start-date][data-end-date]'));

    if (!$popup || !$events.length) {
        return;
    }

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var upcoming = $events
        .filter(function ($event) {
            return toLocalDate($event.dataset.endDate) >= today;
        })
        .sort(function ($a, $b) {
            return toLocalDate($a.dataset.startDate) - toLocalDate($b.dataset.startDate);
        });

    if (!upcoming.length) {
        $popup.querySelector('.upcoming-event-label').textContent = 'EVENTS';
        $popup.querySelector('.upcoming-event-title').textContent = 'すべての企画が終了しました';
        $popup.querySelector('.upcoming-event-countdown').textContent = '';
        $popup.hidden = false;
        return;
    }

    // data-primary が付いた回（メインの告知）を優先し、
    // 終了していればそのとき一番近い回に切り替える。
    var target = upcoming.find(function ($event) {
        return $event.hasAttribute('data-primary');
    }) || upcoming[0];

    var startDate = toLocalDate(target.dataset.startDate);
    var daysUntil = Math.ceil((startDate - today) / 86400000);

    $popup.querySelector('.upcoming-event-title').textContent = target.dataset.eventName;
    $popup.querySelector('.upcoming-event-countdown').textContent =
        daysUntil <= 0 ? '開催中' : '開催まであと ' + daysUntil + ' 日';
    $popup.hidden = false;

    function toLocalDate(dateString) {
        var parts = dateString.split('-').map(Number);
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
});
