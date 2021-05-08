var client_id = "MjE4NjE5NTB8MTYyMDM0MjIxNC43MTMwOTUy"
var youtube = 'AIzaSyApNNupOOVS4LUnhTyhx-GHPvL6amnc02c'

$(document).ready(() => {
    
    const doSearch = () => {
      let searchQuery = $('.search input:text').val();
      let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyApNNupOOVS4LUnhTyhx-GHPvL6amnc02c&q=' + searchQuery;
      $.ajax({
        url: url,
        method: 'GET',
        success: (result) => {
          $('.video-play').text('');
          $('.video-play').append(`<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${result.items[0].id.videoId} allowFullScreen title='youtube player' />`)
          populateSuggestions(result.items.slice(1,10));
        },
        error: (err, response) => {
          console.log(err.responseText);
          $('.video-play').text(err.responseText);
        }
      })
    };
  
    const populateSuggestions = (videos) => {
      $('.suggest-list').text('');
      for (video of videos) {
        let videoElement = `<a href="#" class="suggested" data-videoId=${video.id.videoId} ><img src=${video.snippet.thumbnails.medium.url} /></a>`;
        $('.suggest-list').append(videoElement)
      }

      $('a.suggested').click((e) => {
        let videoId =  e.currentTarget.dataset.videoId;
        $('.video-play').text('');
        $('.video-play').append(`<iframe class="embed-responsive-item" src=https://www.youtube.com/embed/${videoId} allowFullScreen title='youtube player' />`)
      });
    };

    $('button:button').click(() => {
      doSearch();
    });

    doSearch();
  });

    fetch("https://api-nba-v1.p.rapidapi.com/seasons/", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "14af4307abmsh85e3dd249e791b4p11cf20jsn4930524d16b9",
		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});