(function() {

  $(function() {
    return $.each(["a[rel=popover]"], function(idx, selector) {
      return $(selector).popover({
        placement: 'below'
      });
    });
  });

}).call(this);
