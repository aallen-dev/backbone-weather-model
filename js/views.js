;(function(){

    Backbone.ForcastView = Backbone.View.extend({

        el: "<div>",

        initialize: function(search){

            this.listenTo(search.forcaster , 'change:daily' , function(data) {
                var self = this;
                self.render(search);
            });
            this.listenTo(search.renderGeo , 'show' , function() {
                
                this.render(search);

            });
        } ,
        render: function(search) {
            var contexts = search.forcaster.get('daily').data;
            
            contexts.forEach(function(item , index , arr){
            
                var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                var tmp = new Date();
                tmp.setTime(item.time*1000);
            
                arr[index].day  = tmp.toString().split(' ').slice(0,4).join(' ');
            });
            var template = _.template([

                '<span>',
                  '<%=day%> ' ,
                  '<%=summary%><br>' ,
                '</span>'

            ].join(''));
            var HTML = [
                '<div>' ,
                    '<h3>7 Day Forcast</h3>' ,
                    contexts.map(function(context) {
                        return template(context);
                    }).join('') ,
                '</div>'
            ].join('');
            search.renderGeo.$el.append(HTML);


        }
    })


    Backbone.GeoView = Backbone.View.extend({
            
        el: "<div>",

        initialize: function(search){
            
            this.$el.addClass('viewer , horizontalCenter');

            this.listenTo(Backbone , 'hideViews' , function() {
                
                this.$el.addClass('hidden').css({display:'none'});

            });
            this.listenTo(this , 'show' , function() {
                
                this.render(search);

            });
            this.listenTo(search.geoCoder , 'gotCoords' , function() {
                this.render(search);
            });
        } ,
        render : function(search) {

            Backbone.trigger('hideViews');

            this.$el.html('').removeClass('hidden').css({display:'inline-block'});

            this.$el.appendTo('body');
            $('<img>').appendTo(this.$el)
                .addClass('hidden')
                .attr({src:search.geoCoder.get('imageURL')})
                .on('load',function(){
                    $(this).removeClass('hidden');
                });

            this.trigger('renderDone');

        }

    })
}());