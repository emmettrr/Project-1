var youtube = "AIzaSyAr031YDIiLF3eBObxe03kuBL5aLwA-8XQ";
var userInput = document.getElementById("userInput");
var submitBtn = document.getElementById("submitBtn");

$("#submitBtn").on("click", function () {
  localStorage.setItem("text", userInput.value);
  localStorage.getItem(userInput.value);
});

$(document).ready(() => {
  const doSearch = () => {
    let searchQuery = $(".search input:text").val();
    let url =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyAr031YDIiLF3eBObxe03kuBL5aLwA-8XQ&q=" +
      searchQuery;
    $.ajax({
      url: url,
      method: "GET",
      success: (result) => {
        $(".video-play").text("");
        $(".video-play").append(
          `<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${result.items[0].id.videoId} allowFullScreen title='youtube player' />`
        );
        populateSuggestions(result.items.slice(1, 10));
      },
      error: (err, response) => {
        console.log(err.responseText);
        $(".video-play").text(err.responseText);
      },
    });
  };

  const populateSuggestions = (videos) => {
    $(".suggest-list").text("");
    for (video of videos) {
      let videoElement = `<a href="#" class="suggested" data-videoId=${video.id.videoId} ><img src=${video.snippet.thumbnails.medium.url} /></a>`;
      $(".suggest-list").append(videoElement);
    }

    $("a.suggested").click((e) => {
      let videoId = e.currentTarget.dataset.videoId;
      $(".video-play").text("");
      $(".video-play").append(
        `<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${videoId} allowFullScreen title='youtube player' />`
      );
    });
  };

  $("button:button").click(() => {
    doSearch();
  });

  doSearch();
});

const Http = new XMLHttpRequest();
const url =
  "https://fly.sportsdata.io/v3/mma/scores/json/Fighters?key=acfe100fb13b4b7cbe65184bfbc1f0f1";
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText);
};
