define(["jquery", "underscore", "backbone", "marionette", "text!si/templates/nosentimages.html"],
	function($, _, Backbone, Marionette, template) {

    var SentimageView = Marionette.ItemView.extend({
			template: _.template(template),
			
      events: {
				"click a.reset-sents-list" : "resetSentsList"
      },
			
      resetSentsList: function() {
				SiMain.Vent.trigger("reset-sents-list", null);
      }			
    });
		
		return SentimageView;
	});		