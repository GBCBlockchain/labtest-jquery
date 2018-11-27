
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
    
    
    // for(var i = 0; i < length; i++){
    //     var variable = variables[i];
    //     (function(var){ //start wrapper code
    //       otherVariable.doSomething(var, function(err){ //callback for when doSomething ends
    //         do something else with var; //please note that i'm dealing with var here, not variable
    //       }
    //     })(variable);//passing in variable to var here
    //   }
      
    
    
    
    function showNextX(imagesJSON,numImg){
        let maxItemID = itemID + numImg;
        for (; itemID < maxItemID;itemID++){
            //if we have not reached the end of the images
            if (imagesJSON.collection.items[itemID]){
                let image = imagesJSON.collection.items[itemID].href;
                //use IVF - immediately invoked function to pass variable to callback inside loop
                let descrip = imagesJSON.collection.items[itemID].data[0].description;
                (function(descr){
                    //get the image urls from the json collection of images
                    $.getJSON(image, function (imageJSON){
                        console.log(itemID)
                        //append a url in imageJSON if one exists, otherwise try again
                        console.log(descr)
                        if (!appendImage(imageJSON, descr)){
                            showNextX(imagesJSON,1)
                            
                        }
                        //else 
                        //$("p").append(imagesJSON.collection.items[itemID].data[0].description+"<br>")
                    });
                })(descrip)//end IVF
                

            }else {
                //let the user know there are no more images to display
                console.log("ran out of items");
                $("#showMore").text("Nothing more to show").css({ 'color': 'red', 'font-size': '150%' });;
            }     
        }
        //$("#showMore").append((imagesJSON.collection.items.length - itemID) + " more pics to show")
    }

    //called to append a specific version of an image from the JSON including many versions of that file
    function appendImage(imageJSON, desc){
        for (let i=0;i<20;i++){
            let url = imageJSON[i];
            if ( (typeof(url)=="string") && urlIsImg(url) ){
                appendFileLink(imageJSON[i], desc);
                return true;
            }
        }
        return false;
    }


    //Interacts with the html file
    //function to append a single file to the html file
    function appendFileLink(url, desc){
        if (urlIsImg(url) )
            $("p").append("<img width='132' height='124' src='"+url+"'><br>"+desc)
        else 
            console.log("unsupported file type: " + url)
    }

    //UTIL FUNCTION
    //check if a given url is a displayable image
    function urlIsImg(url){
        return ( url.endsWith('.png') || url.endsWith('.img') || url.endsWith('.jpg'))
    }

