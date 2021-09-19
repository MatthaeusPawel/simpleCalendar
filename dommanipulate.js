(function(main) {
    main (window.jQuery, window, document);
}(function($, window, document){
        $(function(){
            console.log('The DOM is ready');
            

            let calendar = $("#myCalendar");
            let mySelection = $("#markedSelection");
            let mousepressed = 0;

            calendar.on("mousedown", markthingies);
            calendar.on("mouseup", unmarkthingies);
            calendar.on("mousemove", moveMouse);

            mySelection.on("mousemove", moveMouse);
            mySelection.on("mouseup", unmarkthingies);
        })
             console.log('The DOM may not be ready');
    })
);

//(function(yourcode) {

    //// The global jQuery object is passed as a parameter
      //yourcode(window.jQuery, window, document);

  //}(function($, window, document) {

    //// The $ is now locally scoped 

   //// Listen for the jQuery ready event on the document
   //$(function() {
     
     //console.log('The DOM is ready');

     //// The DOM is ready!

   //});
    
    //console.log('The DOM may not be ready');

   //// The rest of code goes here!
//}));

let initialSelectionX = 0;
let initialSelectionY = 0;

function markthingies(event){
    let mySelection = $("#markedSelection");
    initialSelectionX = event.pageX;
    initialSelectionY = event.pageY;
    mySelection.show().css("left", event.pageX).css("top", event.pageY);
    mousepressed = 1;
}

function unmarkthingies(event){
    //let para = document.getElementById('end');
        
    //para.textContent = 'x = '+ event.pageX + ', y = ' + event.pageX;
    let mySelection = $("#markedSelection");
    mySelection.hide().css("height", 0).css("width", 0);
}

function moveMouse(event){
    let mySelection = $("#markedSelection");
    if (mySelection.is(":visible")){
        let newWidth = event.pageX - initialSelectionX;
        let newHeight = event.pageY -initialSelectionY;

        if (newWidth < 0){
            newWidth = -newWidth;
            mySelection.css("left", event.pageX);
        }
        if (newHeight < 0){
            newHeight = -newHeight;
            mySelection.css("top", event.pageY);
        }

        mySelection.css("width", newWidth).css("height", newHeight);
    }
}
