window.onload = app;

// runs when the DOM is loaded
function app(){
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {url: "./dist/style.css"},
        //js
        {url: "./bower_components/jquery/dist/jquery.min.js"},
        {url: "./bower_components/jquery/dist/jquery.swipe.min.js"} ,
        {url: "./bower_components/lodash/lodash.min.js"} ,
        {url: "./bower_components/backbone/backbone.js"} ,
        {url: "./js/casher.js"}
        // {url: "./js/.js"},
        // {url: "./js/.js"},
        // {url: "./js/.js"}
    ).then(function(){
        document.querySelector("html").style.opacity = 1;
        




        window.geoLocation = new Backbone.Cashit({app:'BlazinWeather', model:'geoLocation'});
        
        geoLocation.set({
            data:'something'
        });



    });

}













