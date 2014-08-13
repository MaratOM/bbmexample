define(['si/sentimage', 'si/models/sentimage', 'si/collections/sentimages', 'si/views/sentimage', 'si/views/sentimages', 'si/views/langs', 'si/views/search', 'si/views/searchby'],
	function(SiMain, SiModel, SiCollection, SiView, SiViews, LangsView, SearchView, SearchByView) {
 
  return describe('Views :: Sentimages Item and List behavior', function() {
		//window.SiMain.sentimagesPerPage = 2;
		this.sentimagesPerPage = 2;
    beforeEach(function () {
			//$('#sandbox').append('<div id="langs"></div><div id="is-funny"></div><div></div><div id="si-list"></div><form id="-sentimage-film-search-form"><span class="input-group"><input type="text" class="form-text" /></span></form>');	
    });
		
    afterEach(function () {
			//$('#sandbox').empty();	
    });		

		describe('SentimageView', function() {
		    it('should add item view to the DOM', function() {
					$('#sandbox').append('<div class="si-view"></div>');					
					var siView = new SiView({model: new SiModel});
				  $('#sandbox .si-view').html(siView.render().el);
		      expect($('#sandbox .si-view li').size()).toEqual(1);
		    });
		  });		
		
		describe("SentimagesView", function() {
			var collectionPrevLength = 0;
			var callback = sinon.spy();
			
			beforeEach(function() {
				this.server = sinon.fakeServer.create();
				this.fakeData = [];
				var min = 10, max = 50;
				var len = Math.floor(Math.random() * (max - min + 1)) + min;
				for(var i = 0; i < len; i++) {
					this.fakeData.push({sentimageFid: i});
				}

				this.server.respondWith("GET", /\/sentimage\/sentimages\.*/,
					[200, {"Content-Type": "application/json"},
					JSON.stringify(this.fakeData)]);
				
				this.server.respondWith("POST", "/sentimages/search",
					[200, {"Content-Type": "application/json"},
					'587']);				
				
				this.siViews = new SiViews();
				this.siViews.collection.bind('reset', this.callback);
				
					//this.searchView = new SearchView();
					//this.searchByView = new SearchByView();					

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
			
			//describe("Adding models on scrolling", function() {
			//	beforeEach(function() {
			//		var len = _.size(this.fakeData) / window.SiMain.sentimagesPerPage - window.SiMain.sentimagesPerPage;
			//		for(var i = 0; i < len; i++) {
			//			this.collectionPrevLength = this.siViews.collection.length;
			//			//window.SiMain.Vent.trigger("scroll-effected", "down");
			//			$(document).scrollTo(document.height - 100);
			//		}			
			//	});
			//		
			//	afterEach(function() {
			//	});			
			//	
			//	it("should add models on scrolling", function() {						
			//		expect(this.siViews.collection.length).toEqual(this.collectionPrevLength + window.SiMain.sentimagesPerPage);					
			//	});
			//
			//	it("should stop adding models on scrolling if all models from fullCollection added", function() {
			//			//window.SiMain.Vent.trigger("scroll-effected", "down");
			//			//window.SiMain.Vent.trigger("scroll-effected", "down");
			//			$(window).scrollTo(document.height);						
			//			expect(this.siViews.collection.length).toEqual(this.fakeData.length);					
			//	});
			//});			
			
			describe("Reseting collection", function() {
				beforeEach(function() {
					this.testMovieNid = 10;
					this.testSearchText = "Search text sample";
					window.SiMain.searchMovieNid = this.testMovieNid;
				});
					
				afterEach(function() {
					this.siViews.siCollectionChangedData.searchMovieNid = 0;					
					this.siViews.siCollectionChangedData.searchText = '';						
				});			
				
				it("should prepare correct data for server request", function() {
					this.siViews.getSentimages({searchText: this.testSearchText});
					
					expect(this.siViews.siCollectionChangedData.searchMovieNid).toEqual(this.testMovieNid);					
					expect(this.siViews.siCollectionChangedData.searchText).toEqual(this.testSearchText);					
				});
				
				it("clicking on button prepares correct data for server request", function() {
					var lang = 'ru';
					$('#langs a.btn[data-langs=' + lang + ']').trigger('click');					
				
					expect(this.siViews.siCollectionChangedData.language).toEqual(lang);					
				});
				
				it("inserting film title prepares correct data for server request", function() {
					$('#search-by a.btn[data-search-by=title]').trigger('click');					
					$('#-sentimage-film-search-form .form-text').val(this.testSearchText);
					$('#-sentimage-film-search-form #edit-submit').trigger('click');					

					expect(this.siViews.siCollectionChangedData.searchText).toBeFalsy();					
				});
				
				it("inserting filmsent words prepares correct data for server request", function() {
					$('#search-by a.btn[data-search-by=words]').trigger('click');					
					$('#-sentimage-film-search-form .form-text').val(this.testSearchText);
					$('#-sentimage-film-search-form #edit-submit').trigger('click');					
					console.log(document.height)
					expect(this.siViews.siCollectionChangedData.searchText).toEqual(this.testSearchText);					
				});					
			});			
		});		
  });
});