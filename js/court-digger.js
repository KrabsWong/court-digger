// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

let wrapName = '.Section1';

/* 获取配置信息 */
chrome.storage && chrome.storage.sync.get({
    wrapName: ''
}, function(items) {
    wrapName = items.wrapName || wrapName;
});

/* 获取当前tab信息 */
chrome.tabs && chrome.tabs.query({
    // 当前焦点所在的页面
    currentWindow: true,
    // 选中的tab
    active: true
}, function (foundTabs) {
    if (foundTabs.length == 0) return false;
    var matchedURL = [
        /^(http|https):\/\/www\.bjcourt\.gov\.cn\/cpws\/paperView\.htm\?id=\d+/g
    ];

    matchedURL.forEach(function(regItem) {
        if(regItem.test(foundTabs[0].url)) {
            chrome.tabs.executeScript(null, {
                code: `document.querySelectorAll("${wrapName}")[0].innerText`
            }, function(data) {
                $.toggle('.digger-result', 'hide');

                if(data && data[0]) {
                    $.copy(data[0]);
                    $.toggle('[data-role="success"]', 'show');
                } else {
                    $.toggle('[data-role="failed"]', 'show');
                }
            });
        }
    });
});

var $ = {
    get: function(elementName) {
        return document.querySelectorAll(elementName);
    },
    toggle: function(elementName, toggleType) {
        var elements = document.querySelectorAll(elementName);
        for(var i = 0, len = elements.length; i < len; i++) {
            elements[i].style.display = (toggleType == 'show' ? 'block' : 'none');
        }
    },
    copy: function(data) {
        const input = document.createElement('textarea');
        input.style.width = 0;
        input.style.height = 0;
        input.style.opacity = 0;
        input.value = data;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        document.body.removeChild(input);
    }
}
