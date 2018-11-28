/* On document ready, apply tooltip to elements with the 
data toggle */
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// Global array/variable declarations
goodTitles = []
cleanImgArray = []
choppedImgs = []
choppedTitles = []

/* variables used to paginate. morePressed is incremented when user requests
more images, x will then satisfy a while condition and display more images.
they start at 1 because the first page is already displayed after searching */
var morePressed = 1
var x = 1 

/* when search button is clicked, capture search bar user input
and pass to the API call function */
$("#searchButton").on('click', function(){
    let searchTerm = $("#searchBar").val()
    getImages(searchTerm)
})

/* this function queries NASA's database, filters the result
and creates populates arrays with the data */
function getImages(searchTerm) {

    $.get("https://images-api.nasa.gov/search?q="+searchTerm+"&media_type=image", function(data){
        
        // display total number of database hits in a text element
       totalHits = data.collection.metadata.total_hits
       $('#hitCounter').text(`Total database matches: ${totalHits}`)
    
        _.filter(data.collection.items, function(item){
            roughImgArrays = item.links

            _.filter(roughImgArrays, function(href){
                cleanImgArray.push(href.href)
            })
        })

        _.filter(data.collection.items, function(item){
            titles = item.data

            _.filter(titles, function(title){
                goodTitles.push(title.title)
            })
        })
    })
    setTimeout(setImages, 500)
}

/* iterate through the data arrays, creating new image elements
and appending first 12 to a div. also execute functions tracking info */ 
function setImages() {
    for(i=0; (i<goodTitles.length) && (i<12); i++) {
        var title = goodTitles[i]
        var link = cleanImgArray[i]
        let myImage = new Image(400,400)
        myImage.src = link
        myImage.title = title
        $('#image').append(myImage)
        $("img").attr("data-toggle", "tooltip")
        resultsCount(cleanImgArray.length)
        imageCount()
    }
    if (goodTitles.length > 12){
        $('#showMore').css('visibility', 'visible')
    }
}

/* when a user presses the show more button, splice the data
arrays into 12 item arrays. iterate through these to display mores pages */
$("#showMore").on('click', function(){
    splice()
    morePressed++ // tracks how many extra pages have been shown

    try {
        while (x<morePressed) { //pages only get displayed if show more is pressed
            for(i=0; (i<choppedImgs[x].length); i++) {
                var title = choppedTitles[x][i]
                var link = choppedImgs[x][i]
                let myImage = new Image(400,400)
                myImage.src = link
                myImage.title = title   //if condition ensures no dead links get displayed
                if (myImage.title !== undefined && myImage.src !== undefined) {
                    $('#image').append(myImage)
                    $("img").attr("data-toggle", "tooltip")
                } else {
                    console.log("Failed to display: "+ myImage.src)
                }
            }
            x++ //new content displayed so increase x
        }
    }
    catch(error) { //catches the error when there's no images left display
        $('#showMore').css('visibility', 'hidden')
        console.log("No more images to display... "+error)
    }
    imageCount()
})  

// splice original arrays into 12 item pages
function splice(){
    var a = cleanImgArray
    while(a.length) {
        b = a.splice(0,12)
        choppedImgs.push(b)
    }
    var c = goodTitles
    while(c.length) {
        d = c.splice(0,12)
        choppedTitles.push(d)
    }
}

// counts image elements and displays # of pics shown
function imageCount() {
    var o = document.getElementById('image').childElementCount
    $('#hitsOnPage').text(`${o} of `)
}

// display total # of results
function resultsCount(totalResults) {
    $('#totalResults').text(`${totalResults} results`)
}