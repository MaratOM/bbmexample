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
		//		this.server.respondWith("POST", "/sentimage/sentimages",
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
			var collectionPrevLength = 0;
			
			beforeEach(function() {
				this.server = sinon.fakeServer.create();
				
				this.callback = sinon.spy();
				this.fakeData = [{"sentimageFid": "111"}, {"sentimageFid": "222"},
												{"sentimageFid": "333"}, {"sentimageFid": "444"},
												{"sentimageFid": "555"}, {"sentimageFid": "666"}];

				this.server.respondWith("GET", /\/sentimage\/sentimages\.*/,
					[200, {"Content-Type": "application/json"},
					JSON.stringify(this.fakeData)]);				
				
				this.siViews = new SiViews();
				this.siViews.collection.bind('reset', this.callback);

				this.server.respond();				
			});
				
			afterEach(function() {
				this.server.restore();
			});
			
			//it("fake server should return fake data", function() {
			//	//expect(_.size(callback.getCall(0).args[0].models)).toEqual(_.size(fakeData));
			//});			
		
			it("should populate collection", function() {
				expect(this.siViews.collection.length).toEqual(window.SiMain.sentimagesPerPage);
			});
			
			it("should populate fullCollection", function() {
				expect(this.siViews.fullCollection.length).toEqual(this.fakeData.length);
			});
			
			describe("Adding models on scrolling", function() {
				beforeEach(function() {
					var len = _.size(this.fakeData) / window.SiMain.sentimagesPerPage - window.SiMain.sentimagesPerPage;
					for(var i = 0; i < len; i++) {
						this.collectionPrevLength = this.siViews.collection.length;
						window.SiMain.Vent.trigger("scroll-effected", "down");
					}			
				});
					
				afterEach(function() {
				});			
				
				it("should add models on scrolling", function() {
					expect(this.siViews.collection.length).toEqual(this.collectionPrevLength + window.SiMain.sentimagesPerPage);					
				});
	
				it("should stop adding models on scrolling if all models from fullCollection added", function() {
						window.SiMain.Vent.trigger("scroll-effected", "down");
						window.SiMain.Vent.trigger("scroll-effected", "down");
						expect(this.siViews.collection.length).toEqual(this.fakeData.length);					
				});
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