$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function() {
    const text = $(this).val().length;
    const maximumInput = 140;
    let remaining = maximumInput - text;

    //find the counter
    const $counter = $(this).parent().find('.counter');

    $counter.text(remaining);
    if(remaining < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#545149');
    }
  });
});
