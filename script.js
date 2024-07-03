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


//   Popups

var popupButton = document.getElementById('popupButton');
var popup = document.getElementById('popup');

var isOpen = false; // Track if popup is open

popupButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from bubbling up

    // Toggle popup visibility
    if (isOpen) {
        closePopup();
    } else {
        openPopup();
    }
});

// Function to open the popup
function openPopup() {
    // Determine screen width for responsive positioning
    var screenWidth = window.innerWidth;

    // Show popup based on screen width
    if (screenWidth <= 768) {
        // Mobile screen positioning
        popup.classList.add('popup-mobile');
    } else {
        // Desktop screen positioning
        popup.classList.add('popup-desktop');
        
        // Calculate position relative to the button
        var buttonRect = popupButton.getBoundingClientRect();
        var popupWidth = popup.offsetWidth;
        
        var popupLeft = buttonRect.left + (buttonRect.width / 2) - (popupWidth / 2);
        var popupTop = buttonRect.bottom + 12; // 12px below the button
        
        // Apply calculated position
        popup.style.left = popupLeft + 'px';
        popup.style.top = popupTop + 'px';
    }

    // Show popup
    popup.style.display = 'block';

    // Set isOpen to true
    isOpen = true;

    // Close popup when clicking outside
    document.addEventListener('click', closePopupOutside);
}

// Function to close the popup
function closePopup() {
    popup.style.display = 'none';
    popup.classList.remove('popup-mobile', 'popup-desktop');
    isOpen = false;
    document.removeEventListener('click', closePopupOutside);
}

// Function to close popup when clicking outside
function closePopupOutside(event) {
    if (!popup.contains(event.target) && event.target !== popupButton) {
        closePopup();
    }
}





