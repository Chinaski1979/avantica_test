$( document ).ready(function() {
  // Array containing items added to the list
  //var shoppingList = [];
  var $shoppingList = [];

  // Function trigger upon click.
  // It captures value in input and pushes the new item to the shopping list.
  // Once item is pushed it clears the value in the input
  $('#addItemButton').click(function () {
    var itemName = $('#itemName'),
        itemList = $('.items-list');

    $shoppingList.push(itemName.val());

    $('<li data-index=' + ($shoppingList.length - 1) + '>' +
      itemName.val() + '<button class="delete-item">Delete</button></li>').appendTo(itemList);

    itemName.val('');
    // Triggering a broadcast for the observer function to execute and update the count:
    $( document ).trigger( "changeInList" );
  });

  // This functions deletes the specific item that was clicked.
  $('.items-list-container').on('click', 'button.delete-item', function() {
    var itemIndex = $(this).parent().attr('data-index');
    $shoppingList.splice(itemIndex, 1);
    $(this).parent().remove();

    // Triggering a broadcast for the observer function to execute and update the count:
    $( document ).trigger( "changeInList" );
  });

  // Observer function that updates the counter
  // Executes when brodcast is intercepted
  $( document ).on( 'changeInList', function () {
    $('#counter').html($shoppingList.length);
  });
});
