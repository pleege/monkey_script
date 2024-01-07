// ==UserScript==
// @name         快捷搜索
// @namespace    http://github.com/xcoplit/monkey_script
// @version      2024-01-07
// @description  alt+b baidu selection | alt+g google selection
// @author       xcoplit
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function new_window(url){
        const elink = document.createElement('a');
        elink.href = url;
        elink.target = '_blank';
        elink.rel = 'noreferrer';
        elink.style.display = "none";
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
    }

    function baidu(keywords){
        new_window("https://www.baidu.com/s?wd=" + encodeURIComponent(keywords));
    }

    function google(keywords){
        new_window("https://www.google.com/search?newwindow=1&q=" + encodeURIComponent(keywords));
    }

    document.addEventListener('keydown', function(event) {
        if (event.metaKey){
            const keywords = window.getSelection().toString().trim();
            if (keywords.length >= 2){
                if (event.key == 'b') baidu(keywords);
                if (event.key == 'g') google(keywords);
            }
        }


    });
})();
