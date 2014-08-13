define(["jquery", "backbone"],
	function($, Backbone) {

    var SubsScrollView = Backbone.View.extend({
      el: "body",
			scrollAllowed: true,
			scrollProcessing: false,
			triggerPoint: 700,
      
      events: {
				"scroll"	: "detectScroll"
      },
			
      initialize: function() {
        _.bindAll(this, 'detectScroll');

				$(window).scroll(this.detectScroll);

				SiMain.Vent.on("scroll-allow", this.setScrollAllowed, this);				
				SiMain.Vent.on("scroll-processing", this.setScrollProcessing, this);				
      },			
      
			detectScroll: function() {
				if(this.scrollProcessing == false) {
					//if((this.el.scrollTop + this.triggerPoint > document.height) && this.scrollAllowed) {
					if(($(document).scrollTop() + this.triggerPoint > $(document).height()) && this.scrollAllowed) {console.log('scrolled')
						SiMain.Vent.trigger("scroll-effected", "down");
					}
				}
			},
			
			setScrollProcessing: function(action) {
				if(action == 'started') {
					this.scrollProcessing = true;
				}
				else if(action == 'ended') {
					this.scrollProcessing = false;
				}				
			},
			
			setScrollAllowed: function(action) {
				this.scrollAllowed = action;
			}				
		});
			
		return SubsScrollView;
	});		