define(["jquery", "jquerycookie", "underscore", "backbone", "marionette","text!si/templates/langs.html"],
	function($, cookie, _, Backbone, Marionette, template) {

    var LangsView = Marionette.ItemView.extend({
			template: _.template(template),
  
      events: {
				"click a" : "checkButton"
      },

      checkButton: function(e) {
				e.target = SiMain.eTarget(e);
				SiMain.checkButtonGroup(e, this.$el.find('a'), $(e.target));

				var langs = $(e.target).data('langs');
				SiMain.Vent.trigger("get-sentimages", {language: langs});
				$.cookie('langs', langs);				
      }				
    });
		
		return LangsView;
	});		