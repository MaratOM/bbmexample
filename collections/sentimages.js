define(["backbone", "si/models/sentimage"],
	function(Backbone, Sentimage) {

    var SentimagesList = Backbone.Collection.extend({
      model: Sentimage,
			url: function(options) {
				return  '/sentimage/sentimages';
			}			
    });
		
		return SentimagesList;
	});