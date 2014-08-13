({
		//node r.js -o build.js
    paths:{
        'domready': '../../../../libraries/domready/domready',
				'text': '../../../../libraries/require/text',
				'jquery': '../../../jquery_update/replace/jquery/1.7/jquery.min',
				'jqueryui': '../../libraries/jqueryui/jquery-ui.min',
				'jquerycookie': '../../../../libraries/jquery.cookie/jquery.cookie',				
        'underscore': '../../../../libraries/underscore/underscore-min',
        'backbone': '../../../../libraries/backbone/backbone-min',
        'marionette': '../../../../libraries/marionette/backbone.marionette',				
				'si': '../../sentimage/js'
    },
    include: '../../../../libraries/require/require',
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
		},
    name: "sentimage.js",
    out: "si-built.js",
    preserveLicenseComments: false
})
