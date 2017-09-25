
// $(function(){
$( document ).ready(function() {
	$('#btnSignUp').click(function(){
		// alert('reached');
		$.ajax({
			url: '/signUp',
			data: $('#formSignUp').serialize(),
			type: 'POST',
			success: function(response){
				alert(response);
				// window.location.href = "/";
				// $("#login").trigger('click');
			},
			error: function(error){
				console.log(error);
			}
		});
	});
	$('#btnSignIn').click(function(){
		$.ajax({
			url: '/signIn',
			data: $('#formSignIn').serialize(),
			type: 'POST',
			success: function(response){
				alert(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});

});
// });
