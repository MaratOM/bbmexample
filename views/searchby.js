define(["jquery", "backbone", "marionette", "text!si/templates/searchby.html", "text!si/templates/searchby-prefix.html"],
	function($, Backbone, Marionette, template, prefixTemplate) {

    var searchBySiView = Marionette.ItemView.extend({
			template: _.template(template),
			prefixTemplate: _.template(prefixTemplate),			
      
      events: {
				"click #search-by a" : "checkSubmitButton"				
      },
			
      onRender: function() {
				$('#-sentimage-film-search-form .input-group').prepend(this.el);
				this.$el.before(prefixTemplate);
      },
			
      checkSubmitButton: function(e) {
				e.target = SiMain.eTarget(e);
				SiMain.checkButtonGroup(e, this.$el.find('a'), $(e.target));

				var searchBy = $(e.target).data('search-by');
				SiMain.Vent.trigger("searchby-changed", searchBy);
				$.cookie('search-by', searchBy);
      }			
		});
			
		return searchBySiView;
	});		