
function search() {
    var encoded = encodeURIComponent($('#term').val());
    $.get({
        url: "https://images-api.nasa.gov/search?q=apollo%2011&description=" + encoded + "&media_type=image",
        success: function(response){
            console.log(response);
            var addString = '';
            for (i=0;i<12;i++){
                console.log(response.collection.items[i]);
                addString +=
                `<div class="card">
                <img class="card-img-top" src="` + response.collection.items[i].links[0].href + `" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">`+ response.collection.items[i].data[0].title + `</h5>
                  <p class="card-text">` + response.collection.items[i].data[0].description + `</p>
                </div>
                </div>`;
                if (i == 3 || i === 7) {
                    addString += `</div><div class="card-deck">`;
                }
            }
            $('#results').html(addString);
        }
    });



}