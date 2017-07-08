$(document).ready(function() { 
  /* Objeto */
  var carrusel = {};

  /* Llamamos al id del ul que contiene elementos del carrusel */
  carrusel.initQuery = '#el-carrusel'; //initQuery = metodo movimiento

  /* Variables */
  carrusel.slider = $( carrusel.initQuery + " ul,ul"+ carrusel.initQuery);  //selecciona el ul con jquery
  carrusel.slides = carrusel.slider.find('li'); //encuentra un li
  carrusel.number = carrusel.slides.length; //largo del carrusel ( cantidad de li )
  carrusel.actual = 0; //img primer indice, parte del cero = primera foto
  carrusel.height = 0; // minimo alto
  carrusel.width = 0; //minimo ancho

  /*  Toma el tamaño de la img del primer li para tomar ese tamaño de carrusel */
  for(var i=0 ; i < carrusel.number; i++){
    var w = $(carrusel.slides[i]).width();
    var h = $(carrusel.slides[i]).height();
    carrusel.height = ( h > carrusel.height  ) ?  h : carrusel.height;  //IF ECMAscript 6 "?" es entones ":" es sino
    carrusel.width = ( w > carrusel.width  ) ? w : carrusel.width;  
  }
/* CSS 
  No es buena practica ponerlo en JS, pero se basa en el width y height 
  que se entrega en el for anterior*/
  carrusel.slider.css({
    overflow: "hidden", // overflow: especifica si se recorta el contenido
    width: carrusel.width,  
    height: carrusel.height,
    position: 'relative'
  });
  

   /* Posicion absoluta todos los <li> del carrusel */
  for (var i=0; i < carrusel.number ;i++){
    var sl = $(carrusel.slides[i]); //llama los li encontrados
    sl.attr('class',sl.attr('class') + " slider-slide-"+i); //se le agrega la clase
    sl.css({
      position : 'absolute', // Se agrega CSS para posicionar img para que asimile un carrusel
      left : carrusel.width * i 
    });
  }

  /* Movimiento del carrusel */
  carrusel.go = function (where){
    if (where == 'next'){
      carrusel.actual = ( carrusel.actual < carrusel.number-1) ? carrusel.actual * 1 + 1 : 0; //if dentro de un if
    }else if (where == 'prev'){
      carrusel.actual = ( carrusel.actual > 0) ? carrusel.actual - 1 : carrusel.number - 1;
    }else{
      carrusel.actual = where;
    }

    for (var i=0; i < carrusel.number; i++){
      var sl = $(carrusel.slides[i]);
      sl.animate({
          left : carrusel.width * (i - carrusel.actual)
      },2000);
    }
  };


  /* Creación botones next prev */
  $(carrusel.initQuery).append("<a href='#next' class='carrusel-prev'><i class='fa fa-chevron-left' aria-hidden='true'></i></a><a href='#next' class='carrusel-next'><i class='fa fa-chevron-right' aria-hidden='true'></i></a>");
  $(carrusel.initQuery + " .carrusel-next").click(function () { //Su se hace click llama a la function carrusel.go y detona si es igual a next
    carrusel.go('next');
    return false; 
  });
  $(carrusel.initQuery + " .carrusel-prev").click(function () { //Su se hace click llama a la function carrusel.go y detona si es igual a prev
    carrusel.go('prev');
    return false; 
  });

  /* Movimiento automatico: */
  var autoSlider = setInterval(function () {
    carrusel.go('next');
  },10*1000); // donde 10 es la cantidad de segundos.
   
  /* Movimiento automatico desde donde se hace el click: */  
  var autoSlider = setInterval(function (){
    carrusel.go("next");
    $("a.slider-button-" + carrusel.actual).click();
  },10000);

    /* Movimiento automatico desde donde se hace el click: */  
  var autoSlider = setInterval(function (){
    carrusel.go("next");
    $("a.slider-button-" + carrusel.actual).click();
  },10000);

/* Botones inferiones que se enlazan con la img a través de href */
  carrusel.pages = '<ul class="carrusel-pages">';
  for (var i=0;i<carrusel.number;i++){
    var sclass = (i==0) ? ' class="selected" ' : '';
    carrusel.pages = carrusel.pages + '<li' + sclass + '><a href="#slider-slide-'+ i +'" class="slider-button-'+i+'"><i class="fa fa-circle" aria-hidden="true"></i></a></li>'
  }
  carrusel.pages = carrusel.pages + '</ul>';

  carrusel.slider.after( carrusel.pages );
  $('ul.carrusel-pages li a').click(function (){
    clearInterval(autoSlider);
    carrusel.go( $(this).attr('href').substring(14) ); //el num de la foto 
    $(this).parent().parent().find("li").attr("class","");
    $(this).parent().attr("class","selected");
    return false;
  });

});  


