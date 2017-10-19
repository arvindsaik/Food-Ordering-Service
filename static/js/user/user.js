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
  var i;
  for(i=0;i<50;++i){
    var image_url = "static/images/pm.jpg";
    var price = 100;
    $("#tilesPage").append(
      '<article class="style'+ ((i%6)+1) +'"> <span class="image"> <img height="200" width="150" src="'+ image_url +'" alt="" /> </span> <a class="itemDisplay" > <h2>Magna</h2> <div class="content"> <h3>Rs' + price + '</h3> </div> </a> </article>'
    );
  }

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
