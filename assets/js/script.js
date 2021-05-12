var youtube = "AIzaSyAr031YDIiLF3eBObxe03kuBL5aLwA-8XQ";
var userInput = document.getElementById("userInput");
var submitBtn = document.getElementById("submitBtn");

$("#submitBtn").on("click", function () {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < 20; i++) {
        var first = data[i].FirstName.toLowerCase();
        var last = data[i].LastName.toLowerCase();
        var userChoice = userInput.value.toLowerCase();
        if (
          (first.includes(userChoice) && last.includes(userChoice)) ||
          first.includes(userChoice) ||
          last.includes(userChoice)
        ) {
          console.log(data[i].FirstName);
          console.log(data[i].LastName);

          var mmaFighter = document.createElement("div");
          var firstName = document.createElement("p");
          var lastName = document.createElement("p");
          var nickName = document.createElement("p");
          var birthDate = document.createElement("p");
          var height = document.createElement("p");
          var weight = document.createElement("p");
          var wins = document.createElement("p");
          var losses = document.createElement("p");

          mmaFighter.append(
            firstName,
            lastName,
            nickName,
            birthDate,
            height,
            weight,
            wins,
            losses
          );
          mmaFighter.classList.add("card" + "blue-gray" + "darken-1");
          firstName.textContent = "First Name: ";
          lastName.textContent = "Last Name: ";
          nickName.textContent = "Nick Name: ";
          birthDate.textContent = "Age: ";
          height.textContent = "Height: ";
          weight.textContent = "Weight: ";
          wins.textContent = "Wins: ";
          losses.textContent = "Losses: ";
          mmaFighter;

          var fName = data[i].FirstName;
          firstName.append(fName);

          var lName = data[i].LastName;
          lastName.append(lName);
          // var nName =
          // var bDate =
          // var ht =
          // var wt =
          // var ws =
          // var ls =
          mmaList.append(mmaFighter);
        } else {
          console.log("No matching results!");
        }
      }
    });

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
  // console.log(Http.responseText);
};
