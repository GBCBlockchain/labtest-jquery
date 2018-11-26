 $(document).ready(function(e) {   

     
   $(':submit').click(function (event) {
      event.preventDefault();  // Do not run the default action
      
      let searchQuery = $(':text[name="searchq"]').val();
      $.get("https://images-api.nasa.gov/search?q=" + searchQuery, function(data, status) {
  
          
          if(status == "success") {
                      console.log(data);
          } else {
            alert("Error retreiving images from NASA. Status", status);
            console.log(status, data);
          }
          
      });
   }
 });
 
 
