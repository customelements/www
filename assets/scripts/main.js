// Search
var search = document.querySelector('.search');
var searchField = document.querySelector('.search-field');
var sort = document.querySelector('#sort');
var searchFilled = 'search-filled';

if (searchField.value.trim() !== '') {
    searchField.parentNode.classList.add(searchFilled);
}

search.addEventListener('keyup', function(evt) {
  evt.preventDefault();

  var value = evt.target.value;

  if ( value.length >= 3 ) {
    $.get('http://localhost:5000/suggest?q=' + value, function(data) {
      console.log(data);
      var result = '';

      for (var i = 0; i < data.results.length; i++) {
        result += '<option value="'+ data.results[i].text +'" />'
      }
      console.log(result);
      $('#repos').html(result)
    });
  }
});


search.addEventListener('submit', function(evt) {
  evt.preventDefault();

  var value = evt.target[0].value;
  window.location = window.location.origin + '/search/' + value;
});

searchField.addEventListener('focus', function(evt) {
    searchField.parentNode.classList.add(searchFilled);
});

searchField.addEventListener('blur', function(evt) {
    if (evt.target.value.trim() === '') {
        searchField.parentNode.classList.remove(searchFilled);
    }
});

// Card
[].forEach.call(document.querySelectorAll('.card'), function(elem) {
    elem.addEventListener('mouseenter', function(e) {
        elem.elevation++;
    });

    elem.addEventListener('mouseleave', function(e) {
        elem.elevation--;
    });
});

// Sort
if (sort) {
  sort.addEventListener('change', function(evt) {
      var value = evt.target.value,
          search = window.location.pathname.split('/')[2];

      window.location = window.location.origin + '/search/' + search + '?s=' + value
  });
}
