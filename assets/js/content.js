function startFollowing(time = 1, doScroll = false, scrollTime = 15){
	scrollTime = scrollTime * 1000;
	time = time * 1000;
	cou = 0;
	var buttons = document.getElementsByTagName("button");
	var timer = setInterval(function(){
		if(typeof buttons[cou] !== "undefined"){
			if(buttons[cou].innerText == "Follow"){
				buttons[cou].click()
			}
			cou++;
		}
	}, time);
	if(doScroll){
		var scrollTimer = setInterval(function(){
			window.scrollTo(0,document.querySelector("body").scrollHeight);
		}, scrollTime);
	}
}

function stopFollowing(){
    for (var i = 1; i < 99999; i++){
        window.clearInterval(i);
	}
}