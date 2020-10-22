function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }     
}

(function($) {
    'use strict';

    $(document).ready(function() {
        var currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
        if (currentTheme) {
            if (currentTheme === 'dark') {
                document.getElementById('slider').checked = false;
            } else {
                document.getElementById('slider').checked = true;
            }
        }
    });      
})(jQuery);