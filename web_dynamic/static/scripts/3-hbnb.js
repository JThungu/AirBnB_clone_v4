$(function () {
  let clicked = [];
  let temp = [];
  let text = [];
  $(':checkbox').on('click', function () {
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
        text.push(item['dataset']['name']);
      }
    }
    $('.amenities h4').text(text.join(', '));
    text = [];
    if (clicked.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data['status'] === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      for (let place of data) {
        $('.places').append('<article><div class="title"><h2>' + place['name'] + '</h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place['max_guest'] + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place['number_rooms'] + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place['number_bathrooms'] + ' Bathroom</div></div><div class="user"><div class="description">' + place['description'] + '</div></article>');
      }
    }
  });
});
