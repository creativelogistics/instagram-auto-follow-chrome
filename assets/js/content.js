function startFollowing(cou){
	if(cou > 0){
		$("button").each(function(){
			console.log("STARTED FOLLOWING for "+cou+" times! https://kashanshah.ga");
			if(cou > 0 && $(this).text() == "Follow"){
				$(this).click();
				console.log("start");
				cou--;
			}
			else{
				console.log("FINISHED");
			}
		}).promise().done(function(){
			startFollowing(cou);
		});
	}
}

function stopFollowing(){
	clearInterval();
}