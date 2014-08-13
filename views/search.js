define(["jquery", "backbone", "marionette", "text!si/templates/search.html"],
	function($, Backbone, Marionette, template) {

    var SearchSiView = Marionette.ItemView.extend({
      el: "#-sentimage-film-search-form",
			searchBy: $.cookie('search-by') || 'title',
			
			template: _.template(template),
			
      initialize: function() {
				SiMain.Vent.on("searchby-changed", this.searchByChanged, this);
				SiMain.Vent.on("reset-sents-list", this.checkClearButton, this);				
      },			
      
      events: {
				"click #edit-submit"	: "findSentImage",
				"click #edit-clear"	: "checkClearButton"				
      },
			
      render: function() {
				this.$el.find('.input-group').append(template);
      },			
			
			findSentImage: function(e) {
				var textLine = this.$el.find('.form-text').val();
				//debugger
				if(textLine && this.searchBy == 'title') {
					var dataToSend = {
						textLine: textLine
					};

					$.ajax({
						type: "POST",
						url: "/sentimages/search",
						data: dataToSend,
						success: function(data){
							SiMain.searchMovieNid = data.movieNid;
							SiMain.Vent.trigger("get-sentimages", {});
						}						
					});
				}
				else {
					//SiMain.Vent.trigger("get-sentimages", {searchText: encodeURIComponent(textLine)});
					SiMain.Vent.trigger("get-sentimages", {searchText: textLine});					
				}				
				
				return false;
			},			
			
			checkClearButton: function() {
				this.clearTextField();
				SiMain.searchMovieNid = 0;
				SiMain.Vent.trigger("get-sentimages", {searchText: ''});

				return false;
			},
			
      searchByChanged: function(searchBy) {
				this.searchBy = searchBy;
      },				
			
      clearTextField: function() {
				this.$el.find('.form-text').val('');
      }			
		});
			
		return SearchSiView;
	});		