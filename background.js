// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.browserAction.onClicked.addListener(function() {
  chrome.windows.create({ url: "popup.html", type: "popup" }, function(window) {
    // Actions here
  });
});

