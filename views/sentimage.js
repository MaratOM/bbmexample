define(["jquery", "underscore", "backbone", "marionette", "text!si/templates/sentimage.html"],
	function($, _, Backbone, Marionette, template) {

    var SentimageView = Marionette.ItemView.extend({
			tagName: 'li',
			template: _.template(template)
    });
		
		return SentimageView;
	});		