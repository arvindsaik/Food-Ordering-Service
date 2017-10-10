$( document ).ready(function() {
	$('#addItem').click(function(){
		// alert('reached');
		console.log($('#addItemForm').serialize());
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
	$('.deleteBtn').click(function(){
		alert("clicked!");
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
			var cell7 = row.insertCell(6);

			// Add some text to the new cells:
			cell1.innerHTML = Items[i][0];
			cell2.innerHTML = Items[i][1];
			cell3.innerHTML = Items[i][2];	
			cell4.innerHTML = Items[i][4];
			cell5.innerHTML = Items[i][3];
			cell6.innerHTML = Items[i][6];
			cell7.innerHTML = '<button style="margin: 10px;" class="btn btn-sm btn-primary editBtn">Edit</button><button style="margin: 10px;" class="btn btn-sm btn-danger deleteBtn">Delete</button>';	
		}
		$('.deleteBtn').click(function(){
			console.log(($(this).parent()).parent().children()[0].textContent);
			var id = ($(this).parent()).parent().children()[0].textContent;
			$.ajax({
			url: '/delete-item',
			data: "id="+id,
			type: 'POST',
			success: function(response){
				alert("Deleted Item!");
				window.location.href = "../admin-dashboard";
			},
			error: function(error){
				alert("Error deleting item !");
			}
			});
		});
		var modal = document.getElementById('myModal');

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		// When the user clicks the button, open the modal 
		$('.editBtn').click(function(){
			modal.style.display = "block";
			    $("#editItemForm").find("#item")[0].value = ($(this).parent()).parent().children()[1].textContent;
			    $("#editItemForm").find("#price")[0].value = ($(this).parent()).parent().children()[2].textContent;
			    $("#editItemForm").find("#imgName")[0].value = ($(this).parent()).parent().children()[3].textContent;
			    $("#editItemForm").find("#availability")[0].value = ($(this).parent()).parent().children()[4].textContent;
			    $("#editItemForm").find("#prepTime")[0].value = ($(this).parent()).parent().children()[5].textContent;
			    var id = ($(this).parent()).parent().children()[0].textContent;
			$("#editItem").click(function(){
			    console.log($('#editItemForm').serialize());
			    $.ajax({
					url: '/delete-item',
					data: "id="+id,
					type: 'POST',
					success: function(response){
						alert("Deleted Item!");
				},
				error: function(error){
					alert("Error deleting item !");
				}
				});
				$.ajax({
					url: '/add-item',
					data: $('#editItemForm').serialize(),
					type: 'POST',
					success: function(response){
						alert("Edited Item!");
						// window.location.href = "../admin-dashboard";
					},
					error: function(error){
						alert("Error editing item !");
					}
				});		
			});

		});



		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
		    modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}

	}
});
