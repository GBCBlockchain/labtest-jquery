
    //track what point in NASA's DB we are searching for photos from
    var itemID = 0;
    const picturesPerClick = 12;

    //add images to browser through sub functions
    function addImages(searchTerm){
        $.getJSON("https://images-api.nasa.gov/search?q="+searchTerm, function (imagesJSON){
            showNextX(imagesJSON,picturesPerClick)
        });
    }  

    //shows the next numImg files
    //starts trying to add images from imagesJSON at location itemID
    //uses recursion to deal with async loops when the image can't be displayed
    //interacts with html when there are no images left to display
    function showNextX(imagesJSON,numImg){
        let maxItemID = itemID + numImg;
        for (; itemID < maxItemID;itemID++){
            if (imagesJSON.collection.items[itemID]){
                let image = imagesJSON.collection.items[itemID].href;
                //get the image urls from the json collection of images
                $.getJSON(image, function (imageJSON){
                    //append a url in imageJSON if one exists, otherwise try again
                    if (!appendImage(imageJSON)){
                        showNextX(imagesJSON,1)
                    }
                });
            }else {
                //let the user know there are no more images to display
                console.log("ran out of items");
                $("#showMore").text("Nothing more to show").css({ 'color': 'red', 'font-size': '150%' });;
            }     
        }
        //$("#showMore").append((imagesJSON.collection.items.length - itemID) + " more pics to show")
    }

    //called to append a specific version of an image from the JSON including many versions of that file
    function appendImage(imageJSON){
        for (let i=0;i<20;i++){
            let url = imageJSON[i];
            if ( (typeof(url)=="string") && urlIsImg(url) ){
                appendFileLink(imageJSON[i]);
                return true;
            }
        }
        return false;
    }


    //Interacts with the html file
    //function to append a single file to the html file
    function appendFileLink(url){
        if (urlIsImg(url) )
            $("p").append("<img width='132' height='124' src='"+url+"'>")
        else 
            console.log("unsupported file type: " + url)
    }

    //UTIL FUNCTION
    //check if a given url is a displayable image
    function urlIsImg(url){
        return ( url.endsWith('.png') || url.endsWith('.img') || url.endsWith('.jpg'))
    }

