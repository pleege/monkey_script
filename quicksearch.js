// ==UserScript==
// @name         快捷键搜索
// @namespace    http://github.com/xcoplit
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

    function location_ip(keywords){
        const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
        if (ipv4Regex.test(keywords.trim())){
            let ip = keywords.trim()
            const url = 'https://hcapi22.market.alicloudapi.com/ip?ip='+ip;
            fetch(url, {
                method: 'GET',
                headers: {
                    'authority': 'hcapi22.market.alicloudapi.com',
                    'authorization': 'APPCODE 20adcc24713449ab8f2ad0776fd77d3d',
                    'cache-control': 'no-cache',
                    'origin': 'https://widget.codelife.cc',
                    'pragma': 'no-cache',
                    'referer': 'https://widget.codelife.cc/'
                },
                mode: 'cors',
                credentials: 'omit',
                referrerPolicy: 'no-referrer',
            }).then(response => response.json()).catch(error => console.error('Error:', error)).then(function(ret){
                let ip = ret.data.ip;
                let isp = ret.data.isp;
                let country = ret.data.country;
                let city = ret.data.city;
                let region = ret.data.region;
                alert(ip+"\n"+country+" ["+isp+"]\n"+region+" "+city)
            });
        }

    }

    function onkeydown(event){
        // console.log(event)
        if (event.metaKey){
            const keywords = window.getSelection().toString().trim();
            if (keywords.length >= 2){
                if (event.key == 'b') baidu(keywords);
                if (event.key == 'g') google(keywords);
                if (event.key == 'i') location_ip(keywords);
            }
        }
    }

    document.addEventListener('keydown', onkeydown);
    document.addEventListener('DOMContentLoaded', function() {
        // console.log('load content end');
        let etext = document.querySelector("input[type=text]");
        let esearch = document.querySelector("input[type=search]");
        etext && etext.addEventListener('keydown',onkeydown);
        esearch && esearch.addEventListener('keydown',onkeydown);
    })
})();
