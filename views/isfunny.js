define(["jquery", "jquerycookie", "underscore", "backbone", "marionette","text!si/templates/isfunny.html"],
	function($, cookie, _, Backbone, Marionette, template) {

    var IsFunnyView = Marionette.ItemView.extend({
			template: _.template(template),
  
      events: {
				"click a" : "checkButton"
      },
			
      checkButton: function(e) {
				e.target = SiMain.eTarget(e);
				SiMain.checkButtonGroup(e, this.$el.find('a'), $(e.target));

				var isFunny = $(e.target).data('is-funny');
				SiMain.Vent.trigger("get-sentimages", {isFunny: isFunny});
				$.cookie('is-funny', isFunny);
      }			
    });
		
		return IsFunnyView;
	});		