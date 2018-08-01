temple.Banner = ( function(_super) { 

	__extends(banner, _super);

	function banner() {
		_super.call(this, arguments[0]);
	}

	banner.prototype.init = function() {
		this.chain(this.setupTimelines)
			.chain(this.show)
	}

	banner.prototype.setupTimelines = function() {

		this.mainTimeline = new TimelineMax({ paused: true });

		this.mainTimeline
			.add("start")
			.to($("#mm_logo"), 1, {opacity: 1})

		this.mainTimeline.play();
	}

	return banner;

})( temple.Template );