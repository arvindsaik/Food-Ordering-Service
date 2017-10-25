$( document ).ready(function() {
	if(getCookie("email") == ""){
		alert("login first !");
		window.location = "/";
	}
	$('#btnLogout').click(function(){
		$.ajax({
				url: '/delete_temp_table',
				data: "username="+ getCookie("email"),
				type: 'POST',
				success: function(){
					// alert("Deleted table!");
					document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
					window.location = "/";
				},
				error: function(error){
					alert("Error deleting..!");
				}
		});
		return false;
	});
	function setCookie(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+ d.toUTCString();
		    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
	}

	$("#username")[0].innerHTML = getCookie("email");
	$('.btn-success').click(function(){
		// alert("set "+ $(this).text());
		setCookie("Canteen",$(this).text());
		window.location = "/user";
		return false;
	});
	$.ajax({
			url: '/create_temp_table',
			data: "username="+ getCookie("email"),
			type: 'POST',
			success: function(){
				// alert("Created table!");
				// var array = JSON.parse(data);
				// fillTable(array);
			},
			error: function(error){
				alert("Error!");
			}
	});

});
