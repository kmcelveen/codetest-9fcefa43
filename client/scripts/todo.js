$(document).ready(function(){
  'use strict';
    let $listItemTemplate = $('#list-item .item');
    let $list = $('#list');

    let $addItemToPage = function(itemData) {
        let $item = $listItemTemplate.clone();
        $item.attr('data-id', itemData.id);
        $item.find('.description').text(itemData.description);
        if (itemData.completed) {
            $item.addClass('completed');
        }
        $list.append($item);
    };
    let $loadTodos = $.ajax({
        type: 'GET',
        url: 'https://listalous.herokuapp.com/lists/kmcelveen'
    });
    $loadTodos.done(function(data) {
        let $itemsData = data.items;

        $itemsData.forEach(function(itemData) {
            console.log('loading', itemData);
            $addItemToPage(itemData);
        });
    });



    $('#add-form').submit(function(event) {
      event.preventDefault();
      let $itemDescription = event.target.itemDescription.value;
      let $createTodo = $.ajax({
          type: 'POST',
          url: "http://listalous.herokuapp.com/lists/kmcelveen/items",
          data: { description: $itemDescription, completed: false }
      });

      $createTodo.done(function(item) {
          console.log('created todo', item);
          $addItemToPage(item);
          $('#create').val('');
      });
  });

  
});