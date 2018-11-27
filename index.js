//Populate 12 Pictures to Container class
function addPicture(picture){
    for (i = 0; i < 12; i++){

        $('#container').prepend($('<img>', {id='pic', src='picture.collection.items[i].links[0].href', 
            height='400', width= '400', style='border:2px solid black'}))

    }
}
$(document).ready(function (){

    var $pictures = $('#pictures');

    //get request
    $.ajax({
        type: 'GET',
        url:'https://images-api.nasa.gov/',
        success: function(pictures){
            console.log('success', pictures);
            $.each(pictures, function(x, picture){
                //call add picture function
                addPicture(picture);
            });
        },
        // Error message
        error: function(){
            alert('loading error');
        }
    });

    $('button').on('click', function(){

        $.ajax({
            type: 'GET',
            url:'https://images-api.nasa.gov/',
            success: function(newPictures){
                console.log('success', newPictures);
                addPicture(picture);

            },
            //Error Message
            error: function(){
                alert('loading error');
            }
        });
        
    });

})