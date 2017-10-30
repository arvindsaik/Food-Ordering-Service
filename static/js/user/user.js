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
					// alert("Deleted table!");
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

  $("#heading")[0].innerHTML = "Welcome To "+ getCookie("Canteen") +" NC ! Add your favourite items to cart !";
  // <section class="tiles">
  //   <article class="style1">
  //     <span class="image">
  //       <img height="200" width="150" src="static/images/pm.jpg" alt="" />
  //     </span>
  //     <a href="">
  //       <h2>Magna</h2>
  //       <div class="content">
  //         <h3>Rs 100 </h3>
  //       </div>
  //     </a>
  //   </article>
  //above for reference

  $.ajax({
			url: '/display-item-by-nc',
			data: "name="+ getCookie("Canteen"),
			type: 'POST',
			success: function(data){
				var array = JSON.parse(data);
        var i;
        var n = array.length;
        for(i=0;i<n;++i){
          // static/images/pm.jpg
          var image_url = array[i][4];
          var price = array[i][2];
          var itemName = array[i][1];
          var FoodID = array[i][0];
          $("#tilesPage").append(
            '<article class="style'+ ((i%6)+1) +'"><span class="image"> <img height="200" width="150" src="'+ image_url +'" alt="" /> </span> <a class="itemDisplay" > <h2>' + itemName + '</h2> <h2>' + FoodID + '</h2><div class="content"> <h3>Rs' + price + '</h3> </div> </a> </article>'
          );
        }
        $(".itemDisplay").click(function(){
          var FoodID = $(this).children()[1].textContent;
          // alert("clicked on "+$(this).children()[1].textContent);
          $.ajax({
        			url: '/add_to_temp',
        			data: "username="+ getCookie("email")+"&FoodID="+ FoodID + "&Quantity=1",
        			type: 'POST',
        			success: function(){
                alert("Added to cart! Change quantity if required in cart!");
        			},
        			error: function(error){
        				alert("Error!");
        			}
        	});
        });
			},
			error: function(error){
				alert("Error!");
			}
	});



  $("#goBtn").click(function(){
    alert("search for " + $("#search").val());
    $.ajax({
        url: '/query',
        data: "query="+ $("#search").val()+"&name_nc="+ getCookie("Canteen"),
        type: 'POST',
        success: function(data){
          jQuery('#tilesPage').html(''); //clear it
          var array = JSON.parse(data);
          var i;
          var n = array.length;
          for(i=0;i<n;++i){
            // static/images/pm.jpg
            var image_url = array[i][4];
            var price = array[i][2];
            var itemName = array[i][1];
            var FoodID = array[i][0];
            $("#tilesPage").append(
              '<article class="style'+ ((i%6)+1) +'"><span class="image"> <img height="200" width="150" src="'+ image_url +'" alt="" /> </span> <a class="itemDisplay" > <h2>' + itemName + '</h2> <h2>' + FoodID +  '</h2><div class="content"> <h3>Rs' + price + '</h3> </div> </a> </article>'
            );
          }
          $(".itemDisplay").click(function(){
            var FoodID = $(this).children()[1].textContent;
            // alert("clicked on "+$(this).children()[1].textContent);
            $.ajax({
          			url: '/add_to_temp',
          			data: "username="+ getCookie("email")+"&FoodID="+ FoodID + "&Quantity=1",
          			type: 'POST',
          			success: function(){
                  alert("Added to cart! Change quantity if required in cart!");
          			},
          			error: function(error){
          				alert("Error!");
          			}
          	});
          });
        },
        error: function(error){
          alert("Error!");
        }
    });
  });

  $("#cart").click(function(){
    window.location.href = "/user-cart";
  });


});
