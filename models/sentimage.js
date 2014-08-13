define(["backbone"],
	function(Backbone) {

    var Sentimage = Backbone.Model.extend({
      defaults: {
				sentimageFid: 0,
        sentimageUri: '',
        sentimageTitle: '',
        sentimageAlt: '',				
        sentimageNid: 0,
				thumbnailUri: '',
				previewUri: '',
				sentimageUrlAlias: ''
      }
    });
		
		return Sentimage;
	});		