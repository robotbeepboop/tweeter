/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
          "handle": "@SirIsaac"
        },
      "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const loadTweets = function() {
    //use jQuery to make GET request to /tweets to get array of tweets as JSON
    $ajax({
      url: '/tweets',
      method: 'GET'
    })
    .done((tweetData) => {
      renderTweets(tweetData);
    })
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      // loops through tweets
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };
  
  const createTweetElement = function(tweetData) {
    //find how to discplay time ago posted
    let $tweet = $(`<!--display created tweets-->
      <article class="tweet">
        <header class="tweet-header">
            <img class="user-profile-picture" src="${tweetData.user.avatars}">
            <h4 class="display-name">${tweetData.user.name}</h4>
            <h4 class="username">${tweetData.user.handle}</h4>
        </header>
        <div class="tweet-content">${tweetData.content.text}</div>
        <footer class="tweet-footer">
          <span class="time-posted">${}</span>
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
});
