define(["jquery", "backbone", "underscore", "marionette",
	"si/sentimage.fw.data",
	"si/models/sentimage", "si/collections/sentimages", "si/views/sentimages",
	"si/views/scroll", "si/views/showoptions", "si/views/langs", "si/views/isfunny", "si/views/searchby", "si/views/search"],
	function($, Backbone, _, Marionette,
		ViewsFrameworkData,
		Sentimage, Sentimages, SentimagesView,
		SubsScrollView, ShowOptionsView, LangsView, IsFunnyView, SearchBySiView, SearchSiView) {

    var Router = Backbone.Router.extend({
      routes: {
        '': 'index'
      },
      
      index: function() {
				console.log('index loaded');

				var viewsAttrs = ViewsFrameworkData[SiMain.framework];

				new SubsScrollView();
				var langsView = new LangsView(viewsAttrs.langs);
				var isFunnyView = new IsFunnyView(viewsAttrs.isFunny);
				var searchSiView = new SearchSiView();
				var searchBySiView = new SearchBySiView(viewsAttrs.searchBy);
				var sentimagesView = new SentimagesView(viewsAttrs.sentimages);

				SiMain.isFunnyRegion.show(isFunnyView);
				SiMain.langsRegion.show(langsView);				
				searchBySiView.render();
				searchSiView.render();
				SiMain.siListRegion.show(sentimagesView);
				
				//For different languages
				var showOptionsView = new ShowOptionsView(_.extend(
					viewsAttrs.showOptions,
					{langsViewEl: langsView.$el,
					isFunnyViewEl: isFunnyView.$el,
					searchSiViewEl: searchSiView.$el}
				)).render();
				
				SiMain.buttonGroupsActivate(['search-by', 'is-funny', 'langs']);
				
				if($.cookie('is-funny') === 'yes') {
					$.cookie('is-funny', 'no')
				}				
      }
    });
		
		return Router;
	});		