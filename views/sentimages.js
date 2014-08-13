define(["jquery", "underscore", "backbone", "marionette", "si/models/sentimage", "si/collections/sentimages", "si/views/sentimage", "si/views/nosentimages", "text!si/templates/spinner.html"],
	function($, _, Backbone, Marionette, Sentimage, Sentimages, SentimageView, NoSentimagesView, spinnerTemplate) {

    var SentimagesView = Marionette.CollectionView.extend({
			spinnerTemplate: _.template(spinnerTemplate),
			itemView: SentimageView,
			fullCollection: new Sentimages(),
			startingSentimage: 0,
			siCollectionChangedData: {
				language: $.cookie('langs') || 'all',
				isFunny: $.cookie('is-funny') || 'all',
				searchText: ''
			},
			siCollectionChangedFlag: false,

      initialize: function() {
				 _.bindAll(this, "siCollectionChanged");
				
				SiMain.Vent.on("scroll-effected", this.scrollEffected, this);
				SiMain.Vent.on("get-sentimages", this.getSentimages, this);				
				
				this.collection = new Sentimages();
				this.collection.on('add', this.onRender, this);
				this.collection.on('reset', this.onRender, this);
				this.collection.on('reset', this.hideSpinner, this);				

				this.getSentimages();
				
				this.$el.append(spinnerTemplate);
      },
			
			//For correct emptyView rendering
			isEmpty: function(collection) {
				return this.siCollectionChangedFlag && !collection.length;
			},			
			
			emptyView: NoSentimagesView,
			
			scrollEffected: function(direction) { 
				var sliceEndingSentimage;					

				if(direction == 'down') { 
					SiMain.Vent.trigger("scroll-processing", "started");

					this.startingSentimage = this.startingSentimage + SiMain.sentimagesPerPage;
					sliceEndingSentimage = this.startingSentimage + SiMain.sentimagesPerPage;
					this.collection.add(this.fullCollection.slice(this.startingSentimage, sliceEndingSentimage));

					SiMain.Vent.trigger("scroll-processing", "ended");

					if(this.collection.models.length == this.fullCollection.models.length) {
						SiMain.Vent.trigger("scroll-allow", false);
					}
					
					addthis.toolbox('#sentimages');
				}
			},			
			
      siCollectionChanged: function(collection, response, options) {
				this.fullCollection = new Sentimages(response);
				this.collection.reset(this.fullCollection.slice(0, SiMain.sentimagesPerPage));
				this.startingSentimage = 0;
				
				SiMain.Vent.trigger("scroll-allow", true);
				SiMain.Vent.trigger("clear-search-textfield", null);
				
				this.siCollectionChangedFlag = true;
				
				addthis.toolbox('#sentimages');
      },				
			
      getSentimages: function(newDataToSend) {
				this.showSpinner();
				_.extend(this.siCollectionChangedData, newDataToSend, {searchMovieNid: SiMain.searchMovieNid});				
				this.collection.fetch({data: this.siCollectionChangedData,  success: this.siCollectionChanged});
      },
			
      showSpinner: function() {
				this.$('.spinner').show();
      },
			
      hideSpinner: function() {
				this.$('.spinner').hide();
      }			
    });  
		
		return SentimagesView;
	});		