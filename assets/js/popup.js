// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

//'use strict';
var port = chrome.runtime.connect();



chrome.runtime.getBackgroundPage(function(bg){
	if(bg.totalHTML){
		$("body").html(bg.totalHTML); 
	}
	setInterval(function(){
		bg.totalHTML = $("body").html();
		$(".scroll-button").trigger("change");
	},1000);    


	$(document).ready(function(){
		chrome.tabs.executeScript(null, { file: "assets/js/jquery.min.js" }, function() {
			chrome.tabs.executeScript(null, { code: "var followingInterval; var cou = 0;" }, function(){
				chrome.tabs.executeScript(null, { file: "assets/js/content.js" });
			});
		});
		$(".container").on("click", ".start-button", function(){
			var time = (Number.isInteger(parseInt($("#time").val())) ? $("#time").val() : '1')
			var scrollInterval = (Number.isInteger(parseInt($("#scrollInterval").val())) ? $("#scrollInterval").val() : '5')
			var doScroll = $("#doScroll:checked").length ? true : false;
			chrome.tabs.executeScript(null, { code: "startFollowing('"+time+"',"+doScroll+",'"+scrollInterval+"')" });
			$(".scroll-button, .form-control").prop("disabled", true);
			$(this).hide();
			$(".stop-button").show();
			chrome.tabs.getSelected(null,function(tab) { // null defaults to current window
				var title = tab.title;
				$("#working-on-tab span").text(title);
				$("#working-on-tab").slideDown();
			});
		});
		$(".container").on("click", ".stop-button", function(){
			chrome.tabs.executeScript(null, { code: "stopFollowing()" });
			$(this).hide();
			$(".scroll-button, .form-control").prop("disabled", false);
			$(".start-button").show();
			$("#working-on-tab").slideUp();
		});
		$(".container").on("change", ".scroll-button", function(){
			if($(this).is(":checked")){
				$(".scrollIntDiv").slideDown();
			}
			else{
				$(".scrollIntDiv").slideUp();
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
})

