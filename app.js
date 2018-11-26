var nasaData;
var renderData;
var page = 0;

const renderImages = function (imgdata, page) {
    var pageData = imgdata.slice((page * 12), (page * 12 + 11));
    var numpages = Math.ceil(imgdata.length / 12);
    let imgContainer = $("#images");
    imgContainer.empty();
    pageData.forEach(function (item) {
        let div = $('<div>');
        let img = $('<img>');
        img.attr('src', item['href']);
        let caption = $('<div>');
        div.addClass("col-md-3 profile-card-1");
        img.addClass("img-fluid");
        img.appendTo(div);
        caption.addClass("card-content");
        caption.text(item['title']);
        caption.appendTo(div);
        let descrip = $('<div>');
        descrip.text(item['desc']);
        descrip.appendTo(div);
        div.appendTo(imgContainer);
        descrip.hide();
        img.mouseover(function () {
            descrip.show();
        });
        img.mouseout(function () {
            descrip.hide();
        });
    })
    if ((page + 1) < numpages) {
        // render link - add click event
        let linkContainer = $('#seemore');
        linkContainer.empty();
        let link = $('<a>');
        link.text('See More');
        link.addClass("badge badge-primary");
        link.appendTo(linkContainer);
        $(linkContainer).on('click', function () {
            console.log("see more");
            page = page + 1;
            renderImages(renderData, page);
        })
    }
}

$("#btn").on("click", function () {
    let searchTerm = $("#sContent").val();

    $.ajax({

        url: "https://images-api.nasa.gov/search",

        data: {
            q: searchTerm,
            media_type: "image"
        },

        type: "GET",

        dataType: "json",
    })
        .done(function (json) {
            nasaData = json.collection.items;
            renderData = nasaData.map(function (item) {
                return {
                    title: item.data[0].title,
                    desc: item.data[0].description,
                    href: item.links[0].href
                }
            })
            renderImages(renderData, page);
        })
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        })
        .always(function (xhr, status) {
            console.log("The request is complete!");
        })
});

