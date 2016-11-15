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

      $('.description').on('blur', function(event) {
          let $item = $(event.target).parent();
          let $isItemCompleted = $item.hasClass('completed');
          let $itemId = $item.attr('data-id');
          let $description = $item.find('.description').text();
          let $updateRequest = $.ajax({
              type: 'PUT',
              url: 'http://listalous.herokuapp.com/lists/kmcelveen/items/' + $itemId,
              data: { description: description, completed: $isItemCompleted }
          });
          $updateRequest.done(function(data) {
              console.log('updated todo', data);
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
          console.log('created todo', item);
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
          console.log('deleted todo', itemData);
          $item.remove();
      });
  });
})