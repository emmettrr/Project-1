var youtube = "AIzaSyAr031YDIiLF3eBObxe03kuBL5aLwA-8XQ";
var userInput = document.getElementById("userInput");
var submitBtn = document.getElementById("submitBtn");

$("#submitBtn").on("click", function () {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $(
        ".bg-primary.video-play.embed-responsive.embed-responsive-21by9"
      ).toggle();
      $(".search").toggle();
      $(".display-1").toggle();
      $("#mmaList").empty();
      for (let i = 0; i < 1500; i++) {
        var first = data[i].FirstName.toLowerCase();
        var last = data[i].LastName.toLowerCase();
        var userChoice = userInput.value.toLowerCase();

        var userChoiceFirst = userChoice.split(" ").slice(0, -1).join(" "); //removes the last word, leaving first name
        var userChoiceLast = userChoice.split(" ").slice(-1).join(" "); // removes the first word, leaving the last name

        var id = data[i].FighterId;
        var uniqueNames = [];
        $.each(id, function (i, el) {
          if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });

        if (userChoice.length === 0) {
          $("#dialog").dialog();
          return;
        }

        if (
          (first.includes(userChoiceFirst) && last.includes(userChoiceLast)) ||
          first.includes(userChoice) ||
          last.includes(userChoice)
        ) {
          console.log("First and Last Names:", userChoice);
          console.log(data[i].FirstName);
          console.log(data[i].LastName);

          var mmaFighter = document.createElement("div");
          var firstName = document.createElement("li");
          var lastName = document.createElement("li");
          var nickName = document.createElement("li");
          var weightClass = document.createElement("li");
          var birthDate = document.createElement("li");
          var height = document.createElement("li");
          var weight = document.createElement("li");
          var wins = document.createElement("li");
          var losses = document.createElement("li");

          mmaFighter.append(
            firstName,
            lastName,
            nickName,
            birthDate,
            weightClass,
            height,
            weight,
            wins,
            losses
          );
          mmaFighter.classList.add("card-content");
          firstName.textContent = "First Name: ";
          lastName.textContent = "Last Name: ";
          nickName.textContent = "Nick Name: ";
          birthDate.textContent = "Age: ";
          weightClass.textContent = "Weight Class: ";
          height.textContent = "Height: ";
          weight.textContent = "Weight: ";
          wins.textContent = "Wins: ";
          losses.textContent = "Losses: ";
          mmaFighter;

          var fName = data[i].FirstName;
          firstName.append(fName);

          var lName = data[i].LastName;
          lastName.append(lName);

          var nName = data[i].Nickname;
          nickName.append(nName);

          var bDate = data[i].BirthDate.substring(0, 4);
          var bDateFix = Math.floor(2021 - bDate);
          birthDate.append(bDateFix);

          var wclass = data[i].WeightClass;
          weightClass.append(wclass);

          var Height = data[i].Height;
          var feet = Math.floor(Height / 12);
          var inches = Height - feet * 12;
          ht = Height.textContent = feet + "'" + inches + '"';
          height.append(ht);

          var wt = data[i].Weight;
          wt = wt.textContent = wt + "lbs";
          weight.append(wt);

          var ws = data[i].Wins;
          wins.append(ws);

          var ls = data[i].Losses;
          losses.append(ls);

          mmaList.append(mmaFighter);
        } else {
          console.log("No matching results!");
        }
      }
    });

  localStorage.setItem("text", userInput.value);
  localStorage.getItem(userInput.value);
});

$(document).ready(function () {
  $(".parallax").parallax();
});

$(document).ready(() => {
  const doSearch = () => {
    let searchQuery = $(".search input:text").val();
    let url =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyCzCMvNGOZ-Q1FLEUnwws0Mw5v5zzx8u1U=&q?" +
      searchQuery;
    $.ajax({
      url: url,
      method: "GET",
      success: (result) => {
        $(".video-play").text("");
        $(".video-play").append(
          `<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${result.items[0].id.videoId} allowFullScreen title='youtube player' />`
        );
      },
      error: (err, response) => {
        console.log(err.responseText);
        $(".video-play").text(err.responseText);
      },
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
