
// $(function(){
$( document ).ready(function() {
	$('#btnSignUp').click(function(){
		alert('reached');
		$.ajax({
			url: '/signUp',
			data: $('#formSignIn').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});
// });
