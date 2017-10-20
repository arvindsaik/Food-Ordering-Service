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
				// alert($("#ipemail").val() + " cookie value");
				setCookie("Admin-email",$("#ipemail").val(),1);
				window.location = "../admin-dashboard";

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
