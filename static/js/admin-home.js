$( document ).ready(function() {
		var deliveryBoys = [];
		var finalOrderId = 0;
		var modal3 = document.getElementById('myModal3');

		// Get the <span> element that closes the modal
		var span3 = document.getElementById("close3");
	if(getCookie("Admin-email") == ""){
		alert("login first !");
		window.location = "/admin";
	}
	$("#username")[0].innerHTML = getCookie("Admin-email");

	function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
	}
	$("#logout").click(function(){
		document.cookie = "Admin-email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location = "/admin";
	});
	var email = getCookie("Admin-email");

	$('#addItem').click(function(){
		var fm = new FormData($('#addItemForm')[0]);
		fm.append("cemail", email);
		console.log(fm.getAll("item"));
		$.ajax({
			url: '/add-item',
			data: fm,
			type: 'POST',
			contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    	processData: false, // NEEDED, DON'T OMIT THIS
			success: function(){
				alert("Added Item!");
				window.location.href = "../admin-dashboard";
			},
			error: function(error){
				alert("Error adding item !");
			}
		});
		return false;
	});
	var Items;
	$.ajax({
			url: '/display-item',
			data: "cemail="+ email,
			type: 'POST',
			success: function(data){
				var array = JSON.parse(data);
				fillTable(array);
			},
			error: function(error){
				// alert("Error!");
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
			cell6.innerHTML = Items[i][5];
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
				// alert("Deleted Item!");
				window.location.href = "../admin-dashboard";
			},
			error: function(error){
				// alert("Error deleting item !");
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
			    // $("#editItemForm").find("#imgName")[0].value = ($(this).parent()).parent().children()[3].textContent;
			    $("#editItemForm").find("#availability")[0].value = ($(this).parent()).parent().children()[4].textContent;
			    $("#editItemForm").find("#prepTime")[0].value = ($(this).parent()).parent().children()[5].textContent;
			    var id = ($(this).parent()).parent().children()[0].textContent;
			$("#editItem").click(function(){
			    console.log($('#editItemForm').serialize());
					var fm = new FormData($('#editItemForm')[0]);
					fm.append("cemail", email);
					console.log(fm.getAll("item"));
					$.ajax({
					url: '/delete-item',
					data: "id="+id,
					type: 'POST',
					success: function(response){
						// alert("Deleted Item!");
						$.ajax({
							url: '/add-item',
							data: fm,
							type: 'POST',
							contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
							processData: false, // NEEDED, DON'T OMIT THIS
							success: function(response){
								// alert("Edited Item!");
								window.location.href = "../admin-dashboard";
							},
							error: function(error){
								// alert("Error editing item !");
							}
						});
					},
					error: function(error){
						// alert("Error deleting item !");
					}
				});

				return false;
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

//Delivery display


var DeliveryPersons;
$.ajax({
		url: '/get-dboys-list',
		data: "username="+ email,
		type: 'POST',
		success: function(data){
			var array = JSON.parse(data);
			DeliveryPersons = array;
			fillTableDelivery(array);
		},
		error: function(error){
			// alert("Error!");
		}
});
function fillTableDelivery(Items){
	var i;
	console.log(Items);
	console.log(Items.length);
	for(i=0;i< Items.length;++i){

		var table = document.getElementById("tableAllDeliveryPersons");

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(0);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		// Add some text to the new cells:
		cell1.innerHTML = Items[i][0];
		deliveryBoys.push(Items[i][0]);
		cell2.innerHTML = Items[i][1];
		cell3.innerHTML = '<button style="margin: 10px;" class="btn btn-sm btn-danger deleteBtn4">Delete</button>';
	}

	$('.deleteBtn4').click(function(){
		var DBoy = ($(this).parent()).parent().children()[0].textContent;
		var regno = ($(this).parent()).parent().children()[1].textContent;
		$.ajax({
		url: '/remove-delivery-boy',
		data: "DBoy="+ DBoy + "&regno=" + regno,
		type: 'POST',
		success: function(response){
			// alert("Deleted Delivery boy!");
			window.location.href = "../admin-dashboard";
		},
		error: function(error){
			// alert("Error deleting item !");
		}
		});
	});
}

// add delivery boy

		$('#addDeliveryPerson').click(function(){
			console.log($('#addDeliveryPersonForm').serialize());
			$.ajax({
				url: '/add-delivery-boy',
				data: $('#addDeliveryPersonForm').serialize() + "&username="+ email,
				type: 'POST',
				success: function(response){
					// alert("Added Item!");
					window.location.href = "../admin-dashboard";
				},
				error: function(error){
					// alert("Error adding item !");
				}
			});
			return false;
		});

// show Orders

$.ajax({
		url: '/admin-display-orders',
		data: "username="+ email,
		type: 'POST',
		success: function(data){
			var array = JSON.parse(data);
			fillTableOrders(array);
		},
		error: function(error){
			// alert("Error!");
		}
});


function fillTableOrders(Items){
	var i;
	console.log(Items);
	console.log(Items.length);
	for(i=0;i< Items.length;++i){

		var table = document.getElementById("tableAllOrders");

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(0);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		// Add some text to the new cells:
		cell1.innerHTML = Items[i][0];
		cell2.innerHTML = Items[i][2];
		cell3.innerHTML = '<button style="margin: 10px;" class="btn btn-sm btn-primary detailsBtn3">Details</button>';
	}
	$(".detailsBtn3").click(function(){
		modal3.style.display = "block";
		var id = ($(this).parent()).parent().children()[0].textContent;
		finalOrderId = id;
		$.ajax({
			url: '/get-order-details',
			data: "OrderID="+id,
			type: 'POST',
			success: function(response){
				var array = JSON.parse(response);
				fillTableOrderDetails(array);
			},
			error: function(error){
				// alert("Error deleting item !");
			}
		});
		$.ajax({
			url: '/get-order-details-2',
			data: "OrderID="+id,
			type: 'POST',
			success: function(response){
				var array = JSON.parse(response);
				fillOrderDetails(array);
			},
			error: function(error){
				// alert("Error deleting item !");
			}
		});
	});


}
function fillOrderDetails(Items){
	var OrderID = document.getElementById("OrderID");
	OrderID.innerHTML = "OrderID : " + Items[0][0];
	var ODate = document.getElementById("ODate");
	ODate.innerHTML = "Date : " + Items[0][1];
	var Total = document.getElementById("Total");
	Total.innerHTML = "Total : " + Items[0][2];
	var Name = document.getElementById("Name");
	Name.innerHTML = "Name : " + Items[0][3];
	var Address = document.getElementById("Address");
	Address.innerHTML = "Address : " + Items[0][4];
	var idOrder = Items[0][0];
	var i;
	for(i =0 ;i<deliveryBoys.length;++i){
		$("#DeliveryBoyName").append("<option value='"+ deliveryBoys[i]+"'>"+ deliveryBoys[i]+"</option>");
	}
	$("#accept").click(function(){
		$.ajax({
			url: '/accept-reject',
			data: "OrderID="+finalOrderId+"&accorrej=1&dBoy=" + $("#DeliveryBoyName").val(),
			type: 'POST',
			success: function(response){
				alert("Accepted the order");
				window.location.href = "/admin-dashboard";
			},
			error: function(error){
				alert("Error");
			}
		});
	});
	$("#reject").click(function(){
		$.ajax({
			url: '/accept-reject',
			data: "OrderID="+finalOrderId+"&accorrej=0&dBoy=" + $("#DeliveryBoyName").val(),
			type: 'POST',
			success: function(response){
				alert("Rejected the order");
				window.location.href = "/admin-dashboard";
			},
			error: function(error){
				alert("Error");
			}
		});
	});
}
function fillTableOrderDetails(Items){
	var i;
	for(i=0;i< Items.length;++i){

		var table = document.getElementById("tableOrderDetails");

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(0);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		// Add some text to the new cells:
		cell1.innerHTML = Items[i][0];
		cell2.innerHTML = Items[i][1];
		cell3.innerHTML = Items[i][2];
	}


	span3.onclick = function() {
			modal3.style.display = "none";
			$("#tableOrderDetails")[0].innerHTML = "";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
			if (event.target == modal3) {
					modal3.style.display = "none";
					$("#tableOrderDetails")[0].innerHTML = "";
			}
	}
}




});
