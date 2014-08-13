define(['si/sentimage', 'si/views/isfunny', 'si/views/langs', 'si/views/searchby'],
	function(SiMain, IsFunnyView, LangsView, SearchByView) {
 
  return describe('Views :: Buttons behavior', function() {
    beforeEach(function () {
			//$('#sandbox').append('<div id="langs"></div><div id="is-funny"></div><div></div><div id="si-list"></div><form id="-sentimage-film-search-form"><span class="input-group"><input type="text" class="form-text" /></span></form>');	
    });
		
    afterEach(function () {
			//$('#sandbox').empty();	
    });				
		
		describe("IsFunnyView", function() {
			beforeEach(function() {
				//this.isFunnyView = new IsFunnyView();
			});
				
			afterEach(function() {

			});
			
			it("click on button makes it active", function() {
				var btn = 'all';
				$('#is-funny a.btn[data-is-funny=' + btn + ']').trigger('click');
				expect($('#is-funny a.btn[data-is-funny=' + btn + ']').hasClass('active')).toEqual(true);
			});
			
			it("click on button makes other buttons of the group unactive", function() {
				var btns = ['all', 'yes', 'no'];
				var btn = 'no';
				$('#is-funny a.btn[data-is-funny=' + btn + ']').trigger('click');
				btns = _.without(btns, btn);
				_.each(btns, function(btn) {
					expect($('#is-funny a.btn[data-is-funny=' + btn + ']').hasClass('active')).toEqual(false);
				})
			});
		});
		
		describe("LangsView", function() {
			beforeEach(function() {
				//this.langsView = new LangsView();
			});
				
			afterEach(function() {
		
			});
			
			it("click on button makes it active", function() {
				var btn = 'all';
				$('#langs a.btn[data-langs=' + btn + ']').trigger('click');
				expect($('#langs a.btn[data-langs=' + btn + ']').hasClass('active')).toEqual(true);
			});
			
			it("click on button makes other buttons of the group unactive", function() {
				var btns = ['all', 'en', 'ru'];
				var btn = 'en';
				$('#langs a.btn[data-langs=' + btn + ']').trigger('click');
				btns = _.without(btns, btn);
				_.each(btns, function(btn) {
					expect($('#langs a.btn[data-langs=' + btn + ']').hasClass('active')).toEqual(false);
				})
			});
		});
		
		describe("SearchByView", function() {
			beforeEach(function() {
				//this.searchByView = new SearchByView();
			});
				
			afterEach(function() {
		
			});

			it("click on button makes it active", function() {
				var btn = 'title';
				$('#search-by a.btn[data-search-by=' + btn + ']').trigger('click');
				expect($('#search-by a.btn[data-search-by=' + btn + ']').hasClass('active')).toEqual(true);
			});
			
			it("click on button makes other buttons of the group unactive", function() {
				var btns = ['title', 'words'];
				var btn = 'words';
				$('#search-by a.btn[data-search-by=' + btn + ']').trigger('click');
				btns = _.without(btns, btn);
				_.each(btns, function(btn) {
					expect($('#search-by a.btn[data-search-by=' + btn + ']').hasClass('active')).toEqual(false);
				})
			});
		});			
  });
});