

var lastResult;
var lastIndex;

function search() {
    var encoded = encodeURIComponent($('#term').val());
    $.get({
        url: "https://images-api.nasa.gov/search?q=apollo%2011&description=" + encoded + "&media_type=image",
        success: function(response){
            console.log(response);
            lastResult = response;
            var addString = '';
            var limit;

            if (response.collection.items.length < 12) {
                limit = response.collection.items.length;
                lastIndex = -1;
            } else {
                limit = 12;
                lastIndex = 11;
            }

            for (i=0;i<limit;i++){
                console.log(response.collection.items[i]);
                addString +=
                `<div class="card">
                <img class="card-img-top" src="` + response.collection.items[i].links[0].href + `" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">`+ response.collection.items[i].data[0].title + `</h5>
                  <p class="card-text">` + response.collection.items[i].data[0].description + `</p>
                </div>
                </div>`;
                if (((i+1) % 4) == 0)  {
                    addString += `</div><div class="card-deck">`;
                }
            }
            $('#results').html(addString);
            if (lastIndex != -1) {
                $('#loadMore').html(`<div class="d-flex justify-content-center">
                <button onclick="loadMore()">Load More</button>
                </div>`);
            }
        }
    });
}

function loadMore() {
    var addString = '';
    var limit;
    var response = lastResult;
    var showButton = true;

    if (response.collection.items.length < (lastIndex + 1)) {
        limit = (lastIndex + 1)
        showButton = false;
    } else {
        if (response.collection.items.length < (lastIndex + 13)) {
            limit = response.collection.items.length - 12;
            showButton = false;

        } else {
            limit = (lastIndex + 12);
        }
    }

    for (i=(lastIndex + 1);i<limit;i++){
        addString +=
        `<div class="card">
        <img class="card-img-top" src="` + response.collection.items[i].links[0].href + `" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">`+ response.collection.items[i].data[0].title + `</h5>
          <p class="card-text">` + response.collection.items[i].data[0].description + `</p>
        </div>
        </div>`;
        if (((i+1) % 4) == 0)  {
            addString += `</div><div class="card-deck">`;
        }
    }
    $('#results').html($('#results').html() + `</div>` + addString);
    lastIndex += 12;
    if (showButton) {
        $('#loadMore').html(`<div class="d-flex justify-content-center">
                <button onclick="loadMore()">Load More</button>
                </div>`);
    } else {
        $('#loadMore').html(``);
    }
}