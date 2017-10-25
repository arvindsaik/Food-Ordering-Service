$( document ).ready(function() {
  ///navbar part
  if(getCookie("email") == ""){
		alert("login first !");
		window.location = "/";
	}
	$('#btnLogout').click(function(){
    $.ajax({
				url: '/delete_temp_table',
				data: "username="+ getCookie("email"),
				type: 'POST',
				success: function(){
					alert("Deleted table!");
					document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
					window.location = "/";
				},
				error: function(error){
					alert("Error deleting..!");
				}
		});
		return false;
	});
	function setCookie(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+ d.toUTCString();
		    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
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

	$("#username")[0].innerHTML = getCookie("email");

  //end

  $.ajax({
			url: '/display-cart',
			data: "username="+ getCookie("email"),
			type: 'POST',
			success: function(data){
				var array = JSON.parse(data);
        console.log(array);
				fillTable(array);
			},
			error: function(error){
				alert("Error!");
			}
	});
	function fillTable(Items){
		var i;
		// console.log(Items);
		// console.log(Items.length);
    var totalBill = 0;
		for(i=0;i< Items.length;++i){

			var table = document.getElementById("tableAllItems");

			// Create an empty <tr> element and add it to the 1st position of the table:
			var row = table.insertRow(0);

			// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			var cell3 = row.insertCell(3);
			var cell4 = row.insertCell(4);
			var cell5 = row.insertCell(5);

			// Add some text to the new cells:
      cell0.innerHTML = Items[i][0];
			cell1.innerHTML = Items[i][3];
			cell2.innerHTML = Items[i][4];
			cell3.innerHTML = Items[i][1];
			cell4.innerHTML = Items[i][8];
			cell5.innerHTML = '<button style="margin: 10px;" class="btn btn-sm btn-primary editBtn">Edit</button><button style="margin: 10px;" class="btn btn-sm btn-danger deleteBtn">Delete</button>';
      totalBill = totalBill + parseInt(Items[i][4])*parseInt(Items[i][1]);
    }
    $("#bill")[0].innerHTML = "Total bill amount : "+totalBill + " Rs";
    $('.deleteBtn').click(function(){
			console.log(($(this).parent()).parent().children()[0].textContent);
			var id = ($(this).parent()).parent().children()[0].textContent;
			$.ajax({
			url: '/delete_from_temp',
			data: "FoodID="+id+"&username="+getCookie("email"),
			type: 'POST',
			success: function(response){
				alert("Deleted Item!");
				window.location.href = "/user-cart";
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
			    $("#editItemForm").find("#FoodID")[0].value = ($(this).parent()).parent().children()[0].textContent;
			    $("#editItemForm").find("#Quantity")[0].value = ($(this).parent()).parent().children()[3].textContent;
			    var id = ($(this).parent()).parent().children()[0].textContent;
          var Quantity = ($(this).parent()).parent().children()[3].textContent;
			$("#editItem").click(function(){
			    $.ajax({
					url: '/delete_from_temp',
					data: "FoodID="+id+"&username="+getCookie("email"),
					type: 'POST',
					success: function(response){
            $.ajax({
          			url: '/add_to_temp',
          			data: "username="+ getCookie("email")+"&FoodID="+ id + "&Quantity="+$("#editItemForm").find("#Quantity")[0].value,
          			type: 'POST',
          			success: function(){
                  alert("Edited item!");
                  window.location = "/user-cart";
          			},
          			error: function(error){
          				alert("Error editing!");
          			}
          	});
					},
					error: function(error){
						alert("Error deleting item !");
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

  $("#order").click(function(){
    alert("Submit feature not done :(");
    // $.ajax({
    //     url: '/add_to_temp',
    //     data: "username="+ getCookie("email"),
    //     type: 'POST',
    //     success: function(){
    //       alert("Edited item!");
    //       window.location = "/user-cart";
    //     },
    //     error: function(error){
    //       alert("Error editing!");
    //     }
    // });
  });
});
