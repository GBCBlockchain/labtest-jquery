
function search() {
    var encoded = encodeURIComponent($('#term').val());
    $.get({
        url: "https://images-api.nasa.gov/search?q=apollo%2011&description=" + encoded + "&media_type=image",
        success: function(response){
            console.log(response);
            for (i=0;i<3;i++){
                console.log(response.collection.items[i]);
            }
        }
    });



}