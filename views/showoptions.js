define(["jquery", "jquerycookie", "underscore", "backbone", "marionette"],
	function($, cookie, _, Backbone, Marionette) {

    var IsFunnyView = Marionette.ItemView.extend({
      events: {
				"click" : "toggleOptions"
      },
			
      initialize: function(options) {
				 _.bindAll(this, "render");
					
					//this.elsToToggle = $(options.langsViewEl).add(options.isFunnyViewEl).add(options.searchSiViewEl);
					this.elsToToggle = $(options.langsViewEl).add(options.isFunnyViewEl);					
      },			
			
			render: function() {
				//is used when only english language active
				//$(this.elsToToggle).hide();				
			},
			
      toggleOptions: function(e) {
				var viewThis = this;
				Drupal.behaviors.autocomplete.attach();
				$(viewThis.elsToToggle).slideToggle( "slow", function() {
					if(!viewThis.$el.hasClass('active')){
						viewThis.$el.addClass('active');
						//Drupal.behaviors.autocomplete.attach();
					}
					else {
						viewThis.$el.removeClass('active');
						//Drupal.behaviors.autocomplete.attach();
					}
				});
      }			
    });
		
		return IsFunnyView;
	});		