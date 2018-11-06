// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//'use strict';
var port = chrome.runtime.connect();

$(document).ready(function(){
	chrome.tabs.executeScript(null, { file: "assets/js/jquery.min.js" }, function() {
		chrome.tabs.executeScript(null, { code: "var followingInterval; var cou = 0; var followCount = " + (Number.isInteger(parseInt($("#noToFollow").val())) ? parseInt($("#noToFollow").val()) : '3') }, function(){
			chrome.tabs.executeScript(null, { file: "assets/js/content.js" });
		});
	});
	$(".container").on("click", ".action-button", function(){
		if($(this).hasClass("start-button")){
			console.log("start following!");
			chrome.tabs.executeScript(null, { code: "startFollowing("+(Number.isInteger(parseInt($("#noToFollow").val())) ? $("#noToFollow").val() : '3')+")" });
			$('#noToFollow').val('3');
		}
		else{
			console.log("stop following!");
			chrome.tabs.executeScript(null, { code: "stopFollowing()" });
		}
	});
});


// Open www.kashanshah.ga on first time install
function install_notice() {
    if (localStorage.getItem('instagramautofollowinstalled'))
        return;
    var now = new Date().getTime();
    localStorage.setItem('instagramautofollowinstalled', now);
    chrome.tabs.create({url: "https://www.kashanshah.ga"});
}
install_notice();