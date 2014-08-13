require.config({
		baseUrl: '/sites/all/modules/films',		
    paths:{
        'domready': '../../libraries/domready/domready',
				'text': '../../libraries/require/text',
				'jquery': '../jquery_update/replace/jquery/1.7/jquery.min',
				'jqueryui': '../../libraries/jqueryui/jquery-ui.min',
				'jquerycookie': '../../libraries/jquery.cookie/jquery.cookie',				
        'underscore': '../../libraries/underscore/underscore-min',
        'backbone': '../../libraries/backbone/backbone-min',
        'marionette': '../../libraries/marionette/backbone.marionette',				
				'si': 'sentimage/js'
    },
  shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'  
        },
        'marionette': {
            deps: ['underscore', 'jquery', 'backbone'],
            exports: 'Marionette'  
        },
        'jquerycookie': {
            deps: ['jquery'],
            exports: 'cookie'  
        }				
  }
});

require(["jquery", "jquerycookie", "underscore", "domready", "marionette", "si/router"],
	function($, cookie, _, domReady, Marionete, router) {
		domReady(function () {
			addthis.init();
			
			SiMain = new Backbone.Marionette.Application() || {};
			SiMain.framework = 'bootstrap';
			SiMain.sentimagesPerPage = 2;
			SiMain.searchMovieNid = 0;
			SiMain.Vent = SiMain.Vent || {};
			
			SiMain.eTarget = function(e) {
				var target;
				if(e.target) {
					target = e.target;
				}
				else {
					target = window.e.srcElement;
				}
				
				return target;
			};
			
			_.extend(SiMain.Vent, Backbone.Events);
			
			SiMain.buttonGroupsActivate = function(buttonGroups) {
				_.each(buttonGroups, function(buttonGroup) {
					var dataSelector = !_.isEmpty($.cookie(buttonGroup))
						? (' a.btn[data-' + buttonGroup + '=' + $.cookie(buttonGroup) + ']')
						: ' a.btn[data-default=true]';
						
					$('#' + buttonGroup + ' ' + dataSelector).addClass('active');	
				});		
			};
			
			SiMain.checkButtonGroup = function(e, elems, el) {
				elems.removeClass('active');
				el.addClass('active');	
	
				e.preventDefault();
			};
			
			SiMain.addRegions({
				isFunnyRegion: "#is-funny",
				langsRegion: "#langs",			
				siListRegion: "#si-list"
			});		
	
			new router();
			Backbone.history.start();
			
			return SiMain;
    });
	});	