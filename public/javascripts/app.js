var itemList = [];

$(document).ready(function() {
  listItems();
});

function listItems() {
  
    var listContent = '';
    
    $.getJSON('/api/v1/todos', function(data) {
        
        $.each(data, function() {
            listContent += '<div>';
            listContent += '<div style="border: solid 1px; float: left;">' + this.id + '</div>';
            listContent += '<div style="border: solid 1px; float: left;">' + this.text + '</div>';
            listContent += '<div style="border: solid 1px; float: left;">' + this.complete + '</div>';
            listContent += '<div style="clear: both;">';
            listContent += '</div>';
        });
          
        $('#itemDiv').html(listContent);
        
    });
  
};