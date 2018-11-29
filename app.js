var nasaData;
var renderData;
var page = 0;

const renderImages = function (imgdata, page) {
    var pageData = imgdata.slice((page * 12), ((page + 1) * 12));
    var numpages = Math.ceil(imgdata.length / 12);
    let imgContainer = $("#images");
    imgContainer.empty();
    pageData.forEach(function (item) {
        let divCol = $('<div>');
        divCol.addClass("col-md-3");
        let divTh = $('<div>');
        divTh.addClass("thumbnail")
        let aHr = $('<a>');
        aHr.attr('href', item['href']);
        let img = $('<img>');
        img.attr('src', item['href']);
        img.attr('alt', item['title']);
        img.css("width","100%")
        img.appendTo(aHr);
        let caption = $('<div>');
        caption.addClass("caption");
        caption.text(item['title']);
        caption.appendTo(aHr);
        let descrip = $('<div>');
        descrip.text(item['desc']);
        descrip.appendTo(aHr);
        aHr.appendTo(divTh);
        divTh.appendTo(divCol);
        divCol.appendTo(imgContainer);
        descrip.hide();
        img.hover(function () {
            descrip.show();
        });
    })
    if ((page + 1) < numpages) {
        let linkContainer = $('#seemore');
        linkContainer.empty();
        let link = $('<a>');
        link.text('See More');
        link.addClass("badge badge-primary");
        link.appendTo(linkContainer);
        $(linkContainer).on('click', function () {
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

