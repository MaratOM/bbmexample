//define(['jasmine-async', 'si/sentimage', 'si/models/sentimage', 'si/collections/sentimages', 'si/views/sentimage', 'si/views/sentimages'],
//	function(async, SiMain, SiModel, SiCollection, SiView, SiViews) {
define(['si/sentimage', 'si/models/sentimage', 'si/collections/sentimages', 'si/views/sentimage', 'si/views/sentimages'],
	function(SiMain, SiModel, SiCollection, SiView, SiViews) {
 
  return describe('Views :: Item and List behavior', function() {
 
    beforeEach(function () {

    });
 
		describe('sentimageModel', function() {
		    it('should create model', function() {
					var siModel = new SiModel();
		      expect(siModel.get('sentimageFid')).toEqual(0);
		    });
		  });
		
		describe('sentimageView', function() {
		    it('should add item view to the DOM', function() {
					$('#sandbox').append('<div class="si-view"></div>');					
					var siView = new SiView({model: new SiModel});
				  $('#sandbox .si-view').html(siView.render().el);
		      expect($('#sandbox .si-view li').size()).toEqual(1);
		    });
		  });		
		
		//describe('sentimageView', function() {
		//    it('should add list view to the DOM', function() {
		//			$('#sandbox').append('<div class="si-list"></div>');
		//			var models = [];
		//			var modelsQuantity = 5;
		//			for(var i = 0; i < modelsQuantity; i++) {
		//				models.push(new SiModel());
		//			}
		//			this.siCollection = new SiCollection(models);
		//			this.siViews = new SiViews({collection: this.siCollection});
		//			//this.siViews = new SiViews({collection: new SiCollection(), fullCollection: new SiCollection()});						
		//		  $('#sandbox .si-list').html(this.siViews.render().el);
		//      expect($('#sandbox .si-list li').size()).toEqual(modelsQuantity);
		//    });
		//  });
		
		//describe("Episode model", function() {
		//	beforeEach(function() {
		//		this.server = sinon.fakeServer.create();
		//	});
		//		
		//	afterEach(function() {
		//		this.server.restore();
		//	});
		//
		//	it("should fire the change event", function() {
		//		var callback = sinon.spy();
		//		
		//		// Set how the fake server will respond
		//		// This reads: a GET request for /episode/123 
		//		// will return a 200 response of type 
		//		// application/json with the given JSON response body
		//		this.server.respondWith("POST", "/sentimage/get-sentimages",
		//			[200, {"Content-Type": "application/json"},
		//			'[{"sentimageFid": "111"}, {"sentimageFid": "222"}]']);
		//
		//		//var episode = new Episode({id: 123});
		//		
		//
		//		//this.siViews = function() {};
		//		//this.siViews.initialize = function() {};
		//						//this.siViews.bind('initialize', callback);
		//		
		//		this.siViews = new SiViews({collection: new SiCollection(), fullCollection: new SiCollection()});
		//		
		//		// Bind to the change event on the model
		//		//episode.bind('change', callback);
		//		//this.siViews.bind('initialize', callback);
		//		this.siViews.collection.bind('reset', callback);
		//		
		//		// makes an ajax request to the server
		//		//episode.fetch(); 
		//		this.siViews.onRender();
		//		this.siViews.getSentimages();
		//		// Fake server responds to the request
		//		this.server.respond(); 
		//				
		//				
		//		// Expect that the spy was called with the new model
		//		//expect(callback.called).toBeTruthy();
		//		//console.log(callback.getCall(0))
		//		//console.log(callback.getCall(0).args[0].length)
		//		//expect(callback.getCall(0).args[0].attributes)
		//		//	.toEqual({
		//		//		id: 123,
		//		//		title: "Hollywood - Part 2"
		//		//	});
		//		
		//		expect(_.size(callback.getCall(0).args[0].models))
		//			.toEqual(2);				
		//						console.log(callback.getCall(0).args[0].models)
		//	});
		//
		//});
		
		describe("Sentimages view", function() {
			beforeEach(function() {
				this.server = sinon.fakeServer.create();
			});
				
			afterEach(function() {
				this.server.restore();
			});
		
			it("should fire the change event", function() {
				var callback = sinon.spy();
				
				// Set how the fake server will respond
				// This reads: a GET request for /episode/123 
				// will return a 200 response of type 
				// application/json with the given JSON response body
				this.server.respondWith("POST", "/sentimage/get-sentimages",
					[200, {"Content-Type": "application/json"},
					'[{"sentimageFid": "111"}, {"sentimageFid": "222"}]']);
		
				//var episode = new Episode({id: 123});
				

				//this.siViews = function() {};
				//this.siViews.initialize = function() {};
				//this.siViews.bind('initialize', callback);
				
				//this.siViews = {
				//	collection: new SiCollection()
				//};
				
				//this.siViews.collection.bind('reset', callback);
			
				this.siViews = new SiViews({collection: new SiCollection(), fullCollection: new SiCollection()});
				//_.extend(this.siViews, new SiViews({collection: new SiCollection(), fullCollection: new SiCollection()}));				


				// Bind to the change event on the model
				//episode.bind('change', callback);
				//this.siViews.bind('initialize', callback);
				this.siViews.collection.bind('reset', callback);
				
				// makes an ajax request to the server
				//episode.fetch();
				
				//this.siViews.onRender();
				//this.siViews.getSentimages();
				
				// Fake server responds to the request
				this.server.respond(); 
				
				console.log(this.siViews.collection)
						
				// Expect that the spy was called with the new model
				//expect(callback.called).toBeTruthy();
				//console.log(callback.getCall(0))
				//console.log(callback.getCall(0).args[0].length)
				//expect(callback.getCall(0).args[0].attributes)
				//	.toEqual({
				//		id: 123,
				//		title: "Hollywood - Part 2"
				//	});
				
				expect(_.size(callback.getCall(0).args[0].models))
					.toEqual(2);				
								console.log(callback.getCall(0).args[0].models)
			});
		
		});		
		
		
		//describe("an async spec", function(){
		// 
		//	beforeEach(function(){
		//		this.done = false;
		//		 
		//		function doStuff(){
		//		// simulate async stuff and wait 10ms
		//			setTimeout(function(){
		//				this.done = true;
		//			}, 100);
		//		}
		//		 
		//		runs(doStuff);
		//		 
		//		waitsFor(function(){
		//			return this.done;
		//		});
		//	});
		//	 
		//	it("did stuff", function(){
		//		expect(this.done).toBe(true);
		//	});
		// 
		//});
		
		//describe("an async spec", function(){
		//
		//	var foo = false,
		//			async = new async.AsyncSpec(this);
		//
		//	async.beforeEach(function(done){
		//
		//		// simulate async stuff and wait 10ms
		//		setTimeout(function(){
		//			foo = true;
		//			done();
		//		}, 10); 
		//
		//	});
		//
		//	it("did stuff", function(){
		//			expect(foo).toBe(true);
		//	});
		//
		//});		
		
		
 
  });
 
});