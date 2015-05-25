// Search

var searchField = document.querySelector('.search-field');
var searchFilled = 'search-filled';

if (searchField.value.trim() !== '') {
    searchField.parentNode.classList.add(searchFilled);
}

// searchField.addEventListener('keypress', function(evt) {
//   var code = evt.keyCode || evt.which;
//
//   if(code === 13) {
//       var value = this.value.replace(/(\/|\?)/g, '').replace(/ /g, '+');
//       window.location = window.location.origin + '/search/' + value;
//   }
// });

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
