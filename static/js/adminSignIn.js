$( document ).ready(function() {
	$('#btnAdminSignIn').click(function(){
		$.ajax({
			url: '/adminSignIn',
			data: $('#formAdminSignIn').serialize(),
			type: 'POST',
			success: function(response){
				alert('Redirecting....');
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
