let initialSelectionX = 0;
let initialSelectionY = 0;
var mousepressed = 0;

function clickEvent(event, $) {
  if (!event.ctrlKey) {
    $('.addedToSelection').removeClass('addedToSelection');
  }
  $('.daybox')
    .filter((i, el) => {
      if (
        el.offsetLeft + el.offsetWidth > event.pageX
        && el.offsetLeft < event.pageX
      ) { return true; }
      return false;
    })
    .filter((i, el) => {
      if (
        el.offsetTop + el.offsetHeight > event.pageY
        && el.offsetTop < event.pageY
      ) { return true; }
      return false;
    })
    .toggleClass('addedToSelection');
}
function markthingies(event, $) {
  const mySelection = $('#markedSelection');
  initialSelectionX = event.pageX;
  initialSelectionY = event.pageY;
  mySelection.show().css('left', event.pageX).css('top', event.pageY);
  mousepressed = 1;
}

function unmarkthingies(event, $) {
  const mySelection = $('#markedSelection');
  mySelection.hide().css('height', 0).css('width', 0);
}

function moveMouse(event, $) {
  const mySelection = $('#markedSelection');
  if (mySelection.is(':visible')) {
    let newWidth = event.pageX - initialSelectionX;
    let newHeight = event.pageY - initialSelectionY;

    let newX = initialSelectionX;
    let newY = initialSelectionY;

    if (newWidth < 0) {
      newWidth = -newWidth;
      mySelection.css('left', event.pageX);
      newX = event.pageX;
    }
    if (newHeight < 0) {
      newHeight = -newHeight;
      mySelection.css('top', event.pageY);
      newY = event.pageY;
    }

    mySelection.css('width', newWidth).css('height', newHeight);

    const days = $('.currentMonth');

    (event.ctrlKey ? days : days.removeClass('addedToSelection'))
      .filter((i, el) => {
        if (
          el.offsetLeft + el.offsetWidth > newX
          && el.offsetLeft < newX + newWidth
        ) { return true; }
        return false;
      })
      .filter((i, el) => {
        if (
          el.offsetTop + el.offsetHeight > newY
          && el.offsetTop < newY + newHeight
        ) { return true; }
        return false;
      })
      .addClass('addedToSelection');
  }
}

(function (main) {
  main(window.jQuery, window, document);
}(($, _window, _document) => {
  $(() => {
    const calendar = $('#myCalendar');
    const mySelection = $('#markedSelection');

    calendar.on('mousedown', ((jq) => (e) => markthingies(e, jq))($));
    calendar.on('mouseup', ((jq) => (e) => unmarkthingies(e, jq))($));
    calendar.on('mousemove', ((jq) => (e) => moveMouse(e, jq))($));

    $('.daybox').on('click', clickEvent);

    mySelection.on('mousemove', ((jq) => (e) => moveMouse(e, jq))($));
    mySelection.on('mouseup', ((jq) => (e) => unmarkthingies(e, jq))($));
  });
}));
