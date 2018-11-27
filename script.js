$(document).ready(function(e) {   


    $('#submit').click(function (event) {
        event.preventDefault();  // Do not run the default action

        let searchQuery = $(':text[name="searchq"]').val();
        $.get("https://images-api.nasa.gov/search?q=" + searchQuery, function(data, status) {


            if(status == "success") {
                console.log(data);
                let counter = 0;
                while(counter < 12) {
                    $('p:first').after('<img src="' + data.collection.items[counter].links[0].href + '"></img>');
                    counter++;
                }
            } else {
                alert("Error retreiving images from NASA. Status", status);
                console.log(status, data);
            }

        });
    });

});


