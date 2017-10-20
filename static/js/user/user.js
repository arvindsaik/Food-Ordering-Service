$( document ).ready(function() {
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

  $.ajax({
			url: '/display-item-by-nc',
			data: "name="+ getCookie("Canteen"),
			type: 'POST',
			success: function(data){
        // alert("hi");
        // console.log("hi" + data);
				var array = JSON.parse(data);
        // console.log(array);
        var i;
        var n = array.length;
        for(i=0;i<n;++i){
          // static/images/pm.jpg
          var image_url = array[i][4];
          var price = array[i][2];
          var itemName = array[i][1];
          $("#tilesPage").append(
            '<article class="style'+ ((i%6)+1) +'"> <span class="image"> <img height="200" width="150" src="'+ image_url +'" alt="" /> </span> <a class="itemDisplay" > <h2>' + itemName + '</h2> <div class="content"> <h3>Rs' + price + '</h3> </div> </a> </article>'
          );
        }
				// fillTable(array);
			},
			error: function(error){
				alert("Error!");
			}
	});

  $(".itemDisplay").click(function(){
    alert("clicked on "+$(this).children()[0].textContent);
    console.log($(this).children()[0].textContent);
  });

  $("#goBtn").click(function(){
    alert("search for " + $("#search").val());
  });

  $("#cart").click(function(){
    window.location.href = "/user-cart";
  });
});
