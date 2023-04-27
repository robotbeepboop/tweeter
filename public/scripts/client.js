/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //hide error messages until error is thrown
  $('#error-too-short').hide();
  $('#error-too-long').hide();
  
  const data = [];//data will be filled in by JSON file :)

  const $tweetsContainer = $('#tweets-container');

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $tweetsContainer.empty();//clear everything before creating new stuff
    for (let tweet of tweets) {
      // loops through tweets
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      //output the tweet at top of the page
      $('#tweets-container').prepend($tweet);
    }
  };
  
  const createTweetElement = function(tweetData) {
    //use timeago.format on display
    let $tweet = $(`<!--display created tweets-->
      <article class="tweet">
        <header class="tweet-header">
            <img class="user-profile-picture" src="${tweetData.user.avatars}">
            <h4 class="display-name">${tweetData.user.name}</h4>
            <h4 class="username">${tweetData.user.handle}</h4>
        </header>
        <div class="tweet-content">${tweetData.content.text}</div>
        <footer class="tweet-footer">
          <span class="time-posted">${timeago.format(tweetData.created_at)}</span>
          <div class="tweet-interaction">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
    </article>`);
    return $tweet;
  };
  
  renderTweets(data);

  const loadTweets = function() {
    //use jQuery to make GET request to /tweets to get array of tweets as JSON
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
    .done((tweetData) => {
      renderTweets(tweetData);
    })
  };

  const $form = $('#tweet-form');

  $form.on('submit', (event) => {
    event.preventDefault();
    //get max length, input length, and compare them
    const maxLength = 140;
    const inputLength = $(this).find('#tweet-text').val().length;

    if(!inputLength) {
      $('#error-too-short').show();
      $('#error-too-long').hide();
    } else if (inputLength > maxLength) {
      $('#error-too-short').hide();
      $('#error-too-long').show();
      //too long still submits, resolve later
    } else {
      const data = $form.serialize();
      //const safeHTML = `<p>${escape(textFromUser)}</p>`;
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: data
      }).then(() => {
        loadTweets();
      });
    }
  });
});
