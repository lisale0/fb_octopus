// FB Login

window.fbAsyncInit = function() {
  FB.init({
    appId      : '176725239553173', // Set YOUR APP ID
    channelUrl : 'http://hayageek.com/examples/oauth/facebook/oauth-javascript/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    if (response.status === 'connected')
    {
      document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";
      //SUCCESS
    } else if (response.status === 'not_authorized') {
      document.getElementById("message").innerHTML +=  "<br>Failed to Connect";
      //FAILED
    } else {
      document.getElementById("message").innerHTML +=  "<br>Logged Out";
      //UNKNOWN ERROR
    }
  });

};

function Login() {
  FB.login(function(response) {
    if (response.authResponse) {
      getUserInfo();
      FB.getAuthResponse(response) {
	console.log("This is the auth response");
	console.log(response);
      }
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  },{scope: 'user_likes'});
}

function getUserInfo() {
  FB.api('/me', function(response) {

    var str="<b>Name</b> : "+response.name+"<br>";
    str +="<b>Username:</b> "+response.username+"<br>";
    str +="<b>id: </b>"+response.id+"<br>";
    str +="<b>Email:</b> "+response.email+"<br>";
    str +="<input type='button' value='Get Photo' onclick='getPhoto();'/>";
    str +="<input type='button' value='Logout' onclick='Logout();'/>";
    document.getElementById("status").innerHTML=str;
    FB.api('/' + response.id + '/music', function(response) {
      console.log(response.data);
    }
    console.log(response);
  });
}

function getPhoto() {
  FB.api('/me/picture?type=normal', function(response) {

    var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
    document.getElementById("status").innerHTML+=str;
  });

}

function Logout() {
  FB.logout(function(){document.location.reload();});
}

// Load the SDK asynchronously
(function(d){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  ref.parentNode.insertBefore(js, ref);
}(document));
