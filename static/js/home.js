$( document ).ready(function() {
	$('#btnLogout').click(function(){
		document.cookie = "username=Arvind; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	});
});
