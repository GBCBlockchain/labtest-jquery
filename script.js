$(document).ready(function(e) {   
    
    $('#pagination-demo').twbsPagination({
    totalPages: 5,
    // the current page that show on start
    startPage: 1,

    // maximum visible pages
    visiblePages: 5,

    initiateStartPageClick: true,

    // template for pagination links
    href: false,

    // variable name in href template for page number
    hrefVariable: '{{number}}',

    // Text labels
    first: 'First',
    prev: 'Previous',
    next: 'Next',
    last: 'Last',

    // carousel-style pagination
    loop: false,

    // callback function
    onPageClick: function (event, page) {
            $('.page-active').removeClass('page-active');
    $('#page'+page).addClass('page-active');
    },

    // pagination Classes
    paginationClass: 'pagination',
    nextClass: 'next',
    prevClass: 'prev',
    lastClass: 'last',
    firstClass: 'first',
    pageClass: 'page',
    activeClass: 'active',
    disabledClass: 'disabled'

    });


    $('#submit').click(function (event) {
        event.preventDefault();  // Do not run the default action

        let searchQuery = $(':text[name="searchq"]').val();
        $.get("https://images-api.nasa.gov/search?q=" + searchQuery, function(data, status) {


            if(status == "success") {
                console.log(data);
                let counter = 0;
                while(counter < 12) {
                    $('p:first').after('<img height="150" width="200" src="' + data.collection.items[counter].links[0].href + '"></img>');
                    counter++;
                }
            } else {
                alert("Error retreiving images from NASA. Status", status);
                console.log(status, data);
            }

        });
    });

});


