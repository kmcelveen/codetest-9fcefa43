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

  let $loadRequest = $.ajax({
      type: 'GET',
      url: 'https://listalous.herokuapp.com/lists/kmcelveen'
  });

  $loadRequest.done(function(data) {
      let $itemsData = data.items;

      $itemsData.forEach(function(itemData) {
          console.log('loading', itemData);
          $addItemToPage(itemData);
      });

      $('.description').on('blur', function(event) {
          let $item = $(event.target).parent();
          let $isItemCompleted = $item.hasClass('completed');
          let $itemId = $item.attr('data-id');
          let $description = $item.find('.description').text();

          let $updateRequest = $.ajax({

              type: 'PUT',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
               'Content-Type':'application/application/json', 
               'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
             },
              url: 'http://listalous.herokuapp.com/lists/kmcelveen/items/' + $itemId,
              data: { description: $description, completed: $isItemCompleted }
          });

          $updateRequest.done(function(data) {
          });
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
          $addItemToPage(item);
          $('#create').val('');
      });
  });

  $('#list').on('click', '.complete-button', function(event) {
      let $item = $(event.target).parent();
      let $isItemCompleted = $item.hasClass('completed');
      let $itemId = $item.attr('data-id');

      let $updateTodo = $.ajax({
          type: 'PUT',
          url: 'https://listalous.herokuapp.com/lists/kmcelveen/items/' + $itemId,
          data: { completed: !$isItemCompleted },
      });

      $updateTodo.done(function(itemData) {
          if (itemData.completed) {
              $item.addClass('completed');
          } else {
              $item.removeClass('completed');
          }
      });
  });

  $('#list').on('click', '.delete-button', function(event) {
      let $item = $(event.target).parent();
      let $itemId = $item.attr('data-id');

      let $deleteTodo = $.ajax({
          type: 'DELETE',
          url: 'https://listalous.herokuapp.com/lists/kmcelveen/items/' + $itemId,
      });

      $deleteTodo.done(function(itemData) {
          $item.remove();
      });
  });

});