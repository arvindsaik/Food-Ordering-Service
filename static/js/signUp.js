
// $(function(){
$( document ).ready(function() {
	$('#btnSignUp').click(function(){
		// alert('reached');
		$.ajax({
			url: '/signUp',
			data: $('#formSignUp').serialize(),
			type: 'POST',
			success: function(response){
				alert("Created User !");
				
				// window.location.href = "/";
				// $("#login").trigger('click');
			},
			error: function(error){
				alert("Error creating user !");
			}
		});
	});
	$('#btnSignIn').click(function(){
		$.ajax({
			url: '/signIn',
			data: $('#formSignIn').serialize(),
			type: 'POST',
			success: function(response){
				window.location = "../home";
			},
			error: function(error){
				alert("Wrong username or password");
			}
		});
	});

});
// });
