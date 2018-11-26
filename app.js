var nasaData = {};
var renderData;
var page = 0;
const setSearchTerm = function () {
  var searchTerm = ""
  searchTerm = $("input[name='searchterm']").val()
  console.log(searchTerm)
  if (searchTerm === "") {
    // display a message
    alert("You need to input a search term")
  } else {
    // API Call Get Data
    let requestParams = {
      q: searchTerm,
      media_type: 'image'
    }
    getData(requestParams)
  }
}
const getData = function(params) {
  $.ajax({
    url: "https://images-api.nasa.gov/search",
    type: 'GET',
    data: params,
    dataType: 'json'
  })
  .done(function (data) {
    nasaData = data["collection"]["items"]
    // [{ data:[{title: '', description: ''}], links: [{href: '''}]]
    
    renderData = nasaData.map(function (item) {
      return {
        title: item['data'][0]['title'],
        desc: item['data'][0]['description'],
        href: item['links'][0]['href']
      }
    })
    renderImages(renderData, page)
  })
  .fail(function (data) {
    alert("Request Failed", data)
  })
}
const renderImages = function(imgdata, page) {
  var pageData = imgdata.slice((page * 12), (page * 12 + 11))
  var numpages = Math.ceil(imgdata.length / 12)
  let imgContainer = $("#images")
  imgContainer.empty()
  pageData.forEach(function(item) {
    var div = $('<div>').addClass('imgHolder')
    var img = $('<img>');
    img.attr('src', item['href']);
    var caption = $('<div>').addClass('title')
    img.appendTo(div);
    img.css("width","25%")
    caption.text(item['title'])
    caption.appendTo(div)
    var descrip = $('<div>').addClass('desc hide')
    descrip.text(item['desc'])
    descrip.appendTo(div)
    div.appendTo(imgContainer)
    descrip.hide()
  })
  if ((page + 1) < numpages) {
    // render link - add click event
    var linkContainer = $('#seemore')
    linkContainer.empty()
    var link = $('<a>')
    link.text('See More')
    link.appendTo(linkContainer)
    $(linkContainer).on('click', function() {
      console.log("see ,,,")
      page = page + 1
      renderImages(renderData, page)
    })
  }
}
const nasaPreview = function () {
  console.log("Beginning of Preview Code")
    // On button click
    // Grab the search term
    $('#btn').on('click', setSearchTerm)
    // Call the API a) Get Data or b) Get Error
    // Store Data
    // Parse 1st 12 Data Items & Insert into View
    // If more than 12 render a `see more` link
}
$(document).ready(nasaPreview);