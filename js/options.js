// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
"use strict";

$(function() {
    /* 回填数据 */
    chrome.storage.sync.get({
        wrapName: ''
    }, function(items) {
        $('#wrapName').val(items.wrapName);
    });

    /* 事件绑定 */
    $('#set').click(function() {
        var wrapName = $('#wrapName').val();

        if (!wrapName) {
            $('#status').removeClass('text-success').addClass('text-danger').html('Type something..');
            setTimeout(function() {
                $('#status').html('');
            }, 750);
            return false;
        }

        chrome.storage.sync.set({
            wrapName: wrapName
        }, function() {
            $('#status').removeClass('text-danger').addClass('text-success').html('Success!!!');
            setTimeout(function() {
                $('#status').html('');
            }, 750);
        });
    });

    $('#reset').click(function() {
        chrome.storage.sync.set({
            wrapName: '',
        }, function(items) {
            $('#wrapName').val('');
            $('#status').removeClass('text-danger').addClass('text-success').html('Success!!!');
            setTimeout(function() {
                $('#status').html('');
            }, 750);
        });
    });
});
