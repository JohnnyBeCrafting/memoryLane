$("section").hide();

var photoArray = [];

      window.fbAsyncInit = function() {
        FB.init({
          appId      : 'XXXXXX',
          xfbml      : true,
          version    : 'v2.0'
        });
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "http://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

     
      $('.button').click(function(){

          var userDate = $('#date').val();
           console.log(userDate); // not consoling userDate

          
          userDate = new Date(userDate);//convert this into date (milliseconds)
         var startDate = new Date(userDate);//convert previousDate into milliseconds
          startDate.setDate(userDate.getDate()-15);//set.Date()- sets day of month.. getDate gives us day of month and subtract 30 days to get previous date. 
          console.log('startDate is:', startDate);

        var endDate = new Date(userDate);
        endDate.setDate(userDate.getDate()+15);
        console.log('endDate is:', endDate);

          FB.login();

         FB.getLoginStatus(function(response) {

          
             if (response.status === 'connected') {
             console.log('Logged in.');
        
            } else {
            FB.login();

          }
            


         });
         FB.api(
              "/me/photos",
                function (response) {
                $("section").hide();
                if (response && !response.error) {
              

                for(i=0; i<response["data"].length; i++){
                var photoDate= response["data"][i]["created_time"];
                photoDate = new Date(photoDate);//converting photoDate to standard. 
                console.log('fb photo dates are:', photoDate);



                  if ((startDate.getTime() <= photoDate.getTime()) && (photoDate.getTime() >= endDate.getTime())) { // find out why we don't have a successful console. 
                  
                   

                  console.log("its true!" , photoDate)
                  photoArray.push(response["data"][i]);
                  

                  
                }
               
               //create a loop to go thorugh each photo wihin photoArray
               //photoArray needs to be displayed
               
               // $('#links').append('<a href="' + response["data"][i]["link"]+ '">' + '<img src=' + response["data"][i]["images"][0]["source"] + '></a>');
               // $('#links').append('<a href="' + photoArray[i]["link"]+ '">' + '<img src=' + response["data"][i]["images"][0]["source"] + '></a>');
                } 
                for (i=0; i<photoArray.length; i++) {
                    $('#links').append('<a href="' + photoArray[i]["link"]+ '">' + '<img src=' + response["data"][i]["images"][0]["source"] + '></a>');
                  }
                 if (photoArray.length == 0){
                  alert('try going further back in time');
                }
                $(document).ready(function () {
                  $('#links').click(function(event) {
                    event.preventDefault();
                  });

                });
                 
                }
              });
        
      });
              


  

 
