$(document).ready(function(e) {   
    
    $('#submit').click(function (event) {
        event.preventDefault();  // Do not run the default action

        let searchQuery = $(':text[name="searchq"]').val();
        $.get("https://images-api.nasa.gov/search?q=" + searchQuery, function(data, status) {


            if(status == "success") {
                console.log(data);
                let counter = 0;
                
                // Partition data for pagination
                let totalItems = data.collection.items.length;
                let totalPages = Math.ceil(totalItems / 12);
                
                
                // Pagination struct
                $('#pagination').twbsPagination({
                    totalPages: totalPages,
                    // the current page that show on start
                    startPage: 1,

                    // maximum visible pages
                    visiblePages: totalPages,

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
                
                // Build DOM
                for(var i = 1; i <= totalPages; i++) {
                    $('#image-container').append('<div class="jumbotron page" id="page' + i + '"></div>');
                    for(var j = 0; j < 12; j++) {
                        
                        data.collection.items[i*j].links ? $('#page' + i).append('<img height="150" width="200" src="' + data.collection.items[i*j].links[0].href + '"></img>') : $('#page' + i).append('<div>BLANK</div>');
                    }
                }
                
            } else {
                alert("Error retreiving images from NASA. Status", status);
                console.log(status, data);
            }

        });
    });

});


