$(function () {
  let clicked = [];
  let temp = [];
  let text = [];
  $(':checkbox').on('click', function () {
    console.log();
    if (clicked.indexOf(this['dataset']['id']) === -1) {
      clicked.push(this['dataset']['id']);
    } else {
      for (let item of clicked) {
        if (item !== this['dataset']['id']) {
          temp.push(item);
        }
      }
      clicked = temp;
      temp = [];
    }
    for (let item of $('.popover li input')) {
      if (clicked.indexOf(item['dataset']['id']) !== -1) {
        console.log('yay');
        text.push(item['dataset']['name']);
      }
    }
    $('.amenities h4').text(text.join(', '));
    text = [];
    if (clicked.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
