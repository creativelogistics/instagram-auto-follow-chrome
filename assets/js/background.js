chrome.runtime.onConnect.addListener(function (externalPort) {
  externalPort.onDisconnect.addListener(function () {
  //  alert("onDisconnect")
	chrome.tabs.executeScript(null, { file: "assets/js/stopFollowing.js" }, function(){
		chrome.tabs.executeScript(null, { code: "clearInterval(followingInterval);" });
	});
    // Do stuff that should happen when popup window closes here
  })

//  alert("onConnect")
})