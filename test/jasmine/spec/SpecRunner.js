require.config({
		baseUrl: '/sites/all/modules/films',		
    paths:{
        'domready': '../../libraries/domready/domready',
				'text': '../../libraries/require/text',
				'jquery': '../jquery_update/replace/jquery/1.7/jquery.min',
				'jqueryui': '../../libraries/jqueryui/jquery-ui.min',
				'jquerycookie': '../../libraries/jquery.cookie/jquery.cookie',
				'jqueryscrollto': '../../libraries/jquery.scrollto/jquery.scrollTo.min',				
        'underscore': '../../libraries/underscore/underscore-min',
        'backbone': '../../libraries/backbone/backbone-min',
        'marionette': '../../libraries/marionette/backbone.marionette',				
				'si': 'sentimage/js',
				
				'jasmine': '../../libraries/test/jasmine/lib/jasmine',
				'jasmine-html': '../../libraries/test/jasmine/lib/jasmine-html',
				'jasmine-async': '../../libraries/test/jasmine/lib/jasmine.async.min',
				'sinon': '../../libraries/test/sinon/sinon',					
				'spec': 'sentimage/js/test/jasmine/spec'				
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
        },
        'jqueryscrollto': {
            deps: ['jquery'],
            exports: 'scrollTo'  
        },
				
				jasmine: {
					exports: 'jasmine'
				},
				'jasmine-html': {
					deps: ['jasmine'],
					exports: 'jasmine'
				},
				'jasmine-async': {
					deps: ['jasmine'],
					exports: 'async'
				},
				'sinon': {
					deps: ['jasmine'],
					exports: 'sinon'
				}
  }
});

require(["jquery", "jquerycookie", "jqueryscrollto", "underscore", "domready", "marionette", "si/router", "jasmine-html", "sinon"],
	function($, cookie, scrollTo, _, domReady, Marionete, router, jasmine, sinon) {
		
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
 
  var htmlReporter = new jasmine.HtmlReporter();
 
  jasmineEnv.addReporter(htmlReporter);
 
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
 
  var specs = [];
 
  //specs.push('spec/models/sentimage');
  specs.push('spec/views/sentimages');	
	specs.push('spec/views/buttons');
  //specs.push('spec/views/ClearCompletedSpec');
  //specs.push('spec/views/CountViewSpec');
  //specs.push('spec/views/FooterViewSpec');
  //specs.push('spec/views/MarkAllSpec');
  //specs.push('spec/views/NewTaskSpec');
  //specs.push('spec/views/TaskListSpec');
  //specs.push('spec/views/TaskViewSpec');
 
 
  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });		
		
		
		
		
		
		
//		domReady(function () {
//			addthis.init();
//			
//			SiMain = new Backbone.Marionette.Application() || {};
//			SiMain.framework = 'bootstrap';
//			SiMain.sentimagesPerPage = 2;
//			SiMain.searchMovieNid = 0;
//			SiMain.Vent = SiMain.Vent || {};
//			
//			SiMain.eTarget = function(e) {
//				var target;
//				if(e.target) {
//					target = e.target;
//				}
//				else {
//					target = window.e.srcElement;
//				}
//				
//				return target;
//			};
//			
//			_.extend(SiMain.Vent, Backbone.Events);
//			
//			SiMain.buttonGroupsActivate = function(buttonGroups) {
//				_.each(buttonGroups, function(buttonGroup) {
//					var dataSelector = !_.isEmpty($.cookie(buttonGroup))
//						? (' a.btn[data-' + buttonGroup + '=' + $.cookie(buttonGroup) + ']')
//						: ' a.btn[data-default=true]';
//						
//					$('#' + buttonGroup + ' ' + dataSelector).addClass('active');	
//				});		
//			};
//			
//			SiMain.checkButtonGroup = function(e, elems, el) {
//				elems.removeClass('active');
//				el.addClass('active');	
//	
//				e.preventDefault();
//			};
//			
//			SiMain.addRegions({
//				isFunnyRegion: "#is-funny",
//				langsRegion: "#langs",			
//				siListRegion: "#si-list"
//			});		
//	
//			new router();
//			Backbone.history.start();
//    });
	});	