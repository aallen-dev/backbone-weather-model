;(function(){


	Backbone.GeoModel = Backbone.Model.extend({ 
        defaults:{
            app     : 'BlazinWeather',
            model   : 'geoCoder',
            appId   : 'HRhkTkWaQ7hPl25u77l4',
            appCode : 'sbTS5bPhL1tdiAi4xMKGew'
        },
        url:function(){
            return [
                'http://geocoder.cit.api.here.com/6.2/geocode.json?' ,
                'searchtext=' , this.get('searchtext') ,
                '&app_id='    , this.get('appId') ,
                '&app_code='  , this.get('appCode') ,
                '&gen=6'
            ].join('')
        },
        search : function(){

        	var searchtext = this.get('searchtext')
        	var search = this.get('search')
            var self = this;

            this.fetch().then(function() {

                var response = self.get('Response');
                var coords = [],coordsCurrent=[];

                if (typeof searchtext!== 'string'){
                    coords = searchtext , coordsCurrent = searchtext;
                    search.geoCoder.trigger('receivingDone');
                    self.set('coords' , coords);

                }
                else
                    coords=[
                        response.View[0].Result[0].Location.DisplayPosition.Latitude,
                        response.View[0].Result[0].Location.DisplayPosition.Longitude
                    ] ,
                    coordsCurrent = self.get('coords');

                if (!coordsCurrent || coords[0]!=coordsCurrent[0] || coords[1]!=coordsCurrent[1])
                    self.set('coords' , coords);
                // debugger
                var currentImage = self.get('imageURL') ,
                    imageURL = [
                        
                        'http://image.maps.cit.api.here.com/mia/1.6/mapview?' ,
                        '&z=10&w=200&h=200&f=1&' ,
                        
                        'c=' + coords.join() ,                

                        '&app_id='    , self.get('appId') ,
                        '&app_code='  , self.get('appCode') ,

                    ].join('');

                if (!currentImage || currentImage!==imageURL)
                    self.set('imageURL' , imageURL);

                self.set('searchtext' ,  searchtext);

                Backbone.trigger('gotCoords' , search);
                self.trigger('gotCoords');

            });

        }
    })
	Backbone.ForecasterModel = Backbone.Model.extend({ // enable caching for this model (notworking yet)
	    defaults:{
	        app      : 'BlazinWeather',
	        model    : 'forcaster',
	        appKey   : '75795779ba854799189a2b57b5347e15' 
	        // cashName : 'search_' + this.get('searchtext')
	    },
	    url:function(){
	         return [
	                'https://api.forecast.io/forecast/' ,
	                this.get('appKey'),
	                '/',
	                this.get('coords')[0] + ',' + this.get('coords')[1] ,
	                '?callback=?'
	            ].join('');
	     } ,
	    initialize : function(){
	        var search = this.get('search')
	        this.listenTo(search.geoCoder , 'gotCoords' , function(){
	            
	            this.set('coords' , search.geoCoder.get('coords'));
	            

	            // this.set('Response' , {"app":"BlazinWeather","model":"forcaster","appKey":"75795779ba854799189a2b57b5347e15","expiry":600000,"cashName":"","latitude":32.77816,"longitude":-96.7954,"timezone":"America/Chicago","offset":-6,"currently":{"time":1424131661,"summary":"Overcast","icon":"cloudy","nearestStormDistance":79,"nearestStormBearing":140,"precipIntensity":0,"precipProbability":0,"temperature":36.39,"apparentTemperature":28.75,"dewPoint":28.25,"humidity":0.72,"windSpeed":10.95,"windBearing":348,"visibility":9.37,"cloudCover":0.94,"pressure":1020.29,"ozone":286.6},"minutely":{"summary":"Overcast for the hour.","icon":"cloudy","data":[{"time":1424131620,"precipIntensity":0,"precipProbability":0},{"time":1424131680,"precipIntensity":0,"precipProbability":0},{"time":1424131740,"precipIntensity":0,"precipProbability":0},{"time":1424131800,"precipIntensity":0,"precipProbability":0},{"time":1424131860,"precipIntensity":0,"precipProbability":0},{"time":1424131920,"precipIntensity":0,"precipProbability":0},{"time":1424131980,"precipIntensity":0,"precipProbability":0},{"time":1424132040,"precipIntensity":0,"precipProbability":0},{"time":1424132100,"precipIntensity":0,"precipProbability":0},{"time":1424132160,"precipIntensity":0,"precipProbability":0},{"time":1424132220,"precipIntensity":0,"precipProbability":0},{"time":1424132280,"precipIntensity":0,"precipProbability":0},{"time":1424132340,"precipIntensity":0,"precipProbability":0},{"time":1424132400,"precipIntensity":0,"precipProbability":0},{"time":1424132460,"precipIntensity":0,"precipProbability":0},{"time":1424132520,"precipIntensity":0,"precipProbability":0},{"time":1424132580,"precipIntensity":0,"precipProbability":0},{"time":1424132640,"precipIntensity":0,"precipProbability":0},{"time":1424132700,"precipIntensity":0,"precipProbability":0},{"time":1424132760,"precipIntensity":0,"precipProbability":0},{"time":1424132820,"precipIntensity":0,"precipProbability":0},{"time":1424132880,"precipIntensity":0,"precipProbability":0},{"time":1424132940,"precipIntensity":0,"precipProbability":0},{"time":1424133000,"precipIntensity":0,"precipProbability":0},{"time":1424133060,"precipIntensity":0,"precipProbability":0},{"time":1424133120,"precipIntensity":0,"precipProbability":0},{"time":1424133180,"precipIntensity":0,"precipProbability":0},{"time":1424133240,"precipIntensity":0,"precipProbability":0},{"time":1424133300,"precipIntensity":0,"precipProbability":0},{"time":1424133360,"precipIntensity":0,"precipProbability":0},{"time":1424133420,"precipIntensity":0,"precipProbability":0},{"time":1424133480,"precipIntensity":0,"precipProbability":0},{"time":1424133540,"precipIntensity":0,"precipProbability":0},{"time":1424133600,"precipIntensity":0,"precipProbability":0},{"time":1424133660,"precipIntensity":0,"precipProbability":0},{"time":1424133720,"precipIntensity":0,"precipProbability":0},{"time":1424133780,"precipIntensity":0,"precipProbability":0},{"time":1424133840,"precipIntensity":0,"precipProbability":0},{"time":1424133900,"precipIntensity":0,"precipProbability":0},{"time":1424133960,"precipIntensity":0,"precipProbability":0},{"time":1424134020,"precipIntensity":0,"precipProbability":0},{"time":1424134080,"precipIntensity":0,"precipProbability":0},{"time":1424134140,"precipIntensity":0,"precipProbability":0},{"time":1424134200,"precipIntensity":0,"precipProbability":0},{"time":1424134260,"precipIntensity":0,"precipProbability":0},{"time":1424134320,"precipIntensity":0,"precipProbability":0},{"time":1424134380,"precipIntensity":0,"precipProbability":0},{"time":1424134440,"precipIntensity":0,"precipProbability":0},{"time":1424134500,"precipIntensity":0,"precipProbability":0},{"time":1424134560,"precipIntensity":0,"precipProbability":0},{"time":1424134620,"precipIntensity":0,"precipProbability":0},{"time":1424134680,"precipIntensity":0,"precipProbability":0},{"time":1424134740,"precipIntensity":0,"precipProbability":0},{"time":1424134800,"precipIntensity":0,"precipProbability":0},{"time":1424134860,"precipIntensity":0,"precipProbability":0},{"time":1424134920,"precipIntensity":0,"precipProbability":0},{"time":1424134980,"precipIntensity":0,"precipProbability":0},{"time":1424135040,"precipIntensity":0,"precipProbability":0},{"time":1424135100,"precipIntensity":0,"precipProbability":0},{"time":1424135160,"precipIntensity":0,"precipProbability":0},{"time":1424135220,"precipIntensity":0,"precipProbability":0}]},"hourly":{"summary":"Mostly cloudy until tomorrow afternoon.","icon":"partly-cloudy-night","data":[{"time":1424131200,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":36.32,"apparentTemperature":28.66,"dewPoint":28.17,"humidity":0.72,"windSpeed":10.92,"windBearing":348,"visibility":9.4,"cloudCover":0.94,"pressure":1020.19,"ozone":286.48},{"time":1424134800,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":36.91,"apparentTemperature":29.3,"dewPoint":28.77,"humidity":0.72,"windSpeed":11.14,"windBearing":349,"visibility":9.18,"cloudCover":0.96,"pressure":1020.97,"ozone":287.4},{"time":1424138400,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":36.58,"apparentTemperature":28.87,"dewPoint":28.65,"humidity":0.73,"windSpeed":11.19,"windBearing":352,"visibility":9.16,"cloudCover":0.92,"pressure":1021.65,"ozone":288.42},{"time":1424142000,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":35.75,"apparentTemperature":27.93,"dewPoint":28.21,"humidity":0.74,"windSpeed":10.98,"windBearing":357,"visibility":9.14,"cloudCover":0.67,"pressure":1022.28,"ozone":289.69},{"time":1424145600,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":34.43,"apparentTemperature":26.89,"dewPoint":27.74,"humidity":0.76,"windSpeed":9.7,"windBearing":359,"visibility":9.03,"cloudCover":0.56,"pressure":1022.79,"ozone":290.62},{"time":1424149200,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":33.25,"apparentTemperature":25.81,"dewPoint":27.29,"humidity":0.78,"windSpeed":8.98,"windBearing":0,"visibility":8.98,"cloudCover":0.52,"pressure":1023.18,"ozone":291.81},{"time":1424152800,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":32.18,"apparentTemperature":24.62,"dewPoint":26.68,"humidity":0.8,"windSpeed":8.74,"windBearing":10,"visibility":8.79,"cloudCover":0.42,"pressure":1023.47,"ozone":295.17},{"time":1424156400,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":31.76,"apparentTemperature":24.12,"dewPoint":26.29,"humidity":0.8,"windSpeed":8.73,"windBearing":10,"visibility":8.81,"cloudCover":0.48,"pressure":1023.59,"ozone":302.52},{"time":1424160000,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":31.21,"apparentTemperature":23.41,"dewPoint":25.65,"humidity":0.8,"windSpeed":8.78,"windBearing":0,"visibility":8.79,"cloudCover":0.56,"pressure":1023.64,"ozone":312.04},{"time":1424163600,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":30.8,"apparentTemperature":22.86,"dewPoint":24.97,"humidity":0.79,"windSpeed":8.87,"windBearing":0,"visibility":8.86,"cloudCover":0.63,"pressure":1023.75,"ozone":320.22},{"time":1424167200,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":30.66,"apparentTemperature":23.22,"dewPoint":24.32,"humidity":0.77,"windSpeed":7.99,"windBearing":356,"visibility":8.95,"cloudCover":0.74,"pressure":1023.94,"ozone":325.66},{"time":1424170800,"summary":"Mostly Cloudy","icon":"partly-cloudy-night","precipIntensity":0,"precipProbability":0,"temperature":30.76,"apparentTemperature":24.02,"dewPoint":23.93,"humidity":0.75,"windSpeed":6.97,"windBearing":355,"visibility":8.97,"cloudCover":0.88,"pressure":1024.19,"ozone":329.75},{"time":1424174400,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":31.02,"apparentTemperature":24.87,"dewPoint":23.57,"humidity":0.74,"windSpeed":6.26,"windBearing":346,"visibility":9.03,"cloudCover":0.98,"pressure":1024.49,"ozone":333.22},{"time":1424178000,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":31.53,"apparentTemperature":25.22,"dewPoint":23.64,"humidity":0.72,"windSpeed":6.59,"windBearing":343,"visibility":9.01,"cloudCover":1,"pressure":1024.97,"ozone":335.83},{"time":1424181600,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":32.78,"apparentTemperature":26.21,"dewPoint":23.7,"humidity":0.69,"windSpeed":7.34,"windBearing":340,"visibility":9.23,"cloudCover":1,"pressure":1025.57,"ozone":337.82},{"time":1424185200,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":34.7,"apparentTemperature":28.32,"dewPoint":24.46,"humidity":0.66,"windSpeed":7.69,"windBearing":336,"visibility":9.41,"cloudCover":0.99,"pressure":1025.95,"ozone":340.58},{"time":1424188800,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":37.41,"apparentTemperature":31.52,"dewPoint":25.63,"humidity":0.62,"windSpeed":7.84,"windBearing":330,"visibility":9.65,"cloudCover":0.98,"pressure":1025.97,"ozone":345.01},{"time":1424192400,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":40.1,"apparentTemperature":34.87,"dewPoint":25.89,"humidity":0.56,"windSpeed":7.7,"windBearing":328,"visibility":9.79,"cloudCover":0.91,"pressure":1025.73,"ozone":350.2},{"time":1424196000,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":43.01,"apparentTemperature":38.48,"dewPoint":26.38,"humidity":0.52,"windSpeed":7.54,"windBearing":323,"visibility":9.88,"cloudCover":0.76,"pressure":1025.27,"ozone":354.84},{"time":1424199600,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":45.73,"apparentTemperature":41.75,"dewPoint":27.4,"humidity":0.48,"windSpeed":7.59,"windBearing":315,"visibility":9.94,"cloudCover":0.52,"pressure":1024.36,"ozone":358.33},{"time":1424203200,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":48.26,"apparentTemperature":44.65,"dewPoint":28.9,"humidity":0.47,"windSpeed":7.99,"windBearing":303,"visibility":9.97,"cloudCover":0.32,"pressure":1023.13,"ozone":361.26},{"time":1424206800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":50.67,"apparentTemperature":50.67,"dewPoint":30.51,"humidity":0.46,"windSpeed":8.03,"windBearing":289,"visibility":10,"cloudCover":0.12,"pressure":1022.22,"ozone":364.07},{"time":1424210400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":51.24,"apparentTemperature":51.24,"dewPoint":31.85,"humidity":0.47,"windSpeed":7.45,"windBearing":278,"visibility":10,"cloudCover":0.06,"pressure":1021.87,"ozone":367.81},{"time":1424214000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":50.67,"apparentTemperature":50.67,"dewPoint":32.67,"humidity":0.5,"windSpeed":6.6,"windBearing":266,"visibility":10,"cloudCover":0.04,"pressure":1021.9,"ozone":371.43},{"time":1424217600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":49.11,"apparentTemperature":46.59,"dewPoint":32.68,"humidity":0.53,"windSpeed":6.03,"windBearing":253,"visibility":10,"cloudCover":0.03,"pressure":1022.05,"ozone":372.25},{"time":1424221200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":47.64,"apparentTemperature":44.84,"dewPoint":32.9,"humidity":0.56,"windSpeed":6.04,"windBearing":240,"visibility":10,"cloudCover":0.02,"pressure":1022.46,"ozone":368.2},{"time":1424224800,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":45.69,"apparentTemperature":42.38,"dewPoint":32.72,"humidity":0.6,"windSpeed":6.28,"windBearing":230,"visibility":10,"cloudCover":0.01,"pressure":1023.11,"ozone":361.34},{"time":1424228400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":43.96,"apparentTemperature":40.18,"dewPoint":32.47,"humidity":0.64,"windSpeed":6.5,"windBearing":227,"visibility":10,"cloudCover":0.05,"pressure":1023.71,"ozone":355.17},{"time":1424232000,"summary":"Clear","icon":"clear-night","precipIntensity":0.0028,"precipProbability":0.03,"precipType":"rain","temperature":42.82,"apparentTemperature":38.72,"dewPoint":32.44,"humidity":0.66,"windSpeed":6.67,"windBearing":232,"visibility":9.56,"cloudCover":0.19,"pressure":1024.11,"ozone":351.07},{"time":1424235600,"summary":"Drizzle","icon":"rain","precipIntensity":0.0058,"precipProbability":0.14,"precipType":"rain","temperature":42.16,"apparentTemperature":37.85,"dewPoint":32.63,"humidity":0.69,"windSpeed":6.81,"windBearing":243,"visibility":8.94,"cloudCover":0.36,"pressure":1024.39,"ozone":347.65},{"time":1424239200,"summary":"Drizzle","icon":"rain","precipIntensity":0.0072,"precipProbability":0.21,"precipType":"rain","temperature":41.79,"apparentTemperature":37.42,"dewPoint":32.74,"humidity":0.7,"windSpeed":6.78,"windBearing":259,"visibility":8.63,"cloudCover":0.44,"pressure":1024.56,"ozone":344.27},{"time":1424242800,"summary":"Drizzle","icon":"rain","precipIntensity":0.0056,"precipProbability":0.13,"precipType":"rain","temperature":40.93,"apparentTemperature":36.49,"dewPoint":31.71,"humidity":0.69,"windSpeed":6.61,"windBearing":274,"visibility":8.94,"cloudCover":0.35,"pressure":1024.69,"ozone":340.39},{"time":1424246400,"summary":"Clear","icon":"clear-night","precipIntensity":0.0024,"precipProbability":0.02,"precipType":"rain","temperature":40.37,"apparentTemperature":35.75,"dewPoint":30.67,"humidity":0.68,"windSpeed":6.71,"windBearing":292,"visibility":9.54,"cloudCover":0.16,"pressure":1024.83,"ozone":336.54},{"time":1424250000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":39.47,"apparentTemperature":34.51,"dewPoint":29.91,"humidity":0.68,"windSpeed":6.98,"windBearing":307,"visibility":10,"cloudCover":0.01,"pressure":1025.03,"ozone":333.7},{"time":1424253600,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":37.62,"apparentTemperature":32.57,"dewPoint":29.48,"humidity":0.72,"windSpeed":6.52,"windBearing":316,"visibility":10,"cloudCover":0,"pressure":1025.29,"ozone":332.4},{"time":1424257200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":35.3,"apparentTemperature":30.35,"dewPoint":28.98,"humidity":0.78,"windSpeed":5.74,"windBearing":318,"visibility":10,"cloudCover":0,"pressure":1025.62,"ozone":332.1},{"time":1424260800,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":34.61,"apparentTemperature":30.25,"dewPoint":29.15,"humidity":0.8,"windSpeed":4.88,"windBearing":318,"visibility":10,"cloudCover":0,"pressure":1026.07,"ozone":332.16},{"time":1424264400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":35.64,"apparentTemperature":31.99,"dewPoint":29.57,"humidity":0.78,"windSpeed":4.29,"windBearing":319,"visibility":10,"cloudCover":0,"pressure":1026.7,"ozone":332.57},{"time":1424268000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":37.81,"apparentTemperature":34.73,"dewPoint":30.12,"humidity":0.74,"windSpeed":4.06,"windBearing":330,"visibility":10,"cloudCover":0,"pressure":1027.37,"ozone":333.34},{"time":1424271600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":40.66,"apparentTemperature":37.91,"dewPoint":30.4,"humidity":0.67,"windSpeed":4.2,"windBearing":342,"visibility":10,"cloudCover":0,"pressure":1027.85,"ozone":333.9},{"time":1424275200,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":44.31,"apparentTemperature":41.07,"dewPoint":29.57,"humidity":0.56,"windSpeed":5.71,"windBearing":352,"visibility":10,"cloudCover":0,"pressure":1027.97,"ozone":333.93},{"time":1424278800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":48.47,"apparentTemperature":45.19,"dewPoint":27.16,"humidity":0.43,"windSpeed":7.33,"windBearing":356,"visibility":10,"cloudCover":0,"pressure":1027.85,"ozone":333.74},{"time":1424282400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":51.66,"apparentTemperature":51.66,"dewPoint":24.33,"humidity":0.34,"windSpeed":8.25,"windBearing":358,"visibility":10,"cloudCover":0,"pressure":1027.62,"ozone":333.72},{"time":1424286000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":53.44,"apparentTemperature":53.44,"dewPoint":23.49,"humidity":0.31,"windSpeed":8.67,"windBearing":356,"visibility":10,"cloudCover":0,"pressure":1027.23,"ozone":334.01},{"time":1424289600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":54.37,"apparentTemperature":54.37,"dewPoint":24.31,"humidity":0.31,"windSpeed":8.63,"windBearing":352,"visibility":10,"cloudCover":0,"pressure":1026.73,"ozone":334.47},{"time":1424293200,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":54.58,"apparentTemperature":54.58,"dewPoint":25.48,"humidity":0.32,"windSpeed":8.54,"windBearing":351,"visibility":10,"cloudCover":0,"pressure":1026.51,"ozone":335.03},{"time":1424296800,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":53.91,"apparentTemperature":53.91,"dewPoint":26.57,"humidity":0.35,"windSpeed":8.41,"windBearing":355,"visibility":10,"cloudCover":0,"pressure":1026.65,"ozone":335.92},{"time":1424300400,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":52.18,"apparentTemperature":52.18,"dewPoint":27.46,"humidity":0.38,"windSpeed":8.11,"windBearing":3,"visibility":10,"cloudCover":0,"pressure":1027.02,"ozone":336.9},{"time":1424304000,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":50.06,"apparentTemperature":50.06,"dewPoint":27.87,"humidity":0.42,"windSpeed":7.69,"windBearing":13,"visibility":10,"cloudCover":0,"pressure":1027.55,"ozone":337.26}]},"daily":{"summary":"Light rain throughout the week, with temperatures peaking at 72°F on Saturday.","icon":"rain","data":[{"time":1424066400,"summary":"Mixed precipitation in the morning.","icon":"rain","sunriseTime":1424092261,"sunsetTime":1424132063,"moonPhase":0.92,"precipIntensity":0.0097,"precipIntensityMax":0.0468,"precipIntensityMaxTime":1424073600,"precipProbability":0.52,"precipType":"rain","temperatureMin":32.34,"temperatureMinTime":1424106000,"temperatureMax":60.45,"temperatureMaxTime":1424066400,"apparentTemperatureMin":22.62,"apparentTemperatureMinTime":1424106000,"apparentTemperatureMax":60.45,"apparentTemperatureMaxTime":1424066400,"dewPoint":32.38,"humidity":0.81,"windSpeed":10.83,"windBearing":336,"visibility":7.94,"cloudCover":0.89,"pressure":1018.5,"ozone":280.25},{"time":1424152800,"summary":"Drizzle overnight.","icon":"rain","sunriseTime":1424178601,"sunsetTime":1424218516,"moonPhase":0.95,"precipIntensity":0.0004,"precipIntensityMax":0.0058,"precipIntensityMaxTime":1424235600,"precipProbability":0.14,"precipType":"rain","temperatureMin":30.66,"temperatureMinTime":1424167200,"temperatureMax":51.24,"temperatureMaxTime":1424210400,"apparentTemperatureMin":22.86,"apparentTemperatureMinTime":1424163600,"apparentTemperatureMax":51.24,"apparentTemperatureMaxTime":1424210400,"dewPoint":28.01,"humidity":0.64,"windSpeed":5.11,"windBearing":316,"visibility":9.49,"cloudCover":0.5,"pressure":1023.91,"ozone":344.23},{"time":1424239200,"summary":"Clear throughout the day.","icon":"clear-day","sunriseTime":1424264940,"sunsetTime":1424304969,"moonPhase":0.99,"precipIntensity":0.0006,"precipIntensityMax":0.0072,"precipIntensityMaxTime":1424239200,"precipProbability":0.21,"precipType":"rain","temperatureMin":34.61,"temperatureMinTime":1424260800,"temperatureMax":54.58,"temperatureMaxTime":1424293200,"apparentTemperatureMin":30.25,"apparentTemperatureMinTime":1424260800,"apparentTemperatureMax":54.58,"apparentTemperatureMaxTime":1424293200,"dewPoint":28,"humidity":0.55,"windSpeed":5.21,"windBearing":353,"visibility":9.89,"cloudCover":0.04,"pressure":1027.17,"ozone":334.72},{"time":1424325600,"summary":"Mostly cloudy starting in the evening.","icon":"partly-cloudy-night","sunriseTime":1424351278,"sunsetTime":1424391421,"moonPhase":0.03,"precipIntensity":0,"precipIntensityMax":0,"precipProbability":0,"temperatureMin":31.28,"temperatureMinTime":1424343600,"temperatureMax":58.99,"temperatureMaxTime":1424383200,"apparentTemperatureMin":24.12,"apparentTemperatureMinTime":1424347200,"apparentTemperatureMax":58.99,"apparentTemperatureMaxTime":1424383200,"dewPoint":31.17,"humidity":0.59,"windSpeed":11.44,"windBearing":154,"visibility":10,"cloudCover":0.08,"pressure":1026.16,"ozone":312.92},{"time":1424412000,"summary":"Drizzle until afternoon.","icon":"rain","sunriseTime":1424437614,"sunsetTime":1424477873,"moonPhase":0.07,"precipIntensity":0.0028,"precipIntensityMax":0.0053,"precipIntensityMaxTime":1424451600,"precipProbability":0.15,"precipType":"rain","temperatureMin":50.76,"temperatureMinTime":1424426400,"temperatureMax":66.23,"temperatureMaxTime":1424476800,"apparentTemperatureMin":50.76,"apparentTemperatureMinTime":1424426400,"apparentTemperatureMax":66.23,"apparentTemperatureMaxTime":1424476800,"dewPoint":54.17,"humidity":0.88,"windSpeed":15.08,"windBearing":159,"cloudCover":0.96,"pressure":1015.5,"ozone":297.98},{"time":1424498400,"summary":"Overcast throughout the day.","icon":"cloudy","sunriseTime":1424523950,"sunsetTime":1424564324,"moonPhase":0.1,"precipIntensity":0.0022,"precipIntensityMax":0.0034,"precipIntensityMaxTime":1424538000,"precipProbability":0.06,"precipType":"rain","temperatureMin":56.69,"temperatureMinTime":1424581200,"temperatureMax":71.76,"temperatureMaxTime":1424559600,"apparentTemperatureMin":56.69,"apparentTemperatureMinTime":1424581200,"apparentTemperatureMax":71.76,"apparentTemperatureMaxTime":1424559600,"dewPoint":59.37,"humidity":0.81,"windSpeed":11.66,"windBearing":190,"cloudCover":0.96,"pressure":1015.49,"ozone":289.12},{"time":1424584800,"summary":"Light rain until evening.","icon":"rain","sunriseTime":1424610285,"sunsetTime":1424650775,"moonPhase":0.14,"precipIntensity":0.0138,"precipIntensityMax":0.0301,"precipIntensityMaxTime":1424620800,"precipProbability":0.86,"precipType":"rain","temperatureMin":42.92,"temperatureMinTime":1424610000,"temperatureMax":52.28,"temperatureMaxTime":1424584800,"apparentTemperatureMin":36.21,"apparentTemperatureMinTime":1424610000,"apparentTemperatureMax":52.28,"apparentTemperatureMaxTime":1424584800,"dewPoint":41.87,"humidity":0.84,"windSpeed":13.1,"windBearing":10,"cloudCover":0.99,"pressure":1024.4,"ozone":279.69},{"time":1424671200,"summary":"Light rain until evening.","icon":"rain","sunriseTime":1424696619,"sunsetTime":1424737225,"moonPhase":0.18,"precipIntensity":0.0059,"precipIntensityMax":0.0132,"precipIntensityMaxTime":1424725200,"precipProbability":0.81,"precipType":"rain","temperatureMin":38.38,"temperatureMinTime":1424696400,"temperatureMax":48.33,"temperatureMaxTime":1424736000,"apparentTemperatureMin":31.69,"apparentTemperatureMinTime":1424696400,"apparentTemperatureMax":46.78,"apparentTemperatureMaxTime":1424736000,"dewPoint":39.29,"humidity":0.86,"windSpeed":6.22,"windBearing":45,"cloudCover":0.88,"pressure":1025.02,"ozone":273.39}]},"flags":{"sources":["nwspa","isd","nearest-precip","fnmoc","sref","rtma","rap","nam","cmc","gfs","madis","lamp","darksky"],"isd-stations":["722580-13960","722583-13960","722599-03971","722599-99999","999999-93928"],"madis-stations":["AN482","AN484","AU960","C1331","C9936","D3728","D4126","D5602","D5612","D6670","D7484","E6412","KDAL","KRBD","UR172","UR193"],"lamp-stations":["KADS","KAFW","KDAL","KDFW","KDTO","KFTW","KFWS","KGKY","KGPM","KHQZ","KJWY","KLNC","KNFW","KRBD","KTKI","KTRL"],"darksky-stations":["KFWS"],"units":"us"}})

	            // this.fetch()
	        });

	    }
	})

    Backbone.geoLocationModel = Backbone.Model.extend({

        initialize:function() {
        	var self = this;
            var success = function(d){
                console.log(d.coords);
                self.trigger('geoCaptured' , d)
                // addSearch([d.coords.latitude,d.coords.longitude]);
            };
            var error = function(d){console.log(d);};
            var options = {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: 0
            };
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    });
}());