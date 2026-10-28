// main.js

(function () {
    var openBtn = document.getElementById('how-it-works-btn');
    var overlay = document.getElementById('hiw-modal-overlay');
    var closeBtn = document.getElementById('hiw-modal-close');

    if (!openBtn || !overlay || !closeBtn) {
        return;
    }

    function openModal(e) {
        e.preventDefault();
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
            closeModal();
        }
    });
})();
