$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-tweet').on('keyup', function() {
    
    //count input length
    const count = $(this).val().length;

    //find the counter
    const counter = $(this).parent().children('.counter');
    let remaining = 140 - count;

    counter.text(remaining);
    if(remaining < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '#545149');
    }
  });
});
