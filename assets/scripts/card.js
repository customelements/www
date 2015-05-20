[].forEach.call(document.querySelectorAll('.card'), function(elem) {
    elem.addEventListener('mouseenter', function(e) {
        elem.elevation++;
    });

    elem.addEventListener('mouseleave', function(e) {
        elem.elevation--;
    });

    elem.addEventListener('click', function(e){
      var link = this.dataset.link;

      if ( link ) {
        if ( e.metaKey ) {
          window.open(link, '_blank');
        } else {
          window.location = link;
        }
      }

      return false;

    });

});
