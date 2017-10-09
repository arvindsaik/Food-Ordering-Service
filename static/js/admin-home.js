$( document ).ready(function() {
	$('#addItem').click(function(){
		// alert('reached');
		$.ajax({
			url: '/add-item',
			data: $('#addItemForm').serialize(),
			type: 'POST',
			success: function(response){
				alert("Added Item!");
			},
			error: function(error){
				alert("Error adding item !");
			}
		});
	});

});
