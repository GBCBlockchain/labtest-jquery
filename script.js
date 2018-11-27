$(document).ready(function(e) {   
    
    $('#submit').click(function (event) {
        event.preventDefault();  // Do not run the default action

        let searchQuery = $(':text[name="searchq"]').val();
        $.get("https://images-api.nasa.gov/search?q=" + searchQuery, function(data, status) {


            if(status == "success") {
                console.log(data);
                let counter = 0;
                var validData = [];
                
                // Filter data for blanks or non-images
                data.collection.items.forEach((item) => {
                    if (item.links == undefined || item.links[0].href == undefined || item.links[0].href.split('.').pop() == 'srt') {
                        return;
                    } else {
                        validData.push(item);
                    }
                });
                
                // Partition data for pagination
                let totalItems = validData.length;
                let totalPages = Math.ceil(totalItems / 12);
                
                // Build DOM
                for(var i = 1; i <= totalPages; i++) {
                    $('#image-container').append('<div class="page" id="page' + i + '"></div>');
                    for(var j = 0; j < 12; j++) {
                        
                        $('#page' + i).append('<img height="150" width="200" src="' + validData[i*j].links[0].href + '"></img>')
                    }
                }
                
                // Pagination struct
                $('#pagination').twbsPagination({
                    totalPages: totalPages,
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
                

                
            } else {
                alert("Error retreiving images from NASA. Status", status);
                console.log(status, data);
            }

        });
    });

});


