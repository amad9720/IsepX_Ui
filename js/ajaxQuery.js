$(document).ready(function(){
		$("button").click(function(){
	var question = {
		"q": $('#inputEmail'). serialize()
		};

	var data = JSON.stringify(question);

	var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://lawerassistance.eu-gb.mybluemix.net/answer",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
  		},
  "processData": false,
  "data": data
	};
			$.ajax(settings).done(function (response) {
		 	 console.log(response);
		});
});


function successFn(result){
		
		var htmlString = "";
		for(var i = 0;i<result.cdr.length/2;i++){
			htmlString += " <p>" + result.cdr[i].doc.body +"</p>"; 
	}
	$("#docContainer").append("htmlString");
}
	
});
