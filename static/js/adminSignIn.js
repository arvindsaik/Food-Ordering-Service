$( document ).ready(function() {
	$('#btnAdminSignIn').click(function(){
		$.ajax({
			url: '/adminSignIn',
			data: $('#formAdminSignIn').serialize(),
			type: 'POST',
			success: function(response){
				alert("successfully logged in !");

				// window.location.href = "/";
				// $("#login").trigger('click');
			},
			error: function(error){
				alert("Wrong username or password");
			}
		});
	});
});
