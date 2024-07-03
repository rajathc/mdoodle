document.addEventListener('DOMContentLoaded', (event) => {
    const closeBtn = document.getElementById('close-btn');
    const banner = document.getElementById('banner');

    closeBtn.onclick = function() {
        banner.style.display = 'none';
    };
});

// Fullscreen toggle

const fullscreenContainer = document.getElementById('fullscreen-container');
const enterFullscreenIcon = document.getElementById('enter-fullscreen');
const exitFullscreenIcon = document.getElementById('exit-fullscreen');

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

fullscreenContainer.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        enterFullscreenIcon.classList.add('visible');
        exitFullscreenIcon.classList.remove('visible');
    } else {
        enterFullscreenIcon.classList.remove('visible');
        exitFullscreenIcon.classList.add('visible');
    }
});

// Dark/light mode toggle

document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("theme-toggle");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let currentTheme = localStorage.getItem("theme");

    function applyTheme(theme) {
      if (theme === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelectorAll('header, footer, .container').forEach(function(element) {
          element.classList.add('dark-mode');
        });
      } else {
        document.body.classList.remove("dark-mode");
        document.querySelectorAll('header, footer, .container').forEach(function(element) {
          element.classList.remove('dark-mode');
        });
      }
    }

    if (currentTheme === null) {
      currentTheme = prefersDarkScheme.matches ? "dark" : "light";
    }

    applyTheme(currentTheme);

    toggleButton.addEventListener("click", function() {
      const isDarkMode = document.body.classList.toggle("dark-mode");
      document.querySelectorAll('header, footer, .container').forEach(function(element) {
        element.classList.toggle('dark-mode', isDarkMode);
      });
      const theme = isDarkMode ? "dark" : "light";
      localStorage.setItem("theme", theme);
    });

    prefersDarkScheme.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        const newColorScheme = e.matches ? "dark" : "light";
        applyTheme(newColorScheme);
      }
    });
  });