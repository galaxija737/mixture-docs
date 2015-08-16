var $sidenav = $("#sidenav");

jQuery(
	function ($) 
	{
		new Mixture.prettify();
		new Mixture.load();
	}
);

var Mixture = {

	prettify: function () {

		prettyPrint();

	}, // end: prettify

	load: function () {

		$("#page section").last().css("min-height",$sidenav.height());

		$sidenav.on("click", "a", function() {
			var prop = $(this).attr("href");
			$("html,body").animate({ scrollTop: $(prop).offset().top - 60 }, 600);
			return false;
		});

		var $sections = $('section'), 
		$navs = $('#sidenav ol li > a'),
		topsArray = $sections.map(function () { return $(this).position().top - 70; }).get(),
		len = topsArray.length - 1,
		currentIndex = 0;

		var getCurrent = function (top) {
			for (var i = 0, thelen = len; i < thelen; i++)
				if (top > topsArray[i] && top < topsArray[i + 1])
					return i;

			if (top > 500)
				return topsArray.length-1;

			return 0;
		};

		$(window).scroll(function (e) {
			var scrollTop = $(this).scrollTop(), checkIndex = getCurrent(scrollTop);

			if (checkIndex !== currentIndex) {
				currentIndex = checkIndex;

				if (currentIndex == undefined)
					currentIndex = len;

				$navs.eq(currentIndex).parent("li").addClass("selected").siblings(".selected").removeClass("selected");
				_current = $("nav li a.selected").attr("href");
			}
		});

	} // end: load

};

(function() {
	var fixedElement = $sidenav.offset(),
    scrolled = $(window).scroll(function() {
        var winScrolled = $(this).scrollTop();
        var width = $("#sidenav").width();
        if(winScrolled > fixedElement.top - 65)
            $sidenav.css({'position': 'fixed', 'top' : '65px', 'width': width + 'px' });
        else
            $sidenav.css({'position': 'static'});
    });
})()