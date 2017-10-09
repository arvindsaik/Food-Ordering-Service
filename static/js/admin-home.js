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
	var Items;
	function isArray (value) {
		return value && typeof value === 'object' && value.constructor === Array;
	};
	$.ajax({
			url: '/display-item',
			type: 'GET',
			success: function(data){
				var array = JSON.parse(data);
				alert(array);
				fillTable(array);
			},
			error: function(error){
				alert("Error!");
			}
	});
	function fillTable(Items){
		var i;
		console.log(Items);
		console.log(Items.length);
		for(i=0;i< Items.length;++i){

			var table = document.getElementById("tableAllItems");

			// Create an empty <tr> element and add it to the 1st position of the table:
			var row = table.insertRow(0);

			// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);

			// Add some text to the new cells:
			cell1.innerHTML = Items[i][1];
			cell2.innerHTML = Items[i][2];	
			cell3.innerHTML = Items[i][3];
			cell4.innerHTML = Items[i][4];
			cell5.innerHTML = Items[i][6];
			cell6.innerHTML = '<button style="margin: 10px;" class="btn btn-sm btn-primary">Edit</button><button style="margin: 10px;" class="btn btn-sm btn-success">Save</button><button style="margin: 10px;" class="btn btn-sm btn-danger">Delete</button>';
		}
	}
});
