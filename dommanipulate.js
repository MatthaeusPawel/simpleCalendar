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

            $(".daybox").on("click", clickEvent);

            mySelection.on("mousemove", moveMouse);
            mySelection.on("mouseup", unmarkthingies);
        })
             console.log('The DOM may not be ready');
    })
);

function clickEvent(event){
    if (!event.ctrlKey){
        $(".addedToSelection").removeClass("addedToSelection");
    }
    let foundField =  $(".daybox").filter((i, el)=>{ 
        if (el.offsetLeft + el.offsetWidth > event.pageX
            && el.offsetLeft < event.pageX)
            return true;
    }).filter((i, el)=>{ 
        if (el.offsetTop + el.offsetHeight > event.pageY
            && el.offsetTop < event.pageY)
            return true;
    }).toggleClass("addedToSelection");
}

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
        let newHeight = event.pageY - initialSelectionY;
        
        let newX = initialSelectionX;
        let newY = initialSelectionY;
        

        if (newWidth < 0){
            newWidth = -newWidth;
            mySelection.css("left", event.pageX);
            newX = event.pageX;
            
        }
        if (newHeight < 0){
            newHeight = -newHeight;
            mySelection.css("top", event.pageY);
            newY = event.pageY;
        }

        mySelection.css("width", newWidth).css("height", newHeight);

        let days = $(".currentMonth");

        (event.ctrlKey? days:days.removeClass("addedToSelection")).filter((i, el)=>{
            if (el.offsetLeft + el.offsetWidth > newX
                && el.offsetLeft < newX + newWidth)
                return true;
        }).filter((i, el)=>{
            if (el.offsetTop + el.offsetHeight > newY
                && el.offsetTop < newY + newHeight)
                return true;
        }).addClass("addedToSelection");
            
    }
    
    
}
