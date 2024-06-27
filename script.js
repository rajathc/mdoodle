document.addEventListener('DOMContentLoaded', (event) => {
    const closeBtn = document.getElementById('close-btn');
    const banner = document.getElementById('banner');

    closeBtn.onclick = function() {
        banner.style.display = 'none';
    };
});
