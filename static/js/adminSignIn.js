function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
$( document ).ready(function() {
	$('#btnAdminSignIn').click(function(){
		$.ajax({
			url: '/adminSignIn',
			data: $('#formAdminSignIn').serialize(),
			type: 'POST',
			success: function(response){
				// alert('Redirecting....');
				window.location = "../admin-dashboard";
				//setCookie($("#inputFirstName")[0].value,1,1);
				// window.location.href = "/";
				// $("#login").trigger('click');
			},
			error: function(error){
				alert("Wrong username or password");
			}
		});
		return false;
	});
});
