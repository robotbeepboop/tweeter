$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function() {
    //count input length
    const input = $(this).val().length;
    const maximumInput = 140;
    let remaining = maximumInput - input;
    //find the counter
    const $counter = $(this).parent().children('.counter');

    $counter.text(remaining);
    if(remaining < 0) {
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#545149');
    }
  });
});
