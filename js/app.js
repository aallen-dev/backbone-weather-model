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
        {url: "./js/views.js"},
        {url: "./js/models.js"},
        {url: "./js/controllers.js"}
        // {url: "./js/casher.js"}
        // {url: "./js/.js"},
        // {url: "./js/.js"}
    ).then(function(){
        document.querySelector("html").style.opacity = 1;

        var searches = {};    // if someone enters the same search twice we should just pull up the last version (instead of re-pulling)
        
        var addSearch = function(searchtext) {
            
            if (!searchtext)
                return;
            if (!searches[searchtext]) {

                searches[searchtext] = new function() {

                    this.text = searchtext;

                    this.geoCoder = new Backbone.GeoModel({
                       
                        searchtext:searchtext ,
                        search:this

                    });

                    this.renderGeo = new Backbone.GeoView(this);
                    this.forcaster = new Backbone.ForecasterModel({search:this,searchtext:searchtext});

                    new Backbone.ForcastView(this);

                    this.show = function(){
                        this.renderGeo.trigger('show');
                    };

                    this.geoCoder.search(searchtext);

                };
            }
            return searches[searchtext];
        };

        var home = addSearch('275 vester ferndale mi');
        
        var geo = new Backbone.geoLocationModel;

        Backbone.listenTo(geo , 'geoCaptured' , function(d){
            addSearch([d.coords.latitude,d.coords.longitude])
        })
        // addSearch([d.coords.latitude,d.coords.longitude]);

        var searches = [];
        var index    = -1;

        Backbone.listenTo(Backbone , 'gotCoords' , function(search) {

            searches.push(search);
            index++;

            $('<span>'+search.text+"</span>").addClass('link').appendTo('.search').click(function(event){
                search.show();
                index = searches.indexOf(search)
            });
        });

        Backbone.listenTo(Backbone , 'showPrev' , function() {

            if(index>0){
                index--;

                searches[index].show();
            }

        });
        Backbone.listenTo(Backbone , 'showNext' , function() {

            if (index<searches.length-1){
                index++;

                searches[index].show();

            }

        });


        
        $('#search').submit(function(event){
            event.preventDefault();
            addSearch($('#userSearch')[0].value);
        });
        // Bind the swipeHandler callback function to the swipe event on div.box
        $( "body" ) .off('swipeleft , swiperight')
                    .on( "swipeleft", function( event ) {

                        event.preventDefault();
                        Backbone.trigger('showNext');
                        // alert()

                    })
                    .on( "swiperight", function( event ){
                        event.preventDefault();
                        Backbone.trigger('showPrev');
                    });

    });

}













