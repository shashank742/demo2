;
var VideoRotator = Class.create({
	initialize : function(moduleId, options) {
		var self = this;
		self._element = self._getElement();
		self._defaultOptions = {
			autoplay : AutoPlayOptions.OnlyOnDesktopSite,
			fullScreen : true,
			rotateSlides : true,
			_IosSliderSettings : {
				snapToChildren : true,
				snapSlideCenter : false,
				keyboardControls : true,
				responsiveSlides : true,
				navNextSelector : self._element.find(".big-slides-next"),
				navPrevSelector : self._element.find(".big-slides-prev"),
				navSlideSelector : self._element.find(".big-slides-selectors .item"),
				onSlideChange : self._slideChange,
				onSlideComplete : self._slideComplete
			},
			videoContainer : $("body"),
			width : 0,
			height : 0
		};
		self._initialize = function() {
			if (self._generated) {
				return
			}
			self._element = gts.$("#videoRotator_" + self.Id);
			self._element.containerBreakpoints();
			self._isRtl = gts.$("body").css("direction") == "rtl";
			if (self._element.length === 0) {
				return
			}
			self.defaultPlayerSettings = {
				sources : [],
				autoplay : self.Options.autoplay,
				fullScreen : self.Options.fullScreen,
				loop : false,
				width : self.Options.width,
				height : self.Options.height,
				volume : self.Options.volume
			};
			if (window.widgetVideoPlayerOverrides !== undefined) {
				self.defaultPlayerSettings = $.extend(self.defaultPlayerSettings, window.widgetVideoPlayerOverrides)
			}
			self._sliderElement = self._element.find(".iosSlider");
			self._slideCount = self._sliderElement.find(".item").length;
			if (self._isRtl) {
				self._reverseSlides()
			}
			if (self._sliderElement.length === 0) {
				return
			}
			if ((OnMobileDevice() && self._iosSliderLoaded() && ((gtsDeviceIs.ipad === true && self.Options.autoplay !== "DesktopAndTablets") || gtsDeviceIs.ipad === false))) {
				self._setIosSlider()
			} else {
				setTimeout(function() {
					self._setVideoPlayer()
				}, 2000)
			}
			var firstSlide = self._sliderElement.find(".item.current-slide");
			setTimeout(function() {
				firstSlide.removeClass("slide__on-top")
			}, 2200);
			self._setBigSlides();
			self._resizeSlideInfo();
			self._sliderElement.trigger("iosSliderInit", [self._sliderElement]);
			$(".scroll-down").click(function() {
				var pageHeader = $("#global_header").height();
				var nextEl = (self._element.parent().next().length === 1) ? self._element.parent().next() : self._element.parent().parent().next();
				if (nextEl.height() < 20) {
					nextEl = (nextEl.next().length === 1) ? nextEl.next() : nextEl.parent().next()
				}
				$("html,body").animate({
					scrollTop : nextEl.offset().top - pageHeader
				})
			});
			self._generated = true
		};
		self._reverseSlides = function() {
			var sliderStage = self._sliderElement.find(".slider");
			var firstSlide = sliderStage.find(".item.current-slide");
			firstSlide.addClass("slide__on-top");
			sliderStage.children().each(function(i, slide) {
				sliderStage.prepend(slide)
			});
			var sliderNav = gts.$(".big-slides-selectors .nav");
			sliderNav.children().each(function(i, slide) {
				sliderNav.prepend(slide)
			})
		};
		self._setIosSlider = function() {
			self._sliderElement.iosSlider(self.Options._IosSliderSettings)
		};
		self._setVideoPlayer = function() {
			var videoPlayerSettings = $.extend({}, self.defaultPlayerSettings);
			var slideVideoSrc = self._element.find("div.big-slides-selectors li.active").attr("data-src");
			if (slideVideoSrc !== undefined && slideVideoSrc != null && slideVideoSrc.length > 0) {
				videoPlayerSettings.sources = [{
					src : slideVideoSrc
				}]
			}
			var slidePosterSrc = self._sliderElement.find(".item.current-slide .img-bg").attr("data-src");
			if (slidePosterSrc !== undefined && slidePosterSrc != null && slidePosterSrc.length > 0) {
				videoPlayerSettings.poster = slidePosterSrc
			}
			self._videoPlayerElement = $("#" + self.Id + "_videoPlayer");
			self._videoPlayerElement.addClass("c-video-container");
			if (self._videoPlayerElement.length === 0) {
				self._videoPlayerElement = $('<div class="c-video-container">');
				$('<div class="video-player-wrapper">').attr("id", _.uniqueId("wrapper_" + self.Id + "_videoPlayer")).addClass(self.Options.fullScreen ? "is-fullscreen" : "").appendTo($("body")).append(self._videoPlayerElement)
			}
			self._videoPlayerElement.videoPlayer(videoPlayerSettings).on("playerReady", function() {
				self._videoPlayerElement.find(".videoplayer__controls__button--play").addClass("js-video-player__play-button");
				self._videoPlayerElement.find(".videoplayer__controls__button--pause").addClass("js-video-player__pause-button")
			}).on("ended", function() {
				if (self._slideCount > 1) {
					if (self.Options.rotateSlides) {
						var slideIndex = self._getNextSlide(self._isRtl);
						self._changeSlide(slideIndex)
					}
				} else {
					$(this).videoPlayer("Reset").videoPlayer("Play")
				}
			});
			self._sliderElement.find(".slider .item").hide();
			self._sliderElement.find(".slider .item .img-bg").hide();
			self._sliderElement.find(".slider .item.current-slide").show();
			self._sliderElement.find(".slider .item .imageContainer").click(function() {
				self._videoPlayerElement.videoPlayer("PlayerClicked")
			});
			stopAutoSlide();
			if (videoPlayerSettings.sources.length === 0) {
				changeSlideOnTimeout(self)
			}
			self._sliderElement.addClass("videoSlider");
			self._element.find(".big-slides-prev").click(self._goToPreviousSlide);
			self._element.find(".big-slides-next").click(self._goToNextSlide);
			self._element.find(".big-slides-selectors li").click(function() {
				self._changeSlide(gts.$(this).index())
			});
			window.setTimeout(function() {
				self._playCurrentVideo()
			}, 0)
		};
		self._goToPreviousSlide = function() {
			var slideIndex = self._getNextSlide(true);
			self._changeSlide(slideIndex)
		};
		self._goToNextSlide = function() {
			var slideIndex = self._getNextSlide();
			self._changeSlide(slideIndex)
		};
		self._getNextSlide = function(reverse) {
			var active = self._element.find(".big-slides-selectors li.active");
			var currentSlide = active.index();
			var totalSlides = active.siblings().size() + 1;
			if (reverse) {
				if (currentSlide === 0) {
					return totalSlides - 1
				}
				return currentSlide - 1
			} else {
				if (currentSlide === totalSlides - 1) {
					return 0
				}
				return currentSlide + 1
			}
		};
		self._changeSlide = function(slideIndex) {
			var curSlide = self._element.find(".slider .item.current-slide");
			curSlide.hide().removeClass("current-slide");
			var active = self._element.find(".big-slides-selectors li.active");
			active.removeClass("active");
			var bigSlide = active.parent().children(":eq(" + slideIndex + ")");
			var item = curSlide.parent().children(":eq(" + slideIndex + ")");
			bigSlide.addClass("active");
			item.show().addClass("current-slide");
			var videoPlayerSettings = $.extend({}, self.defaultPlayerSettings);
			var slideVideoSrc = bigSlide.attr("data-src");
			if (slideVideoSrc !== undefined && slideVideoSrc != null && slideVideoSrc.length > 0) {
				videoPlayerSettings.sources = [{
					src : slideVideoSrc
				}]
			}
			var slidePosterSrc = item.find(".img-bg").attr("data-src");
			if (slidePosterSrc !== undefined && slidePosterSrc != null && slidePosterSrc.length > 0) {
				videoPlayerSettings.poster = slidePosterSrc
			}
			self._videoPlayerElement.videoPlayer("ChangeSource", videoPlayerSettings);
			stopAutoSlide();
			if (slideVideoSrc === undefined || slideVideoSrc === "") {
				changeSlideOnTimeout(self)
			}
			window.setTimeout(function() {
				self._playCurrentVideo()
			}, 0)
		};
		self._playCurrentVideo = function() {
			var self = this;
			switch(self.Options.autoplay) {
				case"On":
					var autoPlay = true;
					break;
				case"DesktopAndTablets":
					var autoPlay = self._element.hasClass("js-break-large") || self._element.hasClass("js-break-desktop") || self._element.hasClass("js-break-tablet");
					break;
				case"OnlyOnDesktopSite":
					var autoPlay = self._element.hasClass("js-break-large") || self._element.hasClass("js-break-desktop");
					break;
				case"Off":
				default:
					var autoPlay = false;
					break
			}
			if (autoPlay) {
				self._videoPlayerElement.videoPlayer("Play")
			}
		};
		self._setBigSlides = function() {
			if (self._slideCount > 1) {
				$(".big-slides-prev, .big-slides-next").removeClass("hideNavigationArrows")
			} else {
				$(".big-slides-prev, .big-slides-next").hide()
			}
		};
		self._resizeSlideInfo = function() {
		};
		self._iosSliderLoaded = function() {
			if (gts.$.fn.iosSlider) {
				return true
			} else {
				return false
			}
		};
		self._slideChange = function(args) {
			self._element.find(".current-slide").removeClass("current-slide");
			self._element.children(".big-slides-selectors").find(".item").removeClass("active");
			self._element.children(".big-slides-selectors").find(".item:eq(" + (args.currentSlideNumber - 1) + ")").addClass("active")
		};
		self._slideComplete = function(args) {
			self._element.find(args.sliderObject).find(".item.current-slide").removeClass("current-slide");
			self._element.find(args.sliderObject).find(".item:eq(" + (args.currentSlideNumber - 1) + ")").addClass("current-slide");
			if (self.Options.rotateSlides) {
			}
		};
		self.Options = {};
		self.Id = moduleId;
		_.extend(self.Options, self._defaultOptions, options);
		_.extend(self.Options, self.Options._IosSliderSettings);
		self._generated = false;
		self._element = null;
		self._sliderElement = null
	},
	Initialize : function() {
		this._initialize()
	},
	_getElement : function() {
		return gts.$("#videoRotator_" + self.Id)
	}
});
var timeoutVar;
function changeSlideOnTimeout(self) {
	timeoutVar = setTimeout(function() {
		var slideIndex = self._getNextSlide(self._isRtl);
		self._changeSlide(slideIndex)
	}, 15000)
}

function stopAutoSlide() {
	clearTimeout(timeoutVar)
}

function gtsGetViewportInfo() {
	var e = window, a = "inner";
	if (!("innerWidth" in window)) {
		a = "client";
		e = document.documentElement || document.body
	}
	return {
		width : e[a + "Width"],
		height : e[a + "Height"]
	}
}

if ($(".videorotator_widget").length > 0) {
	$(function() {
		createPopupElement();
		$(".videorotator_widget_expand").click(function() {
			var video = $(this).closest(".videorotator_widget").find("video");
			$(".videorotator-popup").addClass("opened");
			$(".videorotator-popup .content video").attr("src", video.attr("src"));
			video.get(0).pause();
			updateControlButton($(this).closest(".videorotator_widget").find(".videorotator_widget_control"));
			$(".videorotator-popup .videorotator_widget_control").removeClass("play").addClass("pause")
		});
		$(".videorotator-popup-x, .videorotator-popup .videorotator_widget_collapse").click(function() {
			$(".videorotator-popup").removeClass("opened");
			$(this).closest(".videorotator-popup").find("video").attr("src", "")
		});
		$(".videorotator_widget_control").click(function() {
			toggleVideo($(this))
		});
		$(".videorotator_widget .videorotator_social").each(function() {
			var url = $(this).closest(".videorotator_widget").find("ul.nav li[data-src]").attr("data-src");
			var fbIframe = '<iframe src="http://www.facebook.com/plugins/like.php?href=' + url + '&amp;layout=button_count&amp;show_faces=false&amp;width=90&amp;action=like&amp;font=verdana" allowtransparency="false" style="border: medium none; overflow: hidden; width: 100px; height: 21px;margin: 10px 10px 0;" frameborder="0" scrolling="no">';
			var gpIframe = '<iframe src="https://plusone.google.com/_/+1/fastbutton?bsv&amp;size=medium&amp;hl=en-US&amp;url=' + url + '" allowtransparency="true" frameborder="0" scrolling="no" title="+1" style="width: 100px; height: 20px;margin: 10px 10px 0;"></iframe>';
			var twIframe = '<iframe id="tweet-button" allowtransparency="true" frameborder="0" scrolling="no" src="http://platform.twitter.com/widgets/tweet_button.html?via=marcus_christie&amp;text=' + url + '&amp;count=horizontal" style="width:100px; height:20px;margin: 10px 10px 0;"></iframe>';
			$(this).append(fbIframe);
			$(this).append(twIframe);
			$(this).append(gpIframe)
		});
		$(".videorotator_widget_share").mouseover(function() {
			$(this).find(".videorotator_social").addClass("opened")
		});
		$(".videorotator_widget_share").mouseout(function() {
			$(this).find(".videorotator_social").removeClass("opened")
		})
	});
	function createPopupElement() {
		var videoWidgetsContainer = $(".videorotator_widgets");
		if (videoWidgetsContainer.length < 1) {
			videoWidgetsContainer = $(".videorotator_widget:last-child").parent()
		}
		videoWidgetsContainer.append('<div class="videorotator-popup"><div class="content"><span class="videorotator-popup-x"></span><video src="" width="auto" height="auto" autoplay loop></video><div class="videorotator_widget_controls"><span class="videorotator_widget_control pause"></span><span class="videorotator_widget_collapse"></span></div></div></div>')
	}

	function updateControlButton(el) {
		var video = el.closest(".videorotator_widget").find("video");
		if (video.length < 1) {
			video = el.closest(".videorotator-popup").find("video")
		}
		if (video.length < 1) {
			return
		}
		if (video.get(0).paused) {
			el.removeClass("pause");
			el.addClass("play")
		} else {
			el.removeClass("play");
			el.addClass("pause")
		}
	}

	function toggleVideo(el) {
		var video = el.closest(".videorotator_widget").find("video");
		if (video.length < 1) {
			video = el.closest(".videorotator-popup").find("video")
		}
		if (video.length < 1) {
			return
		}
		if (video.get(0).paused) {
			video.get(0).play();
			updateControlButton(el)
		} else {
			video.get(0).pause();
			updateControlButton(el)
		}
	}

}
gts.$(document).ready(function() {
	var headerHeight = $("#global_header").outerHeight();
	var $scrollingDiv = $(".full-height .slide-info-pod");
	$(".full-height .slide-info-pod").css("top", headerHeight);
	$(window).scroll(function() {
		$scrollingDiv.stop(true, true).animate({
			marginTop : (-$(window).scrollTop()) + "px"
		}, "fast")
	})
});
var isMobileDevice = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	isMobileDevice = true
}
gtsDeviceIs = {
	desktop : !isMobileDevice,
	mobile : isMobileDevice,
	android : /Android/i.test(navigator.userAgent),
	iOS : /iP(ad|hone|od)/.test(navigator.userAgent),
	ipad : /iPad/i.test(navigator.userAgent),
	iphone : /iPhone/i.test(navigator.userAgent),
	ipod : /iPod/i.test(navigator.userAgent)
};
;;;/*
 * jQuery CheckboxTree
 *
 * @author Valerio Galano <v.galano@daredevel.it>
 *
 * @see http://checkboxtree.daredevel.it
 *
 * @version 0.5.2
 */
$.widget("daredevel.checkboxTree", {
	_allDescendantChecked : function(li) {
		return (li.find("li input:checkbox:not(:checked)").length == 0)
	},
	_initNode : function(li) {
		var tree = this;
		li._tree = this;
		if (this.options.collapsable) {
			if ($(li).is(":not(:has(ul))")) {
				$(li).prepend($("<span />"));
				tree._markAsLeaf($(li))
			}
			if ($(li).is(":has(ul):has(input:checkbox:checked)")) {
				$(li).prepend($("<span />"));
				tree.options.initializeChecked == "collapsed" ? tree.collapse($(li), true) : tree.expand($(li), true)
			}
			if ($(li).is(":has(ul):not(:has(input:checkbox:checked))")) {
				$(li).prepend($("<span />"));
				tree.options.initializeUnchecked == "collapsed" ? tree.collapse($(li), true) : tree.expand($(li), true)
			}
			if ($(li).is(".collapsed")) {
				if ($(li).hasClass("leaf")) {
					$(li).removeClass("leaf")
				}
				tree.collapse($(li), true)
			}
			$(li).children("span").bind("click", function() {
				var li = $(this).parents("li:first");
				if (li.hasClass("collapsed")) {
					tree.expand(li)
				} else {
					if (li.hasClass("expanded")) {
						tree.collapse(li)
					}
				}
			})
		}
		$(li).off("click").on("click", "> div > input:checkbox:not(:checked)", function() {
			var li = $(this).parents("li:first");
			tree.uncheck(li)
		});
		$(li).off("click").on("click", "> div > input:checkbox:checked", function() {
			var li = $(this).parents("li:first");
			tree.check(li)
		})
	},
	_create : function() {
		var t = this;
		this._tree = this;
		if (this.options.collapsable) {
			this.options.collapseAnchor = (this.options.collapseImage.length > 0) ? '<img src="' + this.options.collapseImage + '" />' : "";
			this.options.expandAnchor = (this.options.expandImage.length > 0) ? '<img src="' + this.options.expandImage + '" />' : "";
			this.options.leafAnchor = (this.options.leafImage.length > 0) ? '<img src="' + this.options.leafImage + '" />' : "";
			$(this.options.collapseAllElement).bind("click", function() {
				t.collapseAll()
			});
			$(this.options.expandAllElement).bind("click", function() {
				t.expandAll()
			});
			if (this.options.onUncheck.node == "collapse") {
				this.element.off("click").on("click", "input:checkbox:not(:checked)", function() {
					t.collapse($(this).parents("li:first"))
				})
			} else {
				if (this.options.onUncheck.node == "expand") {
					this.element.off("click").on("click", "input:checkbox:not(:checked)", function() {
						t.expand($(this).parents("li:first"))
					})
				}
			}
			if (this.options.onCheck.node == "collapse") {
				this.element.off("click").on("click", "input:checkbox:checked", function() {
					t.collapse($(this).parents("li:first"))
				})
			} else {
				if (this.options.onCheck.node == "expand") {
					this.element.off("click").on("click", "input:checkbox:checked", function() {
						t.expand($(this).parents("li:first"))
					})
				}
			}
		}
		this.element.find("li").each(function() {
			t._initNode(this)
		});
		this.element.addClass("ui-widget-daredevel-checkboxTree daredevel-tree");
		this.element.addClass("ui-widget ui-widget-content")
	},
	_checkAncestors : function(li) {
		li.parentsUntil(".ui-widget").filter("li").find("input:checkbox:first:not(:checked)").prop("checked", true).change()
	},
	_checkDescendants : function(li) {
		li.find("li input:checkbox:not(:checked)").prop("checked", true).change()
	},
	_checkOthers : function(li) {
		li.addClass("exclude");
		li.parents("li").addClass("exclude");
		li.find("li").addClass("exclude");
		$(this.element).find("li").each(function() {
			if (!$(this).hasClass("exclude")) {
				$(this).find("input:checkbox:first:not(:checked)").prop("checked", true).change()
			}
		});
		$(this.element).find("li").removeClass("exclude")
	},
	_destroy : function() {
		this.element.removeClass(this.options.cssClass);
		$.Widget.prototype.destroy.call(this)
	},
	_isRoot : function(li) {
		var parents = li.parentsUntil(".ui-widget-daredevel-checkboxTree");
		return 0 == parents.length
	},
	_markAsCollapsed : function(li) {
		if (this.options.expandAnchor.length > 0) {
			li.children("span").html(this.options.expandAnchor)
		} else {
			if (this.options.collapseUiIcon.length > 0) {
				li.children("span").removeClass(this.options.expandUiIcon).addClass("ui-icon " + this.options.collapseUiIcon)
			}
		}
		li.removeClass("expanded").addClass("collapsed")
	},
	_markAsExpanded : function(li) {
		if (this.options.collapseAnchor.length > 0) {
			li.children("span").html(this.options.collapseAnchor)
		} else {
			if (this.options.expandUiIcon.length > 0) {
				li.children("span").removeClass(this.options.collapseUiIcon).addClass("ui-icon " + this.options.expandUiIcon)
			}
		}
		li.removeClass("collapsed").addClass("expanded")
	},
	_markAsLeaf : function(li) {
		if (this.options.leafAnchor.length > 0) {
			li.children("span").html(this.options.leafAnchor)
		} else {
			if (this.options.leafUiIcon.length > 0) {
				li.children("span").addClass("ui-icon " + this.options.leafUiIcon)
			}
		}
		li.addClass("leaf")
	},
	_parentNode : function(li) {
		return li.parents("li:first")
	},
	_uncheckAncestors : function(li) {
		li.parentsUntil(".ui-widget").filter("li").find("input:checkbox:first:checked").prop("checked", false).change()
	},
	_uncheckDescendants : function(li) {
		li.find("li input:checkbox:checked").prop("checked", false).change()
	},
	_uncheckOthers : function(li) {
		li.addClass("exclude");
		li.parents("li").addClass("exclude");
		li.find("li").addClass("exclude");
		$(this.element).find("li").each(function() {
			if (!$(this).hasClass("exclude")) {
				$(this).find("input:checkbox:first:checked").prop("checked", false).change()
			}
		});
		$(this.element).find("li").removeClass("exclude")
	},
	check : function(li) {
		li.find("input:checkbox:first:not(:checked)").prop("checked", true).change();
		if (this.options.onCheck.others == "check") {
			this._checkOthers(li)
		} else {
			if (this.options.onCheck.others == "uncheck") {
				this._uncheckOthers(li)
			}
		}
		if (this.options.onCheck.descendants == "check") {
			this._checkDescendants(li)
		} else {
			if (this.options.onCheck.descendants == "uncheck") {
				this._uncheckDescendants(li)
			}
		}
		if (this.options.onCheck.ancestors == "check") {
			this._checkAncestors(li)
		} else {
			if (this.options.onCheck.ancestors == "uncheck") {
				this._uncheckAncestors(li)
			} else {
				if (this.options.onCheck.ancestors == "checkIfFull") {
					if (!this._isRoot(li) && this._allDescendantChecked(this._parentNode(li))) {
						this.check(this._parentNode(li))
					}
				}
			}
		}
	},
	checkAll : function() {
		$(this.element).find("input:checkbox:not(:checked)").prop("checked", true).change()
	},
	collapse : function(li, force) {
		if ((li.hasClass("collapsed") || (li.hasClass("leaf"))) && !force) {
			return
		}
		var t = this;
		li.children("ul").hide();
		setTimeout(function() {
			t._markAsCollapsed(li, t.options)
		}, t.options.collapseDuration);
		t._trigger("collapse", li, li)
	},
	collapseAll : function() {
		var t = this;
		$(this.element).find("li.expanded").each(function() {
			t.collapse($(this))
		})
	},
	expand : function(li, force) {
		if ((li.hasClass("expanded") || (li.hasClass("leaf"))) && !force) {
			return
		}
		var t = this;
		li.children("ul").show();
		setTimeout(function() {
			t._markAsExpanded(li, t.options)
		}, t.options.expandDuration);
		t._trigger("expand", li, li)
	},
	expandAll : function() {
		var t = this;
		$(this.element).find("li.collapsed").each(function() {
			t.expand($(this))
		})
	},
	uncheck : function(li) {
		li.find("input:checkbox:first:checked").prop("checked", false).change();
		if (this.options.onUncheck.others == "check") {
			this._checkOthers(li)
		} else {
			if (this.options.onUncheck.others == "uncheck") {
				this._uncheckOthers(li)
			}
		}
		if (this.options.onUncheck.descendants == "check") {
			this._checkDescendants(li)
		} else {
			if (this.options.onUncheck.descendants == "uncheck") {
				this._uncheckDescendants(li)
			}
		}
		if (this.options.onUncheck.ancestors == "check") {
			this._checkAncestors(li)
		} else {
			if (this.options.onUncheck.ancestors == "uncheck") {
				this._uncheckAncestors(li)
			}
		}
	},
	uncheckAll : function() {
		$(this.element).find("input:checkbox:checked").prop("checked", false).change()
	},
	addNode : function(attributes, parentLi, position) {
		var t = this;
		var li = this._buildNode(attributes);
		if ((undefined == parentLi) || 0 == parentLi.length) {
			this._attachNode($(li), undefined, position)
		} else {
			this._attachNode($(li), $(parentLi), position)
		}
		if (undefined != attributes.children) {
			$.each(attributes.children, function(value, key) {
				t.addNode(value, li)
			})
		}
		t._trigger("add", true, li)
	},
	_attachNode : function(li, parentLi, position) {
		if (undefined == parentLi) {
			var parent = this.element;
			this._attachLi(li, parent, position);
			this._initNode(li)
		} else {
			var parent = parentLi;
			this._attachLi(li, parent, position);
			parent.removeClass("leaf collapsed").addClass("expanded");
			this._initNode(li)
		}
	},
	_attachLi : function(li, parent, position) {
		var ul = parent.find("ul:first");
		if (ul.length) {
			if ((undefined == position) || (ul.children("li").length < position)) {
				ul.append(li)
			} else {
				ul.find("li:nth-child(" + position + "):first").before(li)
			}
		} else {
			ul = $("<ul />");
			parent.append(ul.append(li));
			if (ul.parents(".level3").length < 2) {
				ul.addClass("level3")
			}
		}
	},
	_buildNode : function(attributes) {
		var finalAttributes = $.extend(true, {}, this.options.defaultNodeAttributes, attributes);
		var label = $("<label/>", finalAttributes.label);
		var div = $("<div/>", finalAttributes.div);
		if (finalAttributes.input != null) {
			var input = $("<input/>", finalAttributes.input);
			div.append(input)
		}
		var li = $("<li/>", finalAttributes.li);
		div.append(label);
		li.append(div);
		return li
	},
	options : {
		collapsable : true,
		collapseAllElement : "",
		collapseDuration : 500,
		collapseEffect : "blind",
		collapseImage : "",
		collapseUiIcon : "ui-icon-triangle-1-e",
		expandAllElement : "",
		expandDuration : 500,
		expandEffect : "blind",
		expandImage : "",
		expandUiIcon : "ui-icon-triangle-1-se",
		initializeChecked : "expanded",
		initializeUnchecked : "expanded",
		leafImage : "",
		leafUiIcon : "",
		onCheck : {
			ancestors : "check",
			descendants : "check",
			node : "",
			others : ""
		},
		onUncheck : {
			ancestors : "",
			descendants : "uncheck",
			node : "",
			others : ""
		},
		defaultNodeAttributes : {
			label : {
				html : "new node"
			},
			li : {
				"class" : "leaf"
			},
			input : {
				type : "checkbox"
			}
		}
	}
});
;;;
var LocationTreeViewModuleBase = Class.create({
	initialize : function(initParams) {
		this._LocationsServiceModule = initParams.LocationsServiceModule;
		this._OngoingGetLocationChildrenRequest = null
	},
	Initialize : function(xslParams) {
		this._XSLParams = xslParams;
		this._SelectedLocations = this._XSLParams.SelectedLocations;
		this._locationHoverClass = "location__tree-item--hover";
		this._locationContainerSelector = "js-tree-location-container";
		this._locationTreeLoadingSelector = "#location_tree_loading";
		this._locationTreeRootsSelector = ".js-location-tree-root";
		this._ModuleEle = gts.$("#" + this._XSLParams.ModuleId);
		this._ModuleEle = gts.$("#" + this._XSLParams.ModuleId);
		this._TreeElement = gts.$(".js-location-tree", this._ModuleEle);
		this._Tree = this._CreateTreeInstance();
		this._Unbind();
		this._BindToExpandLocationEvent();
		this._BindToClickLocationEvent();
		this._ShowTreeChildren();
		this._setLocationContainerSameHeight()
	},
	_setLocationContainerSameHeight : function() {
		if (isResponsive && typeof $(".js-advanced-search-sameheight").sameHeight != "undefined") {
			$(".js-advanced-search-sameheight").sameHeight({
				masterElementSelector : ".js-advanced-search-sameheight-master",
				minWindowWidth : 768
			})
		}
	},
	_ShowTreeChildren : function() {
		this._TreeElement.find(this._locationTreeLoadingSelector).remove();
		this._TreeElement.find(this._locationTreeRootsSelector).show()
	},
	_CreateTreeInstance : function() {
		if (isResponsive) {
			return gts.$(this._TreeElement).checkboxTree({
				onCheck : {
					ancestors : "uncheck",
					descendants : "uncheck"
				},
				onUncheck : {
					ancestors : "uncheck"
				},
				expandEffect : "",
				expandDuration : 0,
				collapseEffect : "",
				collapseDuration : 0,
				collapseUiIcon : "daredevel-treecollapse-anchor icon icon-plus  u-text-size-xxs",
				expandUiIcon : "daredevel-treecollapse-anchor icon icon-minus u-text-size-xxs",
				initializeUnchecked : "expanded",
				initializeChecked : "expanded"
			})
		}
		return gts.$(this._TreeElement).checkboxTree({
			onCheck : {
				ancestors : "uncheck",
				descendants : "uncheck"
			},
			onUncheck : {
				ancestors : "uncheck"
			},
			expandEffect : "",
			expandDuration : 0,
			collapseEffect : "",
			collapseDuration : 0,
			collapseUiIcon : "daredevel-treecollapse-anchor icon icon-minus",
			expandUiIcon : "daredevel-treecollapse-anchor icon icon-plus",
			initializeUnchecked : "expanded",
			initializeChecked : "expanded"
		})
	},
	_Unbind : function() {
		gts.jQuery(this._TreeElement).off(RenoEventsNS + "." + this._XSLParams.ModuleId)
	},
	_BindToExpandLocationEvent : function() {
		var me = this;
		gts.$(this._TreeElement).on("checkboxtreeexpand" + RenoEventsNS + "." + me._XSLParams.ModuleId, function(event, element) {
			me._OnLocationExpanded(element)
		})
	},
	_BindToClickLocationEvent : function() {
		if (isResponsive) {
			var me = this;
			if (gts.deviceIs.iOS) {
				gts.$(".js-location-label, .checkbox__object:not(.js-location-label)", this._TreeElement).on("touchend." + me._XSLParams.ModuleId, function(event, element) {
					event.preventDefault();
					event.stopPropagation();
					var id = gts.$(this).attr("for");
					if ( typeof id != "undefined") {
						var realCheckbox = gts.$(this).closest(".c-checkbox").find(String.Format('[id="{0}"]', id));
						if (realCheckbox.length > 0) {
							realCheckbox.trigger("click")
						}
					}
				})
			}
		}
	},
	_OnLocationExpanded : function(element) {
		if (this._LocationHasChildrenInUi(element)) {
			return
		}
		this.GetLocationChildren(element)
	},
	_LocationHasChildrenInUi : function(treeElement) {
		return gts.$(treeElement).find("." + this._locationContainerSelector).length > 0
	},
	_AddLocationChildren : function(treeElement, childLocations, parent) {
		var me = this;
		gts.$.each(childLocations, function(i, childLocation) {
			me._AddLocationChild(treeElement, gts.$(childLocation), parent)
		})
	},
	CheckLocation : function(element) {
		alert("LocationTreeViewModuleBase.CheckLocation. Define override.")
	},
	_GetCheckedInputsFromTree : function() {
		return this._GetInputsFromTree().filter(":checked")
	},
	_GetInputsFromTree : function() {
		return gts.$(this._TreeElement).find("." + this._locationContainerSelector + " input")
	},
	_GetRegionIdsFromElements : function(elements) {
		var regionIds = gts.$(elements).map(function() {
			return gts.$(this).attr("regionid")
		}).get();
		var distinctIds = [];
		gts.$.each(regionIds, function(i, id) {
			if (gts.$.inArray(id, distinctIds) == -1) {
				distinctIds.push(id)
			}
		});
		return distinctIds
	},
	_AddLocationChild : function(treeElement, location, parent) {
		var markerData = this._ExtractMarkerDataFromLocation(location, parent);
		markerData.selected = (this._SelectedLocations == null) ? false : (gts.$.inArray(markerData.regionid, this._SelectedLocations) != -1);
		this._AddLocationChildToTree(treeElement, markerData);
		return markerData
	},
	_ExtractMarkerDataFromLocation : function(location, parent) {
		var markerData = {
			seo : location.attr("seo"),
			name : location.attr("name"),
			listingcount : location.attr("listingcount"),
			haschildren : location.attr("haschildren"),
			id : location.attr("idregion"),
			regionid : location.attr("idregion"),
			level : location.attr("level"),
			parentregionid : parent.attr("idregion"),
			searchname : location.attr("searchname"),
			iscustom : location.attr("iscustom")
		};
		return markerData
	},
	_AddLocationChildToTree : function(treeElement, markerData) {
		var attributes = this._GetLocationTreeNodeAttributes(markerData);
		this._Tree.checkboxTree("addNode", attributes, gts.$(treeElement));
		this._Tree.trigger("addNodeToSchoolDistrictsTree" + RenoEventsNS)
	},
	_GetLocationTreeNodeAttributes : function(markerData) {
		var attributes = {
			label : this._CreateLocationTreeNodeLabel(markerData),
			li : {
				containerfor : markerData.id,
				"class" : this._CreateLocationTreeNodeLiClass(markerData)
			},
			input : this._CreateLocationTreeNodeCheckboxAttribute(markerData)
		};
		return attributes
	},
	_CreateLocationTreeNodeSpanHtml : function(markerData) {
		var countText = markerData.listingcount > 0 ? String.Format("<span class='count'> ({0}) </span>", markerData.listingcount) : "";
		return String.Format("<span class='link-name js-location-label'>{0}</span>", markerData.name) + countText
	},
	_CreateLocationTreeNodeLabel : function(markerData) {
		return {
			id : markerData.seo,
			level : markerData.level,
			"class" : "location  checkbox__name",
			"for" : markerData.id,
			html : this._CreateLocationTreeNodeSpanHtml(markerData)
		}
	},
	_CreateLocationTreeNodeLiClass : function(markerData) {
		alert("LocationTreeViewModuleBase._CreateLocationTreeNodeLiClass. Define override.")
	},
	_CreateLocationTreeNodeCheckboxAttribute : function(markerData) {
		var inputAttr = {
			type : "checkbox",
			id : markerData.regionid,
			regionid : markerData.regionid,
			parentid : markerData.parentregionid,
			iscustom : markerData.iscustom,
			onclick : String.Format("{0}_Module.TreeView.CheckLocation(this)", this._XSLParams.ModuleId)
		};
		if (markerData.selected) {
			inputAttr.checked = "checked"
		}
		return inputAttr
	},
	_GetWidgetUrlParams : function(locationElement) {
		var location = locationElement.attr("id");
		var locationLevel = locationElement.attr("level");
		var searchName = locationElement.attr("searchname");
		if ( typeof (searchName) == "undefined") {
			searchName = null
		}
		var selectedLocations = "";
		if (this._SelectedLocations.length > 0) {
			selectedLocations = this._SelectedLocations.join(",")
		}
		var params = {
			Channel : this._XSLParams.Channel,
			Location : location,
			ServiceArea : this._XSLParams.ServiceArea,
			LocationLevel : locationLevel,
			SelectedLocations : selectedLocations,
			SearchName : searchName,
			SearchType : this._XSLParams.SearchType
		};
		return params
	},
	_GetWidgetUrl : function(locationElement) {
		return this._LocationsServiceModule.GetWidgetUrl(this._GetWidgetUrlParams(locationElement))
	},
	GetLocationChildren : function(treeElement) {
		var locationElement = gts.$(treeElement).find(".location:first");
		if (locationElement.length == 0) {
			alert("LocationTreeViewModule.GetLocationChildren: Could not find .location from incoming tree element.");
			return
		}
		var me = this;
		var locationSeo = locationElement.attr("id");
		var ajaxUrl = me._GetWidgetUrl(locationElement);
		var onBeforeSendCallback = function(jqXhr) {
			if (me._OngoingGetLocationChildrenRequest != null) {
				me._OngoingGetLocationChildrenRequest.abort()
			}
			me._OngoingGetLocationChildrenRequest = jqXhr
		};
		var onSuccessCallback = function(response) {
			me.ChildLocationsRetrievedCallback(locationSeo, treeElement, response)
		};
		var params = {
			Url : ajaxUrl,
			OnBeforeSend : onBeforeSendCallback,
			OnSuccess : onSuccessCallback
		};
		this._LocationsServiceModule.GetLocations(params)
	},
	ChildLocationsRetrievedCallback : function(locationSeo, treeElement, response) {
		var parent = gts.$(response).find("availablelocations").children("location");
		var childLocations = parent.children("location");
		if (childLocations.length == 0) {
			gts.$(treeElement).find("span.daredevel-treecollapse-anchor").hide()
		}
		this._AddLocationChildren(treeElement, childLocations, parent)
	},
	_GetTreeElementsForXSLParamsMarkerData : function() {
		var me = this;
		var inputs = this._GetInputsFromTree();
		var inputsForMarkerData = gts.$.grep(inputs, function(input) {
			var locationContainerEle = gts.$(input).closest("." + me._locationContainerSelector);
			var currentInputIsRoot = locationContainerEle.attr("containerfor") == gts.$(input).attr("regionid");
			if (currentInputIsRoot) {
				return true
			}
			return locationContainerEle.not(".collapsed").length > 0
		});
		return gts.$(inputsForMarkerData)
	}
});
;;;
var SchoolDistrictsWidget = {
	OpenEmbedded : function(widgetParams) {
		var self = this;
		var url = this._GetWidgetUrl(widgetParams);
		gts.$(widgetParams.TargetEle).html("<div id='schooldistrictsembeddedloader' class='school_districts_lpscontrol'><img class='school-district__loader' src='" + StaticResources + "/layouts/common/images/loader-small.gif'/></div>");
		window.DisplaySchoolDistrictsJSONCallback = function(data) {
			gts.$(widgetParams.TargetEle).html(gts.jQuery("<div />").append(data.mainwidgethandler["schooldistricts"]["html"]));
			gts.$(widgetParams.TargetEle).append(data.mainwidgethandler["schooldistricts"]["script"])
		};
		gts.jQuery.ajax({
			url : url + "/json-out?gts_datatype=jsonp",
			jsonpCallback : "DisplaySchoolDistrictsJSONCallback",
			type : "GET",
			dataType : "jsonp"
		});
		return true
	},
	OpenModal : function(widgetParams) {
		var url = this._GetWidgetUrl(widgetParams) + "/modal";
		var callback = function() {
			gts.$(document).trigger("SchoolDistricsModalLoaded" + RenoEventsNS)
		};
		ShowDialog(url, callback)
	},
	_GetWidgetUrl : function(widgetParams) {
		var url = currentWebsiteDomainWebRoot + SEOService.AddLanguage("widget/nowrapper/schooldistricts");
		if ( typeof (widgetParams.Layout) != "undefined" && widgetParams.Layout != null && widgetParams.Layout != "") {
			url += "/" + widgetParams.Layout + "-layout"
		}
		var seoQuery = SEOService.TrimSlashes(widgetParams.SeoQuery);
		if (seoQuery != "") {
			url += "/" + seoQuery
		}
		if ( typeof (widgetParams.SelectedState) != "undefined" && widgetParams.SelectedState != null && widgetParams.SelectedState != "") {
			url += "/" + widgetParams.SelectedState + "-servicearea"
		}
		return url
	}
};
;;;
var SchoolDistrictTreeViewModule = Class.create(LocationTreeViewModuleBase, {
	UncheckLocationById : function(id) {
		var ele = gts.$("input#" + id.replace(".", "\\."), this._TreeElement);
		gts.$(ele).prop("checked", false);
		this.CheckLocation(ele)
	},
	CheckLocation : function(element) {
		var schoolDistrictEle = gts.$(element);
		var selected = schoolDistrictEle.is(":checked");
		var regionId = schoolDistrictEle.attr("regionid");
		if (!selected) {
			var remainingSelectedLocations = gts.$.grep(this._SelectedLocations, function(id) {
				return id != regionId
			});
			if (remainingSelectedLocations.length == 0) {
				window.alert("Please select at least one school district");
				schoolDistrictEle.prop("checked", true);
				return
			} else {
				this._SelectedLocations = remainingSelectedLocations
			}
		} else {
			this._SelectedLocations.push(regionId)
		}
		var seo = schoolDistrictEle.attr("seo");
		if (selected) {
			var inputParent = schoolDistrictEle.closest(".js-tree-location-container") || schoolDistrictEle;
			var name = gts.$(".link-name", inputParent).html();
			this._TriggerAddSchoolDistrictRequest(seo, name);
			return
		}
		this._TriggerSchoolDistrictRemovedRequest(seo)
	},
	_TriggerMarkLocationCheckedEventRequest : function(regionId) {
		gts.$(document).trigger("MarkLocationCheckedEventRequest" + RenoEventsNS, {
			regionId : regionId
		})
	},
	_TriggerAddSchoolDistrictRequest : function(seo, name) {
		gts.$(document).trigger("SchoolDistrictAdded" + RenoEventsNS, {
			seo : seo,
			name : name
		})
	},
	_TriggerSchoolDistrictRemovedRequest : function(seo) {
		gts.$(document).trigger("SchoolDistrictRemoved" + RenoEventsNS, {
			seo : seo
		})
	},
	_GetTreeElementsForXSLParamsMarkerData : function() {
		return gts.$(this._TreeElement).find("." + this._locationContainerSelector + " input")
	},
	_CreateLocationTreeNodeLiClass : function(markerData) {
		var liClasses = "location " + this._locationContainerSelector + " ";
		if (markerData.level == "Neighborhood") {
			liClasses += "leaf"
		} else {
			liClasses += "collapsed "
		}
		return liClasses
	},
	_CreateLocationTreeNodeCheckboxAttribute : function($super, markerData) {
		if (markerData.level != "Neighborhood") {
			return null
		}
		var attribute = $super(markerData);
		attribute.seo = markerData.seo;
		return attribute
	},
	_CreateLocationTreeNodeSpanHtml : function(markerData) {
		return String.Format("<span class='link-name'>{0}</span>", markerData.name)
	}
});
;;;
SchoolDistrictTreeViewModule.addMethods({
	_ShowTreeChildren : function() {
		this._TreeElement.find(this._locationTreeLoadingSelector).remove();
		this._TreeElement.find(this._locationTreeRootsSelector).show();
		ResizeDialog();
		this._TreeElement.on("checkboxtreecollapse", function() {
			ResizeDialog()
		});
		this._TreeElement.on("checkboxtreeexpand", function() {
			ResizeDialog()
		});
		this._TreeElement.on("addNodeToSchoolDistrictsTree" + RenoEventsNS, function() {
			ResizeDialog()
		})
	},
	_CreateLocationTreeNodeCheckboxAttribute : function($super, markerData) {
		if (markerData.level != "Neighborhood") {
			return null
		}
		var attribute = $super(markerData);
		attribute.seo = markerData.seo;
		ResizeDialog();
		return attribute
	}
});
;;;
var LocationsServiceModuleBase = Class.create({
	initialize : function(params) {
		this.widgetTagName = params.widgetTagName
	},
	GetLocations : function(params) {
		gts.$.ajax({
			url : params.Url,
			beforeSend : function(jqXhr) {
				params.OnBeforeSend(jqXhr)
			},
			error : function(xmlHttpRequest, textStatus, errorThrown) {
				log.debug("LocationsServiceModule.GetLocations: Error Message: error(" + errorThrown + ') "' + textStatus + '"')
			},
			success : function(response) {
				params.OnSuccess(response)
			}
		})
	},
	GetWidgetUrl : function(params) {
		alert("LocationsServiceModuleBase.GetWidgetUrl. Define override.")
	},
	_GetChildLocationsSearchType : function(params) {
		alert("LocationsServiceModuleBase._GetChildLocationsSearchType. Define override.")
	}
});
;;;
var SchoolDistrictLocationsServiceModule = Class.create(LocationsServiceModuleBase, {
	GetWidgetUrl : function(params) {
		var selectedLocations = "";
		if (params.SelectedLocations != "") {
			selectedLocations = String.Format("/{0}-selectedlocations", params.SelectedLocations)
		}
		return currentWebsiteDomainWebRoot + SEOService.AddLanguage(String.Format("/widget/{0}/{1}/{2}-location/{3}-servicearea/{4}-search{5}/xml-out", this.widgetTagName, params.Channel, params.Location, params.ServiceArea, this._GetChildLocationsSearchType(params), selectedLocations))
	},
	_GetChildLocationsSearchType : function(params) {
		if (params.SearchName != null && params.SearchName != "") {
			return params.SearchName
		}
		switch(params.LocationLevel) {
			case"County":
				return "schooldistrictsbycounty";
			case"City":
				return "schooldistrictsbycity"
		}
		alert(String.Format("SchoolDistrictLocationsServiceModule._GetChildLocationsSearchType: No child searchtype available for location level {0}", level));
		return ""
	}
});
;;;
function SchoolDistrictsModule() {
	WidgetModuleBase.call()
}
SchoolDistrictsModule.prototype = new WidgetModuleBase();
SchoolDistrictsModule.prototype._seoPartPrefix = "/" + GetSeoPart(seoPartType.SchoolDistrict);
SchoolDistrictsModule.prototype._OnInitialize = function() {
	this._OnInitializeWidgetModuleBase();
	this._InitializeSelectedSchoolDistricts();
	this._LocationsServiceModule = new SchoolDistrictLocationsServiceModule({
		widgetTagName : "schooldistricts"
	});
	this._InitializeTreeview();
	this._CreateSelectedSchoolDistrictsContainer();
	this._BindToTreeviewEvents();
	this._BindToCommitButton();
	this._BindToCancelButton();
	this._SetSEOParam("servicearea", StringFormatEmpty("{0}-servicearea", gts.$("#school_district_state_opts", this._ModuleEle).val()));
	this._SetSEOParam("schoolDistrictSearch", this._GetChosenSchoolDistrictsSeoPart());
	this._InitializeSelectBoxIt()
};
SchoolDistrictsModule.prototype._ReloadContentJSTransformCallback = function() {
	BindCloseButton()
};
SchoolDistrictsModule.prototype._InitializeSelectedSchoolDistricts = function() {
	var me = this;
	this._selectedSchoolDistricts = new Array();
	gts.$.each(this._XSLParams.SelectedMarkerData, function(key, value) {
		me._selectedSchoolDistricts.push({
			seo : value.seo,
			name : value.name
		})
	})
};
SchoolDistrictsModule.prototype._InitializeTreeview = function() {
	if ( typeof (this.TreeView) == "undefined") {
		this.TreeView = new SchoolDistrictTreeViewModule({
			LocationsServiceModule : this._LocationsServiceModule
		})
	}
	this.TreeView.Initialize(this._XSLParams)
};
SchoolDistrictsModule.prototype._BindToTreeviewEvents = function() {
	var me = this;
	gts.$(document).on("SchoolDistrictAdded" + RenoEventsNS + "." + this.Id, function(ev, params) {
		me._AddSchoolDistrict(params)
	});
	gts.$(document).on("SchoolDistrictRemoved" + RenoEventsNS + "." + this.Id, function(ev, params) {
		me._RemoveSchoolDistrict(params)
	})
};
SchoolDistrictsModule.prototype._AddSchoolDistrict = function(params) {
	var foundIndex = this._GetIndexOfSchoolDistrictFromSelected(params.seo);
	if (foundIndex >= 0) {
		return
	}
	this._selectedSchoolDistricts.push({
		seo : params.seo,
		name : params.name
	});
	this._SetSEOParam("schoolDistrictSearch", this._GetChosenSchoolDistrictsSeoPart());
	this._AddSchoolDistrictToSelectedSchoolDistrictsContainer(params);
	if (this._ModuleEle.hasClass("school_districts_lpscontrol")) {
		this._TriggerSchoolDistrictsCheckedChangedRequest()
	}
};
SchoolDistrictsModule.prototype._RemoveSchoolDistrict = function(params) {
	var foundIndex = this._GetIndexOfSchoolDistrictFromSelected(params.seo);
	if (foundIndex < 0) {
		return
	}
	this._selectedSchoolDistricts.splice(foundIndex, 1);
	this._SetSEOParam("schoolDistrictSearch", this._GetChosenSchoolDistrictsSeoPart());
	this._RemoveSchoolDistrictFromSelectedSchoolDistrictsContainer(params);
	if (this._ModuleEle.hasClass("school_districts_lpscontrol")) {
		this._TriggerSchoolDistrictsCheckedChangedRequest()
	}
};
SchoolDistrictsModule.prototype._CreateSelectedSchoolDistrictsContainer = function() {
	this._selectedSchoolDistrictsContainer = gts.$(".js-selected-districts");
	if (this._selectedSchoolDistricts.length == 0) {
		this._selectedSchoolDistrictsContainer.addClass("is-empty");
		this._selectedSchoolDistrictsContainer.find(".js-selected-school-district-label").remove()
	}
};
SchoolDistrictsModule.prototype._AddSchoolDistrictToSelectedSchoolDistrictsContainer = function(params) {
	var exists = this._selectedSchoolDistrictsContainer.find(String.format('[data-seo="{0}"]', params.seo)).length;
	if (exists != 0) {
		return
	}
	var me = this;
	this._selectedSchoolDistrictsContainer.removeClass("is-empty");
	var selectedSchoolDistrictLabel = gts.$(String.Format('<div class="lpsw__school-district-item js-selected-school-district-label"><a class="lpsw__school-district-label  u-text-ellipsis" data-seo="{0}">{1}<span class="icon icon-close js-removeschooldistrict"></span></a></div>', params.seo, params.name));
	gts.$(".js-removeschooldistrict", selectedSchoolDistrictLabel).off("click").on("click", function(ev) {
		ev.stopPropagation();
		me._RemoveSchoolDistrict(params)
	});
	this._selectedSchoolDistrictsContainer.append(selectedSchoolDistrictLabel)
};
SchoolDistrictsModule.prototype._RemoveSchoolDistrictFromSelectedSchoolDistrictsContainer = function(params) {
	var currentSelectedItem = this._selectedSchoolDistrictsContainer.find(String.format('[data-seo="{0}"]', params.seo));
	if (currentSelectedItem.length <= 0) {
		return
	}
	gts.$(".locationchk[seo='" + params.seo + "']", this._ModuleEle).prop("checked", false);
	currentSelectedItem.remove();
	this._CreateSelectedSchoolDistrictsContainer()
};
SchoolDistrictsModule.prototype._GetIndexOfSchoolDistrictFromSelected = function(schoolDistrictSeo) {
	var existingIndex = -1;
	gts.$.grep(this._selectedSchoolDistricts, function(current, i) {
		if (schoolDistrictSeo == current.seo) {
			existingIndex = i
		}
	});
	return existingIndex
};
SchoolDistrictsModule.prototype._BindToCommitButton = function() {
	var me = this;
	$(".filter", this._ModuleEle).click(function() {
		me._Commit()
	})
};
SchoolDistrictsModule.prototype._BindToCancelButton = function() {
	var me = this;
	$(".simplemodal-close", this._Module).click(function() {
		me._Cancel()
	});
	$(".cancel", this._ModuleEle).click(function() {
		me._Cancel()
	});
	$(".js-modal-close", this._ModuleEle).click(function() {
		me._Cancel()
	})
};
SchoolDistrictsModule.prototype._Commit = function() {
	this._Close();
	this._TriggerSchoolDistrictsSelectedRequest()
};
SchoolDistrictsModule.prototype._Cancel = function() {
	this._Close();
	this._TriggerSchoolDistrictsModalSelectionCancelled()
};
SchoolDistrictsModule.prototype._Close = function() {
	if (isResponsive) {
		CloseDialog()
	} else {
		if ( typeof (gts.$.modal.close) != "function") {
			return
		}
		gts.$.modal.close()
	}
};
SchoolDistrictsModule.prototype._TriggerSchoolDistrictsModalSelectionCancelled = function() {
	gts.$(document).trigger("SchoolDistrictsModalSelectionCancelled" + RenoEventsNS, {
		schoolDistrictState : this._GetSEOParam("servicearea")
	})
};
SchoolDistrictsModule.prototype._TriggerSchoolDistrictsSelectedRequest = function() {
	gts.$(document).trigger("SchoolDistrictsModalSelectionCommitted" + RenoEventsNS, {
		schoolDistrictState : this._GetSEOParam("servicearea"),
		schoolDistrictsSeo : this._GetChosenSchoolDistrictsSeoPart(),
		schoolDistrictNames : this._GetChosenSchoolDistrictNames()
	})
};
SchoolDistrictsModule.prototype._GetChosenSchoolDistrictNames = function() {
	var selectedDistrictNames = new Array();
	gts.$.each(this._selectedSchoolDistricts, function() {
		selectedDistrictNames.push(this.name)
	});
	return selectedDistrictNames
};
SchoolDistrictsModule.prototype._GetChosenSchoolDistrictsSeoPart = function() {
	var seoPart = "";
	if (this._selectedSchoolDistricts.length > 0) {
		seoPart = this._seoPartPrefix
	}
	for (var i = 0; i < this._selectedSchoolDistricts.length; i++) {
		seoPart += "/" + this._selectedSchoolDistricts[i].seo
	}
	return seoPart
};
SchoolDistrictsModule.prototype._TriggerSchoolDistrictsCheckedChangedRequest = function() {
	gts.$(document).trigger("SchoolDistrictsModalCheckedChanged" + RenoEventsNS, {
		schoolDistrictState : this._GetSEOParam("servicearea"),
		schoolDistrictsSeo : this._GetChosenSchoolDistrictsSeoPart()
	})
};
SchoolDistrictsModule.prototype.ChangeState = function(stateSeo) {
	this._SetSEOParam("servicearea", StringFormatEmpty("{0}-servicearea", stateSeo));
	this._ReloadContent(this._BuildSEOPath(), false, true, undefined, true, false)
};
SchoolDistrictsModule.prototype.ChangeCounty = function(countySeo) {
	this._SetSEOParam("countyseo", StringFormatEmpty("{0}-countyseo", countySeo));
	this._ReloadContent(this._BuildSEOPath(), false, true, undefined, true, false)
};
SchoolDistrictsModule.prototype._BuildLoadDataPathWhenNoDataService = function(refinementPath) {
	var widgetPath = SEOService.AddLanguage(String.Format("/widget/nowrapper/{0}/{1}", this._XSLParams.ModuleTagName, refinementPath)) + "/xml-out";
	return SEOService.TrimSlashes(currentWebsiteDomainWebRoot) + "/" + SEOService.TrimSlashes(widgetPath)
};
SchoolDistrictsModule.prototype._InitializeSelectBoxIt = function() {
	if (isResponsive) {
		gts.$(".js-select-lpsw-school, .js-select-lpsw-county", this._ModuleEle).selectBoxIt({
			autoWidth : false,
			"native" : true
		})
	}
};
;;;
SchoolDistrictsModule.prototype._OnInitialize = function() {
	this._OnInitializeWidgetModuleBase();
	this._InitializeSelectedSchoolDistricts();
	this._LocationsServiceModule = new SchoolDistrictLocationsServiceModule({
		widgetTagName : "schooldistricts"
	});
	this._InitializeTreeview();
	this._CreateSelectedSchoolDistrictsContainer();
	this._BindToTreeviewEvents();
	this._BindToCommitButton();
	this._BindToCancelButton();
	this._SetSEOParam("servicearea", StringFormatEmpty("{0}-servicearea", gts.$("#school_district_state_opts", this._ModuleEle).val()));
	this._SetSEOParam("schoolDistrictSearch", this._GetChosenSchoolDistrictsSeoPart());
	this._InitializeSelectBoxIt();
	if ( typeof (ResizeDialog) === "function") {
		window.setTimeout(function() {
			ResizeDialog()
		}, 0)
	}
};
SchoolDistrictsModule.prototype._ReloadContentJSTransformCallback = function() {
};
;;;
var GoogleAPILoaderBase = Class.create({
	initialize : function() {
		this._IsLoaded = false;
		this._IsLoading = false;
		this._Callbacks = new Array()
	},
	ExecuteLoadCallbacks : function() {
		this._IsLoading = false;
		this._IsLoaded = true;
		var me = this;
		gts.$.each(this._Callbacks, function(i, callback) {
			me._ExecuteCallback(callback)
		});
		this._Callbacks.length = 0
	},
	_ExecuteCallback : function(callback) {
		if ( typeof (callback) != "function") {
			return
		}
		callback()
	},
	ExecuteOnLoad : function(callback) {
		if ( typeof (callback) != "function") {
			return
		}
		if (this._IsLoaded) {
			this._ExecuteCallback(callback);
			return
		}
		this._Callbacks.push(callback)
	},
	Load : function(callback) {
		if (this._IsLoaded) {
			this._ExecuteCallback(callback);
			return
		}
		this.ExecuteOnLoad(callback);
		if (this._IsLoading) {
			return
		}
		this._IsLoading = true;
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = this._GetAPIUrl();
		document.body.appendChild(script)
	},
	_GetAPIUrl : function() {
		var apiUrl = window.location.protocol + "//maps.google.com/maps/api/js?sensor=false&language=" + TwoLetterISOLanguageName;
		if (GoogleMapKey !== "") {
			apiUrl += "&key=" + GoogleMapKey
		}
		if (GoogleClientName !== "") {
			apiUrl += "&client=" + GoogleClientName
		}
		if (GoogleMapVersion !== "") {
			apiUrl += "&v=" + GoogleMapVersion
		}
		apiUrl += "&libraries=drawing";
		apiUrl += "&callback=GoogleMapsAPILoader.ExecuteLoadCallbacks";
		return apiUrl
	}
});
if ( typeof (window.GoogleMapsAPILoader) == "undefined") {
	window.GoogleMapsAPILoader = new GoogleAPILoaderBase()
}
var GoogleMapsAPILoader = window.GoogleMapsAPILoader;
if ( typeof (window.GoogleVisualizationAPILoader) == "undefined") {
	window.GoogleVisualizationAPILoader = new GoogleAPILoaderBase()
}
var GoogleVisualizationAPILoader = window.GoogleVisualizationAPILoader;
GoogleVisualizationAPILoader._GetAPIUrl = function() {
	var apiUrl = window.location.protocol + "//www.google.com/jsapi";
	apiUrl += "?callback=GoogleVisualizationAPILoader.ExecuteLoadCallbacks";
	return apiUrl
};
;;;
var NumberFormatting = NumberFormatting || {};
NumberFormatting.NumberFormatterBase = Class.create({
	_defaultOptions : {},
	initialize : function(options) {
		this._options = gts.$.extend({}, this._defaultOptions, options);
		this._regionSettings = typeof (DisplayCurrency_CultureCode) != "undefined" ? gts.$.formatCurrency.regions[DisplayCurrency_CultureCode] : {};
		this._invalidInputResponse = ""
	},
	_IsValidInput : function(value) {
		return typeof (value) != "undefined" && value != null && value != ""
	},
	FormatNumber : function(value) {
		return "Define FormatNumber override."
	},
	ToNumber : function(value) {
		value = this._CleanUpValue(value);
		if (!this._IsValidInput(value)) {
			return this._invalidInputResponse
		}
		return this._ToNumberTypeWithoutClean(value)
	},
	RoundNumber : function(number) {
		var response;
		if (!this._IsValidInput(number)) {
			response = 0
		} else {
			if (number >= 10000000) {
				response = ((number / 1000000).toFixed(2) * 1000000)
			} else {
				if (number >= 1000000) {
					response = ((number / 1000000).toFixed(2) * 1000000)
				} else {
					if (number >= 10000) {
						response = ((number / 1000).toFixed(2) * 1000)
					} else {
						if (number >= 1000) {
							response = ((number / 1000).toFixed(2) * 1000)
						} else {
							response = number
						}
					}
				}
			}
		}
		return Number(response.toFixed(2))
	},
	_FormatDecimalsForNumber : function(formattedValue) {
		var trailingZeroRegex = new RegExp("(\\" + this._regionSettings.decimalSymbol + "[0]+?)$", "gi");
		formattedValue = formattedValue.replace(trailingZeroRegex, "");
		return formattedValue
	},
	_HasDecimals : function(number) {
		return number % 1 != 0
	},
	_CleanUpValue : function(value) {
		if ( typeof (value) == "number") {
			return this.DecimalSymbolToDisplayFormat(value)
		}
		if ( typeof (value) == "undefined" || value == null) {
			return this._invalidInputResponse
		}
		value = value.toString().trim();
		if (value == "") {
			return this._invalidInputResponse
		}
		var allowedCharsRegex = new RegExp("[^0-9\\" + this._regionSettings.decimalSymbol + "]", "gi");
		value = value.replace(allowedCharsRegex, "");
		return value
	},
	ConvertToDecimalPointNumber : function(value) {
		var region = gts.$.formatCurrency.regions[DisplayCurrency_CultureCode];
		return parseFloat(value.replace(region.decimalSymbol, "."))
	},
	DecimalSymbolToDisplayFormat : function(number) {
		var region = gts.$.formatCurrency.regions[DisplayCurrency_CultureCode];
		return number.toString().replace(".", region.decimalSymbol)
	}
});
;;;
var NumberFormatting = NumberFormatting || {};
NumberFormatting.NumberFormatterType = {
	Price : "price",
	PriceTest : "pricetest",
	Default : "default"
};
NumberFormatting.NumberFormatterFactory = {
	GetNumberFormatter : function(numberFormatterType, options) {
		if (!options) {
			options = {}
		}
		switch(numberFormatterType) {
			case NumberFormatting.NumberFormatterType.Price:
				return new NumberFormatting.PriceNumberFormatter(options);
			case NumberFormatting.NumberFormatterType.PriceTest:
				options.useDefaultNumberAbbreviationPrefixValues = true;
				return new NumberFormatting.PriceNumberFormatter(options);
			default:
				return new NumberFormatting.DefaultNumberFormatter(options)
		}
	}
};
;;;
var NumberFormatting = NumberFormatting || {};
NumberFormatting.DefaultNumberFormatter = Class.create(NumberFormatting.NumberFormatterBase, {
	initialize : function($super, options) {
		this._className = "DefaultNumberFormatter";
		$super(options)
	},
	FormatNumber : function(value) {
		value = this._CleanUpValue(value);
		if (!this._IsValidInput(value)) {
			return this._invalidInputResponse
		}
		var number = this._ToNumberTypeWithoutClean(value);
		var formatSettings = gts.$.extend({}, this._regionSettings, {
			positiveFormat : "%n",
			symbol : "",
			region : "",
			AbbreviateNumber : false
		});
		var dummyDiv = gts.$("<div/>");
		dummyDiv.html(number);
		gts.$(dummyDiv).formatCurrency(formatSettings);
		var formattedValue = dummyDiv.html().toUpperCase();
		formattedValue = this._FormatDecimals(formattedValue);
		return formattedValue
	},
	_FormatDecimals : function(formattedValue) {
		return this._FormatDecimalsForNumber(formattedValue)
	},
	_ToNumberTypeWithoutClean : function(value) {
		var region = gts.$.formatCurrency.regions[DisplayCurrency_CultureCode];
		var digitGroupSymbolReplaceRegex = new RegExp(region.digitGroupSymbol.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "g");
		value = value.replace(digitGroupSymbolReplaceRegex, "");
		value = this.ConvertToDecimalPointNumber(value);
		value = this.DecimalSymbolToDisplayFormat(value);
		return value
	}
});
;;;
var NumberFormatting = NumberFormatting || {};
NumberFormatting.PriceNumberFormatter = Class.create(NumberFormatting.NumberFormatterBase, {
	_abbreviationPrefixCollection : {
		billion : "B",
		million : "M",
		thousand : "K"
	},
	_defaultOptions : gts.$.extend({
		addCurrencySymbolInFormatNumber : true
	}, NumberFormatting.NumberFormatterBase._defaultOptions),
	initialize : function($super, options) {
		this._className = "PriceNumberFormatter";
		$super(gts.$.extend({}, this._defaultOptions, options));
		this._numberFormatLimit = 100000;
		if (options.useDefaultNumberAbbreviationPrefixValues) {
			this._abbreviationPrefixCollection.billion = "B";
			this._abbreviationPrefixCollection.million = "M";
			this._abbreviationPrefixCollection.thousand = "K"
		}
	},
	FormatNumber : function(value, formatSettingOverrides) {
		value = this._CleanUpValue(value);
		if (!this._IsValidInput(value)) {
			return this._invalidInputResponse
		}
		var number = this._ToNumberTypeWithoutClean(value);
		if (!formatSettingOverrides) {
			formatSettingOverrides = {}
		}
		var formatSettings = gts.$.extend({}, this._regionSettings, {
			positiveFormat : "%n",
			region : "",
			AbbreviateNumber : this._GetAbbreviateNumber(number)
		}, formatSettingOverrides);
		var dummyDiv = gts.$("<div/>");
		dummyDiv.html(number);
		gts.$(dummyDiv).formatCurrency(formatSettings);
		var formattedValue = dummyDiv.html().toUpperCase();
		formattedValue = this._FormatDecimals(formattedValue);
		if (this._options.addCurrencySymbolInFormatNumber) {
			return PriceRangeUtility.AddCurrencySymbol(formattedValue)
		}
		return formattedValue
	},
	_FormatDecimals : function(formattedValue) {
		var endsWithKiloMegaRegexMatch = this._GetEndsWithKiloMegaRegexMatch(formattedValue);
		if (!endsWithKiloMegaRegexMatch) {
			return this._FormatDecimalsForNumber(formattedValue)
		}
		return this._FormatDecimalsForKiloMegaSuffix(formattedValue)
	},
	_FormatDecimalsForKiloMegaSuffix : function(formattedValue) {
		var trailingZeroRegex = new RegExp("([0-9]+(.[0-9]+[1-9])?)(.?0+)((" + this._abbreviationPrefixCollection.billion + ")|(" + this._abbreviationPrefixCollection.million + ")|(" + this._abbreviationPrefixCollection.thousand + "))$", "gi");
		formattedValue = formattedValue.replace(trailingZeroRegex, "$1$4");
		return formattedValue
	},
	_ToNumberTypeWithoutClean : function(value) {
		var region = gts.$.formatCurrency.regions[DisplayCurrency_CultureCode];
		var endsWithKiloMegaRegexMatch = this._GetEndsWithKiloMegaRegexMatch(value);
		var digitGroupSymbolReplaceRegex = new RegExp(region.digitGroupSymbol.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "g");
		value = value.replace(digitGroupSymbolReplaceRegex, "");
		if (!endsWithKiloMegaRegexMatch) {
			value = this.ConvertToDecimalPointNumber(value);
			value = this.DecimalSymbolToDisplayFormat(value);
			return value
		} else {
			value = value.replace(endsWithKiloMegaRegexMatch, "");
			return this._ToNumberTypeFromKiloMega(value, region, endsWithKiloMegaRegexMatch[0].toUpperCase())
		}
	},
	_ToNumberTypeFromKiloMega : function(valueWithoutSuffix, region, suffix) {
		var number = this.ConvertToDecimalPointNumber(valueWithoutSuffix);
		switch(suffix) {
			case this._abbreviationPrefixCollection.thousand:
				number = number * 1000;
				break;
			case this._abbreviationPrefixCollection.million:
				number = number * 1000000;
				break;
			case this._abbreviationPrefixCollection.billion:
				number = number * 1000000000;
				break
		}
		return this.DecimalSymbolToDisplayFormat(number)
	},
	_GetEndsWithKiloMegaRegexMatch : function(value) {
		var endsWithKiloMegaRegex = new RegExp("((" + this._abbreviationPrefixCollection.billion + ")|(" + this._abbreviationPrefixCollection.million + ")|(" + this._abbreviationPrefixCollection.thousand + "))$", "gi");
		return value.match(endsWithKiloMegaRegex)
	},
	_GetAbbreviateNumber : function(number) {
		if (isNaN(number)) {
			return false
		}
		if (number < this._numberFormatLimit) {
			return false
		}
		return true
	},
	_CleanUpValue : function(value) {
		if ( typeof (value) == "number") {
			return this.DecimalSymbolToDisplayFormat(value)
		}
		if (!value) {
			return this._invalidInputResponse
		}
		value = value.toString().trim();
		if (value === "") {
			return this._invalidInputResponse
		}
		var hasNumbersRegex = new RegExp("[0-9]", "gi");
		if (!value.match(hasNumbersRegex)) {
			return this._invalidInputResponse
		}
		value = value.replace(this._regionSettings.symbol, "").trim();
		var allowedCharsRegex = new RegExp("(?:[0-9\\" + this._regionSettings.decimalSymbol + "]|" + this._abbreviationPrefixCollection.billion + "|" + this._abbreviationPrefixCollection.million + "|" + this._abbreviationPrefixCollection.thousand + ")", "gi");
		value = value.match(allowedCharsRegex).join("");
		var trailingNumbersRegex = new RegExp("(" + this._abbreviationPrefixCollection.billion + "|" + this._abbreviationPrefixCollection.million + "|" + this._abbreviationPrefixCollection.thousand + ")(.*$)", "gi");
		value = value.replace(trailingNumbersRegex, "$1");
		return value
	},
	RoundNumber : function($super, number) {
		return Number($super(number).toFixed(0))
	}
});
;;;
var PriceRangeUtility = {
	FormatRangeOpts : function(rangeOpts) {
		var newRangeOpts = rangeOpts.slice();
		newRangeOpts = this._AddCurrencySymbolToRangeOpts(newRangeOpts);
		return newRangeOpts
	},
	_AddCurrencySymbolToRangeOpts : function(rangeOpts) {
		var me = this;
		gts.$.each(rangeOpts, function(i, opt) {
			opt[0] = me.AddCurrencySymbol(opt[0])
		});
		return rangeOpts
	},
	AddCurrencySymbol : function(value) {
		if ( typeof (value) == "undefined" || value == null || value == "" || value == "0") {
			return 0
		}
		var hasNumbersRegex = new RegExp("[0-9]", "gi");
		if (value.match(hasNumbersRegex) == null) {
			return value
		}
		var region = gts.$.formatCurrency.regions[DisplayCurrency_CultureCode];
		if (value.indexOf(region.symbol) > -1) {
			return value
		}
		var formattedValue = region.positiveFormat;
		formattedValue = formattedValue.replace(/%s/g, region.symbol);
		formattedValue = formattedValue.replace(/%n/g, value);
		return formattedValue
	}
};
;;;
var RangeUtility = {
	IfNoMatchReturn : {
		None : "none",
		First : "first",
		Last : "last"
	},
	GetOptionByValue : function(value, rangeOpts) {
		var index = RangeUtility.GetOptionIndexByValue(value, rangeOpts, RangeUtility.IfNoMatchReturn.None);
		if (index >= 0) {
			return rangeOpts[index]
		}
		return null
	},
	GetOptionByTitle : function(title, rangeOpts, rangeOptItemsAreArrays) {
		if ( typeof (rangeOptItemsAreArrays) == "undefined") {
			rangeOptItemsAreArrays = true
		}
		var index = RangeUtility.GetOptionIndexByTitle(title, rangeOpts, RangeUtility.IfNoMatchReturn.None, rangeOptItemsAreArrays);
		if (index >= 0) {
			return rangeOpts[index]
		}
		return null
	},
	GetOptionIndexByTitle : function(title, options, ifNoMatchReturn, rangeOptItemsAreArrays) {
		if ( typeof (rangeOptItemsAreArrays) == "undefined") {
			rangeOptItemsAreArrays = true
		}
		for (var x = 0; x < options.length; x++) {
			var currentIndexVal = rangeOptItemsAreArrays ? options[x][0] : options[x];
			if (title.toLowerCase() == currentIndexVal.toLowerCase()) {
				return x
			}
		}
		switch(ifNoMatchReturn) {
			case this.IfNoMatchReturn.First:
				return 0;
			case this.IfNoMatchReturn.Last:
				return options.length - 1;
			default:
				return -1
		}
	},
	GetOptionIndexByValue : function(val, options, ifNoMatchReturn) {
		for (var x = 0; x < options.length; x++) {
			var currentIndexVal = options[x][1];
			if (parseFloat(val) == parseFloat(currentIndexVal)) {
				return x
			}
		}
		switch(ifNoMatchReturn) {
			case this.IfNoMatchReturn.First:
				return 0;
			case this.IfNoMatchReturn.Last:
				return options.length - 1;
			default:
				return -1
		}
	},
	AddOption : function(option, options) {
		if ( typeof (option) == "undefined" || option == null) {
			return options
		}
		for (var x = 0; x < options.length; x++) {
			var currentIndexVal = options[x][1];
			if (parseFloat(option[1]) == parseFloat(currentIndexVal)) {
				return options
			}
			if (parseFloat(currentIndexVal) > parseFloat(option[1])) {
				options.splice(x, 0, option);
				return options
			}
		}
		return options
	},
	GetOption : function(opts, index) {
		var option = {
			Name : opts[index][0],
			Value : opts[index][1],
			IsMin : index == 0,
			IsMax : index == opts.length - 1
		};
		return option
	}
};
;;;
var SizeUtility = {
	_AcreToHectareRatio : 0.40468564224,
	_SqFtToSqMRatio : 0.09290304000000001,
	AcresToHectares : function(acres) {
		if (isNaN(acres)) {
			return 0
		} else {
			var ha = acres * this._AcreToHectareRatio;
			return Math.round(ha * 100) / 100
		}
	},
	HectaresToAcres : function(hectares) {
		if (isNaN(hectares)) {
			return 0
		} else {
			var acres = hectares / this._AcreToHectareRatio;
			return Math.round(acres * 100) / 100
		}
	},
	SqFeetToSqMeters : function(sqFt) {
		if (isNaN(sqFt)) {
			return 0
		} else {
			var sqM = sqFt * this._SqFtToSqMRatio;
			return Math.round(sqM * 100) / 100
		}
	},
	SqMetersToSqFeet : function(sqM) {
		if (isNaN(sqM)) {
			return 0
		} else {
			var sqFt = sqM / this._SqFtToSqMRatio;
			return Math.round(sqFt * 100) / 100
		}
	},
	ExteriorSize : {
		FormatRangeOpts : function(rangeOpts, params) {
			var newRangeOpts = rangeOpts.slice();
			if (WebsiteDefaultUnitSystem == "Imperial") {
				return newRangeOpts
			}
			var maxIndex = newRangeOpts.length - 1;
			var hasNumbersRegex = new RegExp("[0-9]", "gi");
			gts.$.each(newRangeOpts, function(i, opt) {
				if ((i == 0 || i == maxIndex) && opt[0].match(hasNumbersRegex) == null) {
					return
				}
				var newTitle = SizeUtility.AcresToHectares(opt[1]);
				newTitle = params.formatter.RoundNumber(newTitle);
				newTitle = params.formatter.DecimalSymbolToDisplayFormat(newTitle);
				newTitle = params.formatter.FormatNumber(newTitle);
				opt[0] = newTitle
			});
			return newRangeOpts
		}
	},
	InteriorSize : {
		FormatRangeOpts : function(rangeOpts, params) {
			var newRangeOpts = rangeOpts.slice();
			if (WebsiteDefaultUnitSystem == "Imperial") {
				return newRangeOpts
			}
			var maxIndex = newRangeOpts.length - 1;
			var hasNumbersRegex = new RegExp("[0-9]", "gi");
			gts.$.each(newRangeOpts, function(i, opt) {
				if ((i == 0 || i == maxIndex) && opt[0].match(hasNumbersRegex) == null) {
					return
				}
				var newTitle = SizeUtility.SqFeetToSqMeters(opt[1]);
				newTitle = params.formatter.RoundNumber(newTitle);
				newTitle = params.formatter.DecimalSymbolToDisplayFormat(newTitle);
				newTitle = params.formatter.FormatNumber(newTitle);
				opt[0] = newTitle
			});
			return newRangeOpts
		}
	}
};
;;;
RangeTextBoxesBase = Class.create({
	_fieldType : {
		Min : "min",
		Max : "max",
	},
	initialize : function(options) {
		this._options = options;
		this._minTextBox = gts.$(".minField", this._options.containerEle);
		this._maxTextBox = gts.$(".maxField", this._options.containerEle);
		this._SetHasUi();
		if (!this._hasUi) {
			return
		}
		this._eventNS = "." + this._className + "RangeTextBoxes" + RenoEventsNS;
		this._formatter = this._options.formatter;
		this._SetRangeOpts();
		this._onChangeCallback = this._options.onChangeCallback;
		this._minLimitOption = this._rangeOpts[0];
		this._maxLimitOption = this._rangeOpts[this._rangeOpts.length - 1];
		this.SetValues(this._options.minNum, this._options.maxNum);
		this._BindToEvents()
	},
	_SetHasUi : function() {
		this._hasUi = this._options.containerEle.length > 0 && this._minTextBox.length > 0 && this._maxTextBox.length > 0
	},
	_SetRangeOpts : function() {
		this._rangeOpts = this._options.rangeOpts.slice()
	},
	_BindToEvents : function() {
		this._UnbindTextBoxEvents();
		this._SetTextBoxFocusEventHandler(this._minTextBox);
		this._SetTextBoxFocusEventHandler(this._maxTextBox);
		this._SetTextBoxBlurEventHandler(this._minTextBox, this._fieldType.Min);
		this._SetTextBoxBlurEventHandler(this._maxTextBox, this._fieldType.Max);
		this._SetTextBoxKeyUpEventHandler(this._minTextBox, this._fieldType.Min);
		this._SetTextBoxKeyPressEventHandler(this._minTextBox, this._fieldType.Min);
		this._SetTextBoxKeyUpEventHandler(this._maxTextBox, this._fieldType.Max);
		this._SetTextBoxKeyPressEventHandler(this._maxTextBox, this._fieldType.Max)
	},
	_InitMinNumber : function(num) {
		this._minNum = num;
		this._minDisplayNum = this._minNum
	},
	_InitMaxNumber : function(num) {
		this._maxNum = num;
		this._maxDisplayNum = this._maxNum
	},
	_UnbindTextBoxEvents : function() {
		gts.$(this._minTextBox).unbind(this._eventNS);
		gts.$(this._maxTextBox).unbind(this._eventNS)
	},
	_SetTextBoxFocusEventHandler : function(textbox) {
		var title = textbox.prop("title").trim();
		textbox.bind("focus" + this._eventNS, function() {
			if (gts.$(this).val() == title) {
				gts.$(this).val("")
			}
		})
	},
	_SetTextBoxBlurEventHandler : function(textbox, fieldType) {
		var me = this;
		textbox.bind("blur" + this._eventNS, function() {
			var ele = gts.$(this);
			me._OnChange(ele, fieldType)
		})
	},
	_SetTextBoxKeyUpEventHandler : function(textbox, fieldType) {
		var me = this;
		textbox.bind("keyup" + this._eventNS, function(e) {
			if (e.keyCode == 13) {
				var ele = gts.$(this);
				me._OnChange(ele, fieldType)
			}
		})
	},
	_SetTextBoxKeyPressEventHandler : function(textbox, fieldType) {
		var me = this;
		textbox.bind("keypress" + this._eventNS, function(e) {
			if (e.keyCode == 13) {
				var ele = gts.$(this);
				me._OnChange(ele, fieldType)
			}
		})
	},
	_OnChange : function(ele, fieldType) {
		var me = this;
		if (fieldType == this._fieldType.Min) {
			this._OnMinChange(ele, function(num) {
				me._InitMaxNumber(num)
			})
		} else {
			this._OnMaxChange(ele, function(num) {
				me._InitMinNumber(num)
			})
		}
		this._onChangeCallback(this.GetValuesAsOptions())
	},
	_OnMinChange : function(ele, maxReinitializer) {
		var value = ele.val();
		var displayNum = Number(this._formatter.ConvertToDecimalPointNumber(this._formatter.ToNumber(value)));
		var numToUse;
		if (isNaN(displayNum)) {
			numToUse = this._minLimitOption[1]
		} else {
			numToUse = this._GetAsStorageNum(displayNum)
		}
		displayNum = this._formatter.RoundNumber(displayNum);
		var formattedTitle = this._formatter.FormatNumber(displayNum);
		var option = this._GetOptionByValue(numToUse);
		option = option == null ? this._GetOptionByTitle(formattedTitle) : option;
		if (option != null) {
			numToUse = option[1];
			formattedTitle = option[0]
		} else {
			if (numToUse < this._minLimitOption[1]) {
				numToUse = this._minLimitOption[1];
				formattedTitle = this._minLimitOption[0]
			} else {
				if (numToUse > this._maxLimitOption[1]) {
					numToUse = this._maxLimitOption[1];
					formattedTitle = this._maxLimitOption[0]
				}
			}
		}
		if (numToUse > this._maxNum) {
			maxReinitializer(this._maxLimitOption[1])
		}
		this._minNum = numToUse;
		if (this._PossiblySetTitleAttrsAsValuesIfNoRange(this._minNum, this._maxNum)) {
			return
		}
		if (this._maxNum == this._maxLimitOption[1]) {
			this._maxTextBox.val(this._maxLimitOption[0])
		}
		ele.val(formattedTitle)
	},
	_OnMaxChange : function(ele, minReinitializer) {
		var value = ele.val();
		var displayNum = Number(this._formatter.ConvertToDecimalPointNumber(this._formatter.ToNumber(value)));
		var numToUse;
		if (isNaN(displayNum)) {
			numToUse = this._maxLimitOption[1]
		} else {
			numToUse = this._GetAsStorageNum(displayNum)
		}
		displayNum = this._formatter.RoundNumber(displayNum);
		var formattedTitle = this._formatter.FormatNumber(displayNum);
		var option = this._GetOptionByValue(numToUse);
		option = option == null ? this._GetOptionByTitle(formattedTitle) : option;
		if (option != null) {
			numToUse = option[1];
			formattedTitle = option[0]
		} else {
			if (numToUse > this._maxLimitOption[1]) {
				numToUse = this._maxLimitOption[1];
				formattedTitle = this._maxLimitOption[0]
			} else {
				if (numToUse < this._minLimitOption[1]) {
					numToUse = this._minLimitOption[1];
					formattedTitle = this._minLimitOption[0]
				}
			}
		}
		if (numToUse < this._minNum) {
			minReinitializer(this._minLimitOption[1])
		}
		this._maxNum = numToUse;
		if (this._PossiblySetTitleAttrsAsValuesIfNoRange(this._minNum, this._maxNum)) {
			return
		}
		if (this._minNum == this._minLimitOption[1]) {
			this._minTextBox.val(this._minLimitOption[0])
		}
		ele.val(formattedTitle)
	},
	_SetTitleAttrAsValue : function(ele) {
		var title = ele.prop("title").trim();
		ele.val(title)
	},
	_GetOptionByValue : function(value) {
		return RangeUtility.GetOptionByValue(value, this._rangeOpts)
	},
	_GetOptionByTitle : function(title) {
		return RangeUtility.GetOptionByTitle(title, this._rangeOpts)
	},
	_InitTextBoxValue : function(num, displayNum, ele) {
		var option = this._GetOptionByValue(num);
		if (option != null) {
			ele.val(option[0]);
			return
		}
		var formattedTxtVal = this._formatter.FormatNumber(displayNum);
		ele.val(formattedTxtVal)
	},
	SetValues : function(min, max) {
		if (!this._hasUi) {
			return
		}
		this._InitMinNumber(min);
		this._InitMaxNumber(max);
		if (this._PossiblySetTitleAttrsAsValuesIfNoRange(this._minNum, this._maxNum)) {
			return
		}
		this._InitTextBoxValue(this._minNum, this._minDisplayNum, this._minTextBox);
		this._InitTextBoxValue(this._maxNum, this._maxDisplayNum, this._maxTextBox)
	},
	_PossiblySetTitleAttrsAsValuesIfNoRange : function(min, max) {
		if (min != this._minLimitOption[1] || max != this._maxLimitOption[1]) {
			return false
		}
		this._SetTitleAttrAsValue(this._minTextBox);
		this._SetTitleAttrAsValue(this._maxTextBox);
		return true
	},
	Reset : function() {
		if (!this._hasUi) {
			return
		}
		this.SetValues(this._minLimitOption[1], this._maxLimitOption[1])
	},
	GetValuesAsOptions : function() {
		return {
			min : [this._minTextBox.val(), this._minNum],
			max : [this._maxTextBox.val(), this._maxNum],
			minAndMaxAreAtLimits : this._MinAndMaxAreAtLimits()
		}
	},
	_MinAndMaxAreAtLimits : function() {
		return this._minNum == this._minLimitOption[1] && this._maxNum == this._maxLimitOption[1]
	},
	_GetAsStorageNum : function(displayNum) {
		return this._formatter.RoundNumber(displayNum)
	}
});
;;;
DefaultRangeTextBoxes = Class.create(RangeTextBoxesBase, {
	initialize : function($super, options) {
		this._className = "DefaultRangeTextBoxes";
		$super(options)
	}
});
;;;
RangeTextBoxesType = {
	Price : "price",
	InteriorSize : "interiorsize",
	ExteriorSize : "exteriorsize",
};
var RangeTextBoxesFactory = {
	GetRangeTextBoxes : function(params) {
		switch(params.type) {
			case RangeTextBoxesType.Price:
				return new PriceRangeTextBoxes(params);
			case RangeTextBoxesType.InteriorSize:
				if (WebsiteDefaultUnitSystem == "Imperial") {
					return new DefaultRangeTextBoxes(params)
				} else {
					return new SqMRangeTextBoxes(params)
				}
			case RangeTextBoxesType.ExteriorSize:
				if (WebsiteDefaultUnitSystem == "Imperial") {
					return new DefaultRangeTextBoxes(params)
				} else {
					return new HectaresRangeTextBoxes(params)
				}
			default:
				return new DefaultRangeTextBoxes(params)
		}
	}
};
;;;
HectaresRangeTextBoxes = Class.create(RangeTextBoxesBase, {
	initialize : function($super, options) {
		this._className = "HectaresRangeTextBoxes";
		$super(options)
	},
	_SetRangeOpts : function() {
		this._rangeOpts = SizeUtility.ExteriorSize.FormatRangeOpts(this._options.rangeOpts, {
			formatter : this._formatter
		})
	},
	_InitMinNumber : function(num) {
		this._minNum = num;
		this._minDisplayNum = this._AcresToHectares(this._minNum)
	},
	_InitMaxNumber : function(num) {
		this._maxNum = num;
		this._maxDisplayNum = this._AcresToHectares(this._maxNum)
	},
	_GetAsStorageNum : function(displayNum) {
		return Math.round(this._formatter.RoundNumber(this._HectaresToAcres(displayNum)))
	},
	_AcresToHectares : function(acres) {
		return SizeUtility.AcresToHectares(acres)
	},
	_HectaresToAcres : function(hectares) {
		return SizeUtility.HectaresToAcres(hectares)
	}
});
;;;
PriceRangeTextBoxes = Class.create(RangeTextBoxesBase, {
	initialize : function($super, options) {
		this._className = "PriceRangeTextBoxes";
		$super(options)
	},
	_SetRangeOpts : function() {
		this._rangeOpts = PriceRangeUtility.FormatRangeOpts(this._options.rangeOpts)
	},
	_InitMinNumber : function(num) {
		this._minNum = num;
		this._minDisplayNum = CurrencyFormatter.ConvertToDisplayCurrency(this._minNum)
	},
	_InitMaxNumber : function(num) {
		this._maxNum = num;
		this._maxDisplayNum = CurrencyFormatter.ConvertToDisplayCurrency(this._maxNum)
	},
	_GetAsStorageNum : function(displayNum) {
		return Math.round(this._formatter.RoundNumber(CurrencyFormatter.ConvertToUsd(displayNum)))
	}
});
;;;
SqMRangeTextBoxes = Class.create(RangeTextBoxesBase, {
	initialize : function($super, options) {
		this._className = "SqMRangeTextBoxes";
		$super(options)
	},
	_SetRangeOpts : function() {
		this._rangeOpts = SizeUtility.InteriorSize.FormatRangeOpts(this._options.rangeOpts, {
			formatter : this._formatter
		})
	},
	_InitMinNumber : function(num) {
		this._minNum = num;
		this._minDisplayNum = this._SqFeetToSqMeters(this._minNum)
	},
	_InitMaxNumber : function(num) {
		this._maxNum = num;
		this._maxDisplayNum = this._SqFeetToSqMeters(this._maxNum)
	},
	_GetAsStorageNum : function(displayNum) {
		return Math.round(this._formatter.RoundNumber(this._SqMetersToSqFeet(displayNum)))
	},
	_SqFeetToSqMeters : function(sqFt) {
		return SizeUtility.SqFeetToSqMeters(sqFt)
	},
	_SqMetersToSqFeet : function(sqM) {
		return SizeUtility.SqMetersToSqFeet(sqM)
	}
});
;;;
RangeSliderBase = Class.create({
	initialize : function(options) {
		this._options = options;
		this._SetHasUi();
		if (!this._hasUi) {
			return
		}
		var me = this;
		this._options = gts.$.extend({
			min : 0,
			max : options.rangeOpts.length - 1,
			getMinValueHandler : function(index) {
				return RangeUtility.GetOption(me._rangeOpts, index).Value
			},
			getMaxValueHandler : function(index) {
				return RangeUtility.GetOption(me._rangeOpts, index).Value
			},
			slideHandler : function(ui) {
				me._SetValuesToLabel(ui.values);
				me._SetValueToAlternateLabel(ui.values);
				me._options.onSlide(RangeUtility.GetOption(me._rangeOpts, ui.values[0]).Value, RangeUtility.GetOption(me._rangeOpts, ui.values[1]).Value)
			}
		}, this._options);
		this._formatter = this._options.formatter;
		this._SetRangeOpts();
		this._sliderEle = this._options.selector;
		this._valueLabelEle = gts.$(String.Format("#{0}-amount", this._options.selectorPrefix), this._options.sliderContext);
		this._alternateValueLabelEle = gts.$(String.Format("#{0}-amount-alternate", this._options.selectorPrefix), this._options.sliderContext);
		this._SetupSlider();
		this._SetValuesToLabel(this._sliderEle.slider("values"));
		this._SetValueToAlternateLabel(this._sliderEle.slider("values"))
	},
	_SetHasUi : function() {
		this._hasUi = this._options.selector.length > 0
	},
	_SetRangeOpts : function() {
		this._rangeOpts = this._options.rangeOpts.slice()
	},
	_SetupSlider : function() {
		var me = this;
		this._sliderEle.slider({
			orientation : "horizontal",
			step : 1,
			range : true,
			min : this._options.min,
			max : this._options.max,
			values : [this._GetValueIndex(this._options.currentmin, this._rangeOpts, RangeUtility.IfNoMatchReturn.First), this._GetValueIndex(this._options.currentmax, this._rangeOpts, RangeUtility.IfNoMatchReturn.Last)],
			slide : function(event, ui) {
				me._options.slideHandler(ui)
			},
			stop : function(event, ui) {
				var currentLowerLimit = me._options.currentmin;
				var currentUpperLimit = me._options.currentmax;
				var selectedLowerLimit = me._options.getMinValueHandler(ui.values[0]);
				var selectedUpperimit = me._options.getMaxValueHandler(ui.values[1]);
				if (currentLowerLimit == selectedLowerLimit && currentUpperLimit == selectedUpperimit) {
					return
				}
				me._options.currentmin = selectedLowerLimit;
				me._options.currentmax = selectedUpperimit;
				if (me._options.currentmin == me._options.getMinValueHandler(0) && me._options.currentmax == me._options.getMaxValueHandler(me._rangeOpts.length - 1)) {
					me._options.stopIsResettingHandler();
					return
				}
				me._options.stopHandler(me._options.currentmin, me._options.currentmax)
			}
		}).addClass("handle")
	},
	reset : function() {
		if (!this._hasUi) {
			return
		}
		this._ResetSlider();
		this._SetValuesToLabel(this._sliderEle.slider("values"));
		this._SetValueToAlternateLabel(this._sliderEle.slider("values"))
	},
	_ResetSlider : function() {
		this._sliderEle.slider({
			values : [0, this._rangeOpts.length - 1]
		})
	},
	_SetValuesToLabel : function(values) {
		var formattedValue = this._GetValueForLabel(values);
		this._valueLabelEle.text(formattedValue)
	},
	_GetValueForLabel : function(values) {
		var minOption = RangeUtility.GetOption(this._rangeOpts, values[0]);
		var maxOption = RangeUtility.GetOption(this._rangeOpts, values[1]);
		var minOptionText;
		if (minOption.IsMin) {
			minOptionText = minOption.Value
		} else {
			minOptionText = minOption.Name
		}
		var maxOptionText;
		if (maxOption.IsMin) {
			maxOptionText = maxOption.Value
		} else {
			maxOptionText = maxOption.Name
		}
		return minOptionText + "-" + maxOptionText
	},
	_SetValueToAlternateLabel : function(values) {
		var formattedValue = this._GetValueForAlternateLabel(values);
		this._alternateValueLabelEle.text(formattedValue)
	},
	_GetValueIndex : function(val, options, ifNoMatchReturn) {
		return RangeUtility.GetOptionIndexByValue(val, options, ifNoMatchReturn)
	},
	SetValues : function(newMinOption, newMaxOption) {
		if (!this._hasUi) {
			return
		}
		RangeUtility.AddOption(newMinOption, this._rangeOpts);
		RangeUtility.AddOption(newMaxOption, this._rangeOpts);
		this._sliderEle.slider("option", "max", this._rangeOpts.length - 1);
		var newMinOptionIndex = this._GetValueIndex(newMinOption[1], this._rangeOpts, RangeUtility.IfNoMatchReturn.First);
		var newMaxOptionIndex = this._GetValueIndex(newMaxOption[1], this._rangeOpts, RangeUtility.IfNoMatchReturn.Last);
		this._sliderEle.slider("values", 0, newMinOptionIndex);
		this._sliderEle.slider("values", 1, newMaxOptionIndex);
		this._SetValuesToLabel(this._sliderEle.slider("values"));
		this._SetValueToAlternateLabel(this._sliderEle.slider("values"))
	},
	GetValuesAsOptions : function() {
		var values = this._sliderEle.slider("values");
		var min = RangeUtility.GetOption(this._rangeOpts, values[0]);
		var max = RangeUtility.GetOption(this._rangeOpts, values[1]);
		return {
			min : [min.Name, min.Value],
			max : [max.Name, max.Value]
		}
	}
});
;;;
var AcresMin = 0;
var AcresMax = 20;
var AcresRangeOpts = new Array();
ExteriorSizeRangeSlider = Class.create(RangeSliderBase, {
	initialize : function($super, xslParams, options) {
		this._className = "ExteriorSizeRangeSlider";
		$super(xslParams, options)
	},
	_GetValueForAlternateLabel : function(values) {
		var minOption = RangeUtility.GetOption(this._rangeOpts, values[0]);
		var maxOption = RangeUtility.GetOption(this._rangeOpts, values[1]);
		var minOptionText;
		if (minOption.IsMax) {
			minOptionText = minOption.Name
		} else {
			minOptionText = this._formatter.FormatNumber(this._AcresToHectares(minOption.Value))
		}
		var maxOptionText;
		if (maxOption.IsMax) {
			maxOptionText = maxOption.Name
		} else {
			maxOptionText = this._formatter.FormatNumber(this._AcresToHectares(maxOption.Value))
		}
		return minOptionText + "-" + maxOptionText
	},
	_AcresToHectares : function(acres) {
		return SizeUtility.AcresToHectares(acres)
	}
});
;;;
var PriceMin = 0;
var PriceMax = 999000000;
var PriceRangeOpts = new Array();
PriceRangeSlider = Class.create(RangeSliderBase, {
	initialize : function($super, xslParams, options) {
		this._className = "PriceRangeSlider";
		$super(xslParams, options)
	},
	_SetRangeOpts : function() {
		this._rangeOpts = PriceRangeUtility.FormatRangeOpts(this._options.rangeOpts)
	},
	_GetValueForLabel : function(values) {
		var minOption = RangeUtility.GetOption(this._rangeOpts, values[0]);
		var maxOption = RangeUtility.GetOption(this._rangeOpts, values[1]);
		var minOptionText;
		if (minOption.IsMin) {
			minOptionText = minOption.Value
		} else {
			minOptionText = minOption.Name
		}
		var maxOptionText;
		if (maxOption.IsMin) {
			maxOptionText = maxOption.Value
		} else {
			maxOptionText = maxOption.Name
		}
		var priceString = minOptionText + "-" + maxOptionText;
		return priceString
	},
	_GetValueForAlternateLabel : function(values) {
	},
	_SetValueToAlternateLabel : function(values) {
	},
});
;;;
var SqFtMin = 0;
var SqFtMax = 10000;
var SqFtRangeOpts = new Array();
InteriorSizeRangeSlider = Class.create(RangeSliderBase, {
	initialize : function($super, xslParams, options) {
		this._className = "InteriorSizeRangeSlider";
		$super(xslParams, options)
	},
	_GetValueForAlternateLabel : function(values) {
		var minOption = RangeUtility.GetOption(this._rangeOpts, values[0]);
		var maxOption = RangeUtility.GetOption(this._rangeOpts, values[1]);
		var minOptionText;
		if (minOption.IsMax) {
			minOptionText = minOption.Name
		} else {
			minOptionText = this._formatter.FormatNumber(this._SqFeetToSqMeters(minOption.Value))
		}
		var maxOptionText;
		if (maxOption.IsMax) {
			maxOptionText = maxOption.Name
		} else {
			maxOptionText = this._formatter.FormatNumber(this._SqFeetToSqMeters(maxOption.Value))
		}
		var metersRange = minOptionText + "-" + maxOptionText;
		return metersRange
	},
	_SqFeetToSqMeters : function(sqFt) {
		return SizeUtility.SqFeetToSqMeters(sqFt)
	}
});
;;;
var lpsconfig = {};
var PriceRangeOpts = new Array();
var RadiusOpts = new Array();
var PersistSearchLocation = "";
var PersistSearchLocationSeo = "";
var PriceMin = 0;
var PriceMax = 990000000;
if ( typeof (gts.$("body").smartTabs) != "undefined") {
	gts.$(".js-tabsMenu").smartTabs()
}
var LandingPageSearchModule = {
	_LocationTermEle : null,
	_LocationSuggestObject : null,
	_Map : null,
	_MapIdleReceived : false,
	_RecenteringEnabled : true,
	_RadiusSelectorInitialized : false,
	_OngoingGetMapCenterRequest : null,
	_OngoingCenterMapRequest : null,
	_ModuleId : null,
	_DoGetSuggestedActionCommitTimeout : null,
	_ongoingSmartSearchRequest : null,
	Initialize : function(moduleId) {
		this._ModuleId = moduleId;
		this._ModuleEle = gts.$("#" + this._ModuleId);
		this._InitializePriceRangeModule();
		this._InitializeAcresRangeModule();
		this._suggestRedirecting = false;
		if ( typeof lpsconfig == "undefined") {
			return
		}
		this._LocationTermEle = gts.$("#LPSTerm");
		this._LocationTermEle.off("paste").on("paste", function(e) {
			if (e.type === "paste") {
				gts.$("#LPSLocationSuggested").val("")
			}
		});
		this._BindToSchoolDistrictRadio();
		this._BindToSchoolDistrictModalOpenToLocationTermField();
		this._InitializeSuggest_Location();
		this._SetLocationTermEleDefault();
		this._SetRadiusTermEleDefault();
		this._SetMapAreaTermEleDefault();
		gts.$("#LPSTerm, #LPSTerm_Radius, #LPSTerm_MapArea").one("mouseenter", function() {
			if (window["input_" + this.id] != undefined) {
				window["input_" + this.id].orignalValue = this.value
			}
		});
		window.searchHeight = new SearchHeightObj();
		window.searchHeight.Initialize();
		SearchComboGroupUtility.Initialize();
		this.LinkViewTypeRadioButtons();
		if ( typeof (gts.$("body").selectBoxIt) != "undefined") {
			$(".js-select-lpsw").selectBoxIt({
				similarSearch : true,
				autoWidth : false,
				createPlaceholders : true
			})
		}
		this._SetToolTip()
	},
	_SetLocationTermEleDefault : function() {
		if (this._LocationTermEle.length <= 0) {
			return
		}
		var seoEle = gts.$("#LPSLocationSuggested");
		if (this._SetLocationTermEleFromPossiblePersistSearch(this._LocationTermEle, seoEle)) {
			return
		}
		if (!lpsconfig.location_selection_required) {
			return
		}
		if (this._LocationTermEle.length > 0 && lpsconfig.default_region_name !== undefined && lpsconfig.default_region_name !== "") {
			seoEle.val(lpsconfig.seo_location_default)
		}
	},
	_SetRadiusTermEleDefault : function() {
		var nameEle = gts.$("#LPSTerm_Radius");
		if (nameEle.length <= 0) {
			return
		}
		var seoEle = gts.$("#LPSLocationSuggested_Radius");
		if (this._SetLocationTermEleFromPossiblePersistSearch(nameEle, seoEle)) {
			return
		}
		seoEle.val(lpsconfig.seo_location_default)
	},
	_SetMapAreaTermEleDefault : function() {
		var nameEle = gts.$("#LPSTerm_MapArea");
		if (nameEle.length <= 0) {
			return
		}
		var seoEle = gts.$("#LPSLocationSuggested_MapArea");
		if (this._SetLocationTermEleFromPossiblePersistSearch(nameEle, seoEle)) {
			return
		}
		seoEle.val(lpsconfig.seo_location_default)
	},
	_SetLocationTermEleFromPossiblePersistSearch : function(nameEle, seoEle) {
		if (PersistSearchLocation === "" || PersistSearchLocationSeo === "") {
			return false
		}
		nameEle.val(PersistSearchLocation);
		seoEle.val(PersistSearchLocationSeo);
		return true
	},
	_SetToolTip : function() {
		var me = this;
		var tooltipitems = $(".tooltipitems", me._ModuleEle);
		var landingPageSearchKeyworkInput = gts.$(".lpsw__suggest-term", me._ModuleEle);
		if (tooltipitems.length == 0 || landingPageSearchKeyworkInput.length == 0 || typeof landingPageSearchKeyworkInput.tooltipster != "function") {
			return
		}
		var tooltipSettings = {
			contentAsHTML : true,
			content : tooltipitems.html(),
			contentCloning : true,
			position : "bottom-right",
			offsetX : -10
		};
		setTimeout(function() {
			landingPageSearchKeyworkInput.tooltipster(tooltipSettings);
			landingPageSearchKeyworkInput.on("keydown" + RenoEventsNS, function() {
				landingPageSearchKeyworkInput.tooltipster("hide")
			})
		}, 0)
	},
	LinkViewTypeRadioButtons : function() {
		var me = this;
		var elementsByViewType = {};
		gts.$("input[type=radio][data-view-type][name]", this._ModuleEle).each(function() {
			var element = gts.$(this);
			var dataViewType = element.attr("data-view-type");
			if (elementsByViewType[dataViewType] === undefined) {
				elementsByViewType[dataViewType] = []
			}
			elementsByViewType[dataViewType].push(element)
		});
		gts.$.each(elementsByViewType, function(dataViewType, dataViewTypeElements) {
			gts.$.each(dataViewTypeElements, function() {
				var element = $(this);
				var elementGroup = element.attr("name");
				gts.$("input[type=radio][name=" + elementGroup + "]", this._ModuleEle).on("change", function() {
					gts.$.each(dataViewTypeElements, function() {
						$(this).prop("checked", element.prop("checked"))
					});
					me.SwitchSearchType($(this).attr("data-view-type"))
				})
			});
			var initiallyChecked = dataViewTypeElements.filter(function() {
				return gts.$(this).has("[checked]")
			}).length > 0;
			gts.$(dataViewTypeElements, function() {
				$(this).prop("checked", initiallyChecked)
			})
		})
	},
	_InitializeAcresRangeModule : function() {
		_AcresRangeModule.SetUpAcresRangeSelectMenu()
	},
	_InitializePriceRangeModule : function() {
		_PriceRangeModule.Initialize({
			moduleEle : this._ModuleEle,
			min : PriceMin,
			max : PriceMax
		})
	},
	GetChannel : function() {
		var channel = lpsconfig.channel;
		var selectedChannelInput = gts.$('input:checked[id^="lps_"][module="channel"]', this._ModuleEle);
		if (selectedChannelInput.length === 1 && String.Trim(selectedChannelInput.val()) !== "") {
			channel = String.Trim(selectedChannelInput.val())
		}
		var selectedChannelSelect = (isResponsive) ? gts.$(".js-lpsw-select-wrapper", this._ModuleEle).filter(":visible").find('[id^="lps_"][module="channel"]') : gts.$('select:visible[id^="lps_"][module="channel"]', this._ModuleEle);
		if (selectedChannelSelect.length === 1 && String.Trim(selectedChannelSelect.val()) !== "") {
			channel = String.Trim(selectedChannelSelect.val())
		}
		return channel
	},
	ChangeChannel : function(channel, moduleId, isWidgetCall) {
		var url = this._GetNewChannelUrl(channel, moduleId, isWidgetCall);
		this._ReloadContent(url, moduleId, isWidgetCall)
	},
	ChangeChannelConfig : function(channel, moduleId, config) {
		var url = this._GetNewChannelUrl(channel, moduleId, true, config);
		this._ReloadContent(url, moduleId, true)
	},
	_GetNewChannelUrl : function(channel, moduleId, isWidgetCall, config) {
		var url = LocationAnchorService.GetLocationAnchorOrHRef();
		url = SEOService.NormalizeSEOQuery(url);
		if ( typeof (config) != "undefined" && config != null && config !== "") {
			url = url + "/config-" + config
		}
		if (isWidgetCall) {
			url = String.Format("/widget/nowrapper/{0}{1}", moduleId, url);
			url = SEOService.AddQueryString(url, String.Format("changechannel={0}", channel));
			url = SEOService.AddLanguage(url)
		} else {
			url = "/" + SEOService.TrimSlashes(SEOService.BuildAJAXSEOPath(moduleId, SEOService.AddLanguage(url)));
			url = SEOService.AddQueryStringParam(url, String.Format("changechannel={0}", channel))
		}
		return url
	},
	_ReloadContent : function(url, moduleId, isWidgetCall) {
		var me = this;
		url = mainDomainWebRoot + url;
		var outputContainer = gts.$("#" + moduleId);
		gts.$.ajax({
			type : "GET",
			contentType : "application/json; charset=utf-8",
			url : url,
			dataType : "text",
			error : function(xmlHttpRequest, textStatus, errorThrown) {
				log.debug("Json Error Message: error(" + errorThrown + ') "' + textStatus + '"')
			},
			success : function(response) {
				if (isWidgetCall) {
					outputContainer.replaceWith(response)
				} else {
					var newHtml = gts.$("#" + moduleId, response);
					outputContainer.replaceWith(newHtml);
					var script = gts.$(response).filter("script").text();
					ExecuteJavaScript(script)
				}
				me.Initialize(me._ModuleId)
			}
		});
		gts.$(document).ajaxComplete(function() {
			gts.$(document).trigger("populate_first_load_seo")
		})
	},
	TabAction : function(parentId, childId) {
		gts.$("#" + parentId + " .tabs__item", this._ModuleEle).removeClass("tabs__item--selected");
		gts.$("#" + parentId + ">option", this._ModuleEle).removeClass("selected");
		gts.$("#" + childId + ".tabs__item", this._ModuleEle).addClass("tabs__item--selected")
	},
	SwitchSearchType : function(type) {
		var me = this;
		gts.$(".location", me._ModuleEle).removeClass("is-hidden").addClass("is-hidden");
		gts.$("#searchby_" + type, me._ModuleEle).removeClass("is-hidden");
		switch(type) {
			case"type_location":
				me._InitializeSuggest_Location(me._ModuleId);
				me._LoadLocationFromDefaults();
				break;
			case"type_radius":
				me._InitializeSuggest_Radius(me._ModuleId);
				me._InitializeRadiusSelector();
				me._LoadLocationFromDefaults(function() {
					me._AjaxAdjustRadiusSelector(me._LocationSuggestObject.TextSelectedDataEle.val())
				});
				break;
			case"type_map-area":
				me._InitializeSuggest_MapArea(me._ModuleId);
				me._InitializeMapAreaMap();
				me._LoadLocationFromDefaults(function() {
					if (me._MapIdleReceived) {
						me._RecenterMapAreaToSelectedOrDefaultLocationSeo()
					}
				});
				break;
			case"type_school_district":
				_LPPerformSearchModule.OpenEmbedddedSchoolDistrictsModule();
				break;
			case"school_district":
				_LPPerformSearchModule.OpenModalSchoolDistrictsModule();
				break
		}
		if ( typeof (window.searchHeight) != "undefined") {
			window.searchHeight.setHeight()
		}
	},
	_BindToSchoolDistrictRadio : function() {
		gts.$("#school_districts_modal_trigger").click(function() {
			_LPPerformSearchModule.OpenModalSchoolDistrictsModule()
		})
	},
	_BindToSchoolDistrictModalOpenToLocationTermField : function() {
		if (lpsconfig.SchoolDistrictsEnabled !== true) {
			return
		}
		this._LocationTermEle.click(function() {
			if (_LPPerformSearchModule.GetSearchType() === SearchType.SchoolDistrict) {
				_LPPerformSearchModule.OpenModalSchoolDistrictsModule()
			}
		});
		gts.$(".js-districts-toggle").off("click" + RenoEventsNS).on("click" + RenoEventsNS, function(e) {
			gts.$(this).closest(".js-selected-districts").toggleClass("is-open")
		})
	},
	_InitializeSuggest_Location : function() {
		var me = this;
		var suggestSettings = {
			moduleEleSelector : "#" + this._ModuleId,
			textInputEleSelector : "#LPSTerm",
			textSelectedDataEleSelector : "#LPSLocationSuggested",
			responseContainerEleSelector : "#LPSSuggestContainer",
			customSuggestStyle : "undefined" !== typeof gts.$("#" + this._ModuleId).data("suggest-style") ? gts.$("#" + this._ModuleId).data("suggest-style") : 0
		};
		this._InitializeSuggestCommon(suggestSettings);
		this._LocationSuggestObject.TextSelectedDataEle.off("SuggestSelected" + this._LocationSuggestObject.EventNS).on("SuggestSelected" + this._LocationSuggestObject.EventNS, function(e, data) {
			me._SuggestSelected(data.item)
		})
	},
	_InitializeSuggest_Radius : function() {
		var me = this;
		var suggestSettings = {
			moduleEleSelector : "#" + this._ModuleId,
			textInputEleSelector : "#LPSTerm_Radius",
			textSelectedDataEleSelector : "#LPSLocationSuggested_Radius",
			responseContainerEleSelector : "#LPSSuggestContainer_Radius"
		};
		this._InitializeSuggestCommon(suggestSettings);
		this._LocationSuggestObject.TextSelectedDataEle.off("SuggestSelected" + this._LocationSuggestObject.EventNS).on("SuggestSelected" + this._LocationSuggestObject.EventNS, function(e, data) {
			me._SuggestSelected(data.item);
			me._AjaxAdjustRadiusSelector(me._LocationSuggestObject.TextSelectedDataEle.val())
		})
	},
	_InitializeSuggest_MapArea : function() {
		var me = this;
		var suggestSettings = {
			moduleEleSelector : "#" + this._ModuleId,
			textInputEleSelector : "#LPSTerm_MapArea",
			textSelectedDataEleSelector : "#LPSLocationSuggested_MapArea",
			responseContainerEleSelector : "#LPSSuggestContainer_MapArea"
		};
		this._InitializeSuggestCommon(suggestSettings);
		this._LocationSuggestObject.TextSelectedDataEle.off("SuggestSelected" + this._LocationSuggestObject.EventNS).on("SuggestSelected" + this._LocationSuggestObject.EventNS, function(e, data) {
			me._SuggestSelected(data.item);
			me._RecenteringEnabled = false;
			me._GetMapRecentering(me._LocationSuggestObject.TextSelectedDataEle.val(), function() {
				me._RecenteringEnabled = true
			})
		})
	},
	_InitializeSuggestCommon : function(suggestSettings) {
		var me = this;
		gts.$.extend(suggestSettings, {
			suggestType : lpsconfig.suggest_type,
			suggestDataElementPrefix : "lpssuggest-data",
			suggestDataGroupPrefix : "lpssuggest-group-data",
			searchType : typeof (lpsconfig.suggestsearchtype) != "undefined" ? lpsconfig.suggestsearchtype : "suggest_search_widget",
			channel : lpsconfig.channel
		});
		if ( typeof (this._LocationSuggestObject) != "undefined" && this._LocationSuggestObject != null) {
			this._LocationSuggestObject.AbortOngoingRequest();
			this._LocationSuggestObject.UnbindEvents()
		}
		suggestSettings.searchServiceRoot = CacheObject.SearchServiceRoot;
		this._LocationSuggestObject = SuggestManagerFactory.GetManager(suggestSettings);
		this._suggestRedirecting = false;
		this._LocationSuggestObject.TextInputEle.off("RedirectStarting" + this._LocationSuggestObject.EventNS).on("RedirectStarting" + this._LocationSuggestObject.EventNS, function() {
			me._suggestRedirecting = true
		});
		this._LocationSuggestObject.TextInputEle.off("SuggestEnterKeyDown" + this._LocationSuggestObject.EventNS).on("SuggestEnterKeyDown" + this._LocationSuggestObject.EventNS, function() {
			me.DoLPSSearch()
		});
		this._LocationSuggestObject._InitializeSelectHandlerBase = this._LocationSuggestObject._InitializeSelectHandler;
		this._LocationSuggestObject._InitializeSelectHandler = function() {
			if (!this._InitializeSelectHandlerBase()) {
				return
			}
			this.SelectHandler._GetCategoryLocationHrefBase = this.SelectHandler._GetCategoryLocationHref;
			this.SelectHandler._GetCategoryLocationHref = function(selectedOptionSeo) {
				return me._GetCategorySuggestSelectedLocationHref(selectedOptionSeo)
			};
			this._GetCategoryLocationHrefOverridden = true
		}
	},
	_GetCategorySuggestSelectedLocationHref : function(selectedOptionSeo) {
		var baseHref = this._LocationSuggestObject.SelectHandler._GetCategoryLocationHrefBase(selectedOptionSeo);
		var searchType = _LPPerformSearchModule.GetSearchType();
		var channel = this.GetChannel();
		var viewTypeSeoPart = this._GetViewTypeSEOPart(SEOService.TrimSlashes(selectedOptionSeo), channel, searchType);
		if (viewTypeSeoPart == null) {
			return baseHref
		}
		return String.Format("{0}/{1}", baseHref, viewTypeSeoPart)
	},
	_SuggestSelected : function(selectedOption) {
		this._LocationSuggestObject.TextSelectedDataEle.val(selectedOption.attr("seo"));
		this._LocationSuggestObject.TextInputEle.val(selectedOption.text().replace(/<[^>]+>/g, ""));
		gts.$("#global_lps_selected_location_name").val(this._LocationSuggestObject.TextInputEle.val());
		gts.$("#global_lps_selected_location_seo").val(this._LocationSuggestObject.TextSelectedDataEle.val());
		if ("undefined" !== typeof (lpsconfig.submit_search_on_location_select) && true == lpsconfig.submit_search_on_location_select) {
			this.DoLPSSearch()
		}
	},
	DoLPSSearch : function() {
		if (this._suggestRedirecting) {
			return false
		}
		_LPPerformSearchModule.Initialize(lpsconfig, this._Map);
		if (lpsconfig.advertisement_mode === "interstatial") {
			settoshowInterstatialAd(lpsconfig.advertisement_url)
		} else {
			if (lpsconfig.advertisement_mode === "window.open") {
				window.open(lpsconfig.advertisement_url, "", "menubar=1,resizable=1,scrollbars=1,width=800,height=600")
			}
		}
		var searchType = _LPPerformSearchModule.GetSearchType();
		var locationSuggestValue = _LPPerformSearchModule.GetLocationSuggestValueBasedOnSearchType(searchType);
		if (locationSuggestValue === "" && lpsconfig.location_selection_required) {
			window.alert(lpsconfig.error_no_location_selection);
			return false
		}
		var seoQueryParts = this._GetLPSSearchSeoQueryParts(searchType, locationSuggestValue);
		if ( typeof (seoQueryParts.refinements) == "boolean" && seoQueryParts.refinements === false) {
			return false
		}
		var locationTerm = _LPPerformSearchModule.GetLocationTermValueBasedOnSearchType(searchType);
		var locationDefaultAttrValue = _LPPerformSearchModule.GetLocationDefaultAttrValueBasedOnSearchType(searchType);
		if (locationTerm.length < 2 || locationSuggestValue !== "" || locationTerm === locationDefaultAttrValue || searchType === SearchType.SchoolDistrict) {
			var seo = SEOService.NormalizeSEOQuery(_LPPerformSearchModule.ToSeoQuery(seoQueryParts.allParts));
			_LPPerformSearchModule.DoSearch(searchType, seo);
			return false
		}
		this._DoGetSuggestedAction({
			locationTerm : locationTerm,
			location : locationSuggestValue,
			seoQueryParts : seoQueryParts,
			searchType : searchType
		});
		return false
	},
	_DoGetSuggestedAction : function(params) {
		if (this._DoGetSuggestedActionCommitTimeout != null) {
			window.clearTimeout(this._DoGetSuggestedActionCommitTimeout)
		}
		if (!this._LocationSuggestObject.IsBusy()) {
			this._DoGetSuggestedActionCommit(params)
		} else {
			var me = this;
			this._DoGetSuggestedActionCommitTimeout = window.setTimeout(function() {
				me._DoGetSuggestedActionCommitTimeout = null;
				me._DoGetSuggestedAction(params)
			}, 200)
		}
	},
	_DoGetSuggestedActionCommit : function(params) {
		var suggestedAction = this._LocationSuggestObject.GetSuggestedAction();
		switch(suggestedAction.action) {
			case SuggestNoSelection.SuggestedAction.Navigate:
				var seo = suggestedAction.suggestTargetType == EnumSuggestTarget.LOCATION || suggestedAction.suggestTargetType == EnumSuggestTarget.UNDEFINED ? SEOService.NormalizeSEOQuery(suggestedAction.seo + _LPPerformSearchModule.ToSeoQuery(params.seoQueryParts.refinements.concat(params.seoQueryParts.viewType))) : suggestedAction.seo;
				_LPPerformSearchModule.DoSearch(params.searchType, seo);
				break;
			case SuggestNoSelection.SuggestedAction.Undefined:
			case SuggestNoSelection.SuggestedAction.SmartSearch:
				_LPPerformSearchModule.PerformSmartSearch(suggestedAction.seo, params.locationTerm, params.seoQueryParts.refinements, params.searchType, params.seoQueryParts.viewType);
				break;
			case SuggestNoSelection.SuggestedAction.IntermediatePage:
				window.location.href = SEOService.AddLanguage(String.Format("{0}?{1}&refinements={2}", suggestedAction.url, suggestedAction.queryString, encodeURI(params.seoQueryParts.refinements.join("/") + params.seoQueryParts.viewType)));
				break
		}
	},
	_GetLPSSearchSeoQueryParts : function(searchType, locationSuggestValue) {
		var mainParts = new Array();
		if (SiteLang != null) {
			mainParts.push(SiteLang)
		}
		var channel = this.GetChannel();
		mainParts.push(channel);
		if (searchType !== SearchType.SchoolDistrict) {
			mainParts.push((locationSuggestValue !== "" ? locationSuggestValue : lpsconfig.seo_location_default))
		}
		var viewTypeSeoPart = this._GetViewTypeSEOPart(locationSuggestValue, channel, searchType);
		if (viewTypeSeoPart != null) {
			mainParts.push(viewTypeSeoPart)
		}
		var refinements = _LPPerformSearchModule.GetSelectedRefinements(searchType);
		var allParts = mainParts.concat(refinements);
		return {
			allParts : allParts,
			refinements : refinements,
			viewType : viewTypeSeoPart == null ? "" : "/" + viewTypeSeoPart
		}
	},
	_GetViewTypeSEOPart : function(locationSuggestValue, channel, searchType) {
		if ( typeof lpsconfig.viewtype !== "undefined" && lpsconfig.viewtype !== null && lpsconfig.viewtype !== "") {
			var defaultViewTypeForCurrentSearchType = ViewTypesForSearchTypesConfigurationProvider.GetDefaultViewType(channel, searchType);
			if (defaultViewTypeForCurrentSearchType !== lpsconfig.viewtype && (lpsconfig.viewtype !== ResultViewType.List || channel !== RenoChannelType.Sales || locationSuggestValue !== "usa")) {
				return SEOService.GetViewTypeSEOPart(lpsconfig.viewtype)
			}
		}
		return null
	},
	_LoadLocationFromDefaults : function(callback) {
		var selectedLocationName = gts.$("#global_lps_selected_location_name").val();
		var selectedLocationSeo = gts.$("#global_lps_selected_location_seo").val();
		if (selectedLocationName !== "" && selectedLocationSeo !== "") {
			this._LocationSuggestObject.TextInputEle.val(selectedLocationName);
			this._LocationSuggestObject.TextSelectedDataEle.val(selectedLocationSeo);
			if ( typeof (callback) === "function") {
				callback()
			}
		}
	},
	_InitializeRadiusSelector : function() {
		try {
			var sliderEle = gts.$("#distance_range", this._ModuleEle);
			if (!this._RadiusSelectorInitialized && sliderEle.length > 0 && RadiusOpts != undefined && RadiusOpts.length > 0) {
				var radiusOpts = this._ProcessRadiusOpts(RadiusOpts);
				var defaultIndex = 0;
				var defaultValue = parseFloat(lpsconfig.default_map_radius);
				for (var x = radiusOpts.length - 1; x >= 0; x--) {
					if (radiusOpts[x] <= defaultValue) {
						defaultIndex = x;
						break
					}
				}
				if (defaultIndex === 0) {
					defaultIndex = parseInt(radiusOpts.length / 2, 10)
				}
				var sliderSeoEle = gts.$("#distance_range_seo", this._ModuleEle);
				sliderSeoEle.val(GetSeoPart(seoPartType.Radius, radiusOpts[defaultIndex]));
				sliderEle.renoSmartSliderRadius({
					rangeOpts : radiusOpts,
					minIndex : 0,
					maxIndex : radiusOpts.length - 1,
					startIndex : defaultIndex,
					isRange : false,
					wrapInputs : "slider__ranges",
					convertInputValues : false,
					rangeOptItemsAreArrays : false,
					unitSystem : globalParams.CurrentUnitSystem.toLowerCase(),
					unitDistanceText : globalParams.CurrentUnitDistanceText.toLowerCase(),
					relativeToParent : false,
					onStop : function(data) {
						sliderSeoEle.val(GetSeoPart(seoPartType.Radius, data.maxSeo))
					}
				});
				this._RadiusSelectorInitialized = true
			}
		} catch(e) {
		}
	},
	_ProcessRadiusOpts : function(radiusOpts) {
		var newRadiusOpts = new Array();
		for (var x = 0; x < radiusOpts.length; x++) {
			var optValue = parseFloat(radiusOpts[x].replace(/[^\d\.]/g, ""));
			newRadiusOpts.push(optValue)
		}
		return newRadiusOpts
	},
	_InitializeMapAreaMap : function() {
		var me = this;
		var mapEle = gts.$("#search_widget_map");
		if (mapEle.length == 0) {
			return
		}
		GoogleMapsAPILoader.Load(function() {
			me._InitializeMapAreaMap_OnApiLoadedCallback()
		})
	},
	_InitializeMapAreaMap_OnApiLoadedCallback : function() {
		var me = this;
		if (me._Map == null) {
			var lat = lpsconfig.default_map_center[0];
			var lng = lpsconfig.default_map_center[1];
			var mapOptions = {
				zoom : 1,
				zoomControl : true,
				scrollwheel : false,
				center : new google.maps.LatLng(lat, lng),
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				streetViewControl : false,
				minZoom : 1,
				navigationControl : true,
				navigationControlOptions : {
					style : google.maps.NavigationControlStyle.SMALL
				},
				mapTypeControl : false,
				scaleControl : false
			};
			mapOptions = gts.$.extend({
				styles : window.globalGoogleMapsStyles
			}, mapOptions);
			me._Map = new google.maps.Map(gts.$("#search_widget_map")[0], mapOptions)
		}
		google.maps.event.addListenerOnce(me._Map, "idle", function() {
			me._MapIdleReceived = true;
			google.maps.event.addListener(me._Map, "drag", function() {
				if (me._RecenteringEnabled) {
					me._EnsureBounds()
				}
			});
			google.maps.event.addListener(me._Map, "zoom_changed", function() {
				if (me._RecenteringEnabled) {
					me._GetLocationInfoByCurrentMapCenter()
				}
			});
			google.maps.event.addListener(me._Map, "dragend", function() {
				if (me._RecenteringEnabled) {
					me._EnsureBounds();
					me._GetLocationInfoByCurrentMapCenter()
				}
			});
			me._RecenterMapAreaToSelectedOrDefaultLocationSeo()
		})
	},
	_EnsureBounds : function() {
		var sw = this._Map.getBounds().getSouthWest();
		var ne = this._Map.getBounds().getNorthEast();
		var newBounds;
		if (ne.lat() > 85) {
			newBounds = new google.maps.LatLngBounds(sw, new google.maps.LatLng(85, ne.lng()));
			this._Map.fitBounds(newBounds)
		} else {
			if (sw.lat() < -85) {
				newBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-85, sw.lng()), ne);
				this._Map.fitBounds(newBounds)
			}
		}
	},
	_GetLocationInfoByCurrentMapCenter : function() {
		var me = this;
		var jUrl = lpsconfig.canonicalwebroot + SEOService.AddLanguage("/reno/landingpagesearch/mapactions.ashx?ne={0},{1}&sw={2},{3}&gz={4}&query_type=recenter_map");
		jUrl = String.Format(jUrl, this._Map.getBounds().getNorthEast().lat(), this._Map.getBounds().getNorthEast().lng(), this._Map.getBounds().getSouthWest().lat(), this._Map.getBounds().getSouthWest().lng(), this._Map.getZoom());
		gts.$.ajax({
			type : "GET",
			contentType : "application/json; charset=utf-8",
			url : jUrl,
			data : "{}",
			cache : false,
			dataType : "jsonp",
			beforeSend : function(jqXhr) {
				me._AbortOngoingGetMapCenterRequest();
				me._OngoingGetMapCenterRequest = jqXhr
			},
			error : function(xmlHttpRequest, textStatus, errorThrown) {
				log.debug("Json Error Message: error(" + errorThrown + ') "' + textStatus + '"')
			},
			success : function(response) {
				if (response.isDefined) {
					gts.$("#LPSTerm_MapArea").val(response.Name);
					gts.$("#LPSLocationSuggested_MapArea").val(response.SEO);
					gts.$("#global_lps_selected_location_name").val(response.Name);
					gts.$("#global_lps_selected_location_seo").val(response.SEO)
				}
			}
		})
	},
	_AjaxAdjustRadiusSelector : function(seo, callback) {
		var me = this;
		var jUrl = lpsconfig.canonicalwebroot + SEOService.AddLanguage("/reno/landingpagesearch/mapactions.ashx?query_type=get_map_center_zoom&doadjustradius=false&seo=" + seo);
		gts.$.ajax({
			type : "GET",
			contentType : "application/json; charset=utf-8",
			url : jUrl,
			data : "{}",
			cache : false,
			dataType : "jsonp",
			error : function(xmlHttpRequest, textStatus, errorThrown) {
				log.debug("Json Error Message: error(" + errorThrown + ') "' + textStatus + '"')
			},
			success : function(response) {
				if (response.isDefined) {
					me._AdjustRadiusSelector(response.Radius, callback)
				}
			}
		})
	},
	_AdjustRadiusSelector : function(newRadius, callback) {
		var newIndex = 0;
		for (var x = RadiusOpts.length - 1; x >= 0; x--) {
			var opValue = parseFloat(RadiusOpts[x].replace(/[^0-9\.]+/g, ""));
			var defaultValue = parseFloat(newRadius);
			if (opValue <= defaultValue) {
				newIndex = x;
				break
			}
		}
		gts.$("#distance_range").slider({
			value : newIndex
		});
		gts.$("#distance_range_values").html(this._GetRadiusSelectorValue(newIndex));
		gts.$("#distance_range_seo").val(GetSeoPart(seoPartType.Radius, RadiusOpts[newIndex].replace(new RegExp("[^0-9.]+", "g"), "")));
		if ( typeof (callback) != "undefined") {
			callback()
		}
	},
	_GetRadiusSelectorValue : function(index) {
		var radiusOptionHtml = String.Format(globalParams.CurrentUnitDistanceText.toLowerCase(), RadiusOpts[index].replace(/[^\d\.]/g, ""));
		if ( typeof (globalParams.CurrentUnitSystem) != "undefined") {
			if (globalParams.CurrentUnitSystem === "both") {
				radiusOptionHtml = String.Format(globalParams.CurrentUnitDistanceText.toLowerCase(), RadiusOpts[index].replace(/[^\d\.]/g, ""), parseFloat(this._MilesToKilometers(RadiusOpts[index].replace(/[^\d\.]/g, ""))).toFixed(2))
			} else {
				if (globalParams.CurrentUnitSystem === "metric") {
					radiusOptionHtml = String.Format(globalParams.CurrentUnitDistanceText.toLowerCase(), parseFloat(this._MilesToKilometers(RadiusOpts[index].replace(/[^\d\.]/g, ""))).toFixed(2))
				}
			}
		}
		return radiusOptionHtml
	},
	_MilesToKilometers : function(miles) {
		return miles * 1.609
	},
	_RecenterMapAreaToSelectedOrDefaultLocationSeo : function() {
		var me = this;
		this._RecenteringEnabled = false;
		var centerSeo = gts.$("#LPSLocationSuggested_MapArea").val();
		if (centerSeo === "") {
			centerSeo = gts.$("#global_lps_selected_location_seo").val()
		}
		this._GetMapRecentering(centerSeo, function() {
			me._RecenteringEnabled = true
		})
	},
	_GetMapRecentering : function(seo, callback) {
		var me = this;
		var jUrl = lpsconfig.canonicalwebroot + SEOService.AddLanguage("/reno/landingpagesearch/mapactions.ashx?query_type=get_map_center_zoom&seo=" + seo);
		gts.$.ajax({
			type : "GET",
			contentType : "application/json; charset=utf-8",
			url : jUrl,
			data : "{}",
			cache : false,
			dataType : "jsonp",
			beforeSend : function(jqXhr) {
				me._AbortOngoingCenterMapRequest();
				me._OngoingCenterMapRequest = jqXhr
			},
			error : function(xmlHttpRequest, textStatus, errorThrown) {
				log.debug("Json Error Message: error(" + errorThrown + ') "' + textStatus + '"')
			},
			success : function(response) {
				if (response.isDefined) {
					me._RecenterMap(response.Latitude, response.Longitude, response.Radius);
					callback()
				} else {
					callback()
				}
			}
		})
	},
	_AbortOngoingCenterMapRequest : function() {
		if (this._OngoingCenterMapRequest == null) {
			return
		}
		this._OngoingCenterMapRequest.abort()
	},
	_AbortOngoingGetMapCenterRequest : function() {
		if (this._OngoingGetMapCenterRequest == null) {
			return
		}
		this._OngoingGetMapCenterRequest.abort()
	},
	_RecenterMap : function(lat, lng, radiusMiles) {
		if (this._Map == null) {
			return
		}
		var circleOptions = {
			strokeOpacity : 0,
			strokeWeight : 0,
			fillOpacity : 0,
			center : new google.maps.LatLng(lat, lng),
			radius : (radiusMiles * 1.609) * 1000
		};
		var circleObject = new google.maps.Circle(circleOptions);
		circleObject.setMap(this._Map);
		this._Map.fitBounds(circleObject.getBounds());
		circleObject.setMap(null)
	}
};
var _LPPerformSearchModule = {
	_Map : undefined,
	_Config : undefined,
	_SchoolDistrictsEmbeddedLoaded : false,
	_SelectedSchoolDistrictsSeo : "",
	_SelectedSchoolDistrictNames : new Array(),
	_ongoingSmartSearchRequest : null,
	Initialize : function(lpsConfig, map) {
		this._Config = lpsConfig;
		this._Map = map
	},
	GetSearchType : function() {
		var context = gts.$(".js-m-lpsw", this._ModuleEle);
		var searchType = "location";
		var searchTypeDropDownEle = gts.$("select#tabs_search_type", context);
		if (searchTypeDropDownEle.length > 0) {
			searchType = searchTypeDropDownEle.val().replace("tab_", "")
		} else {
			if (gts.$(".js-lpsw-tab", context).length > -1) {
				gts.$(".js-lpsw-tab[type='radio']", context).each(function() {
					if (this.checked) {
						searchType = this.value
					}
				})
			}
		}
		return searchType
	},
	GetLocationTermValueBasedOnSearchType : function(searchType) {
		var locationValue = "";
		if (searchType === SearchType.MapArea) {
			locationValue = gts.$("#LPSTerm_MapArea", this._ModuleEle).val()
		} else {
			if (searchType === SearchType.Radius) {
				locationValue = gts.$("#LPSTerm_Radius", this._ModuleEle).val()
			} else {
				if (searchType === SearchType.SchoolDistrict) {
					locationValue = this._Config.seo_location_default
				} else {
					if (searchType === SearchType.Location || searchType === "map_area_radio" || searchType === "radius_radio") {
						locationValue = gts.$("#LPSTerm").val()
					}
				}
			}
		}
		if ( typeof (locationValue) == "undefined" || locationValue == null) {
			locationValue = ""
		}
		return locationValue.seoEncodeComponent()
	},
	GetLocationDefaultAttrValueBasedOnSearchType : function(searchType) {
		var defaultValue = this._Config.seo_location_default;
		if (searchType === SearchType.MapArea) {
			defaultValue = gts.$("#LPSTerm_MapArea").attr("default")
		} else {
			if (searchType === SearchType.Radius) {
				defaultValue = gts.$("#LPSTerm_Radius").attr("default")
			} else {
				if (searchType === SearchType.SchoolDistrict) {
					defaultValue = this._Config.seo_location_default
				} else {
					if (searchType === SearchType.Location || searchType === "map_area_radio" || searchType === "radius_radio") {
						defaultValue = gts.$("#LPSTerm").attr("default")
					}
				}
			}
		}
		if ( typeof (defaultValue) == "undefined" || defaultValue == null) {
			defaultValue = ""
		}
		return defaultValue.seoEncodeComponent()
	},
	GetLocationSuggestValueBasedOnSearchType : function(searchType) {
		var locationSuggestValue = "";
		if (searchType === "map-area" && typeof (gts.$("#LPSLocationSuggested_MapArea").val()) != "undefined") {
			locationSuggestValue = gts.$("#LPSLocationSuggested_MapArea").val()
		} else {
			if (searchType === "radius" && typeof (gts.$("#LPSLocationSuggested_Radius").val()) != "undefined") {
				locationSuggestValue = gts.$("#LPSLocationSuggested_Radius").val()
			} else {
				if (searchType === "location" || searchType === "map_area_radio" || searchType === "radius_radio") {
					locationSuggestValue = gts.$("#LPSLocationSuggested").val()
				}
			}
		}
		if ( typeof (locationSuggestValue) == "undefined" || locationSuggestValue == null) {
			locationSuggestValue = ""
		}
		return locationSuggestValue
	},
	GetSelectedRefinements : function(searchType) {
		var refinements = new Array();
		if (searchType === "map-area") {
			var mapQuery = this._GetMapAreaSearchSeoPartFromCurrentBounds();
			refinements.push(mapQuery)
		}
		if (searchType === SearchType.Radius) {
			refinements.push(gts.$("#distance_range_seo").val())
		}
		if (searchType === SearchType.SchoolDistrict) {
			if (this._SelectedSchoolDistrictsSeo === "") {
				window.alert("Please select at least one school district");
				return false
			}
			refinements.push(SEOService.TrimSlashes(this._SelectedSchoolDistrictsSeo))
		}
		var visibleSelectValues = this._GetVisibleSelectValues();
		if (visibleSelectValues.length > 0) {
			refinements = refinements.concat(visibleSelectValues)
		}
		var textValues = this._GetTextValues();
		if (textValues.length > 0) {
			refinements = refinements.concat(textValues)
		}
		var checkedValues = this._GetCheckedValues();
		if (checkedValues.length > 0) {
			refinements = refinements.concat(checkedValues)
		}
		var priceRange = this._GetPriceSliderValue();
		if (priceRange.length > 0) {
			refinements = refinements.concat(priceRange)
		}
		var acresRange = this._GetAcresValues();
		if (acresRange.length > 0) {
			refinements = refinements.concat(acresRange)
		}
		return refinements
	},
	_GetMapAreaSearchSeoPartFromCurrentBounds : function() {
		if (this._Map == null) {
			return ""
		}
		var currentBounds = this._Map.getBounds();
		var mapQuery = String.Format("{0}-{1}-{2}-{3}", (Math.round(currentBounds.getNorthEast().lat() * 1000000) / 1000000), (Math.round(currentBounds.getNorthEast().lng() * 1000000) / 1000000), (Math.round(currentBounds.getSouthWest().lat() * 1000000) / 1000000), (Math.round(currentBounds.getSouthWest().lng() * 1000000) / 1000000));
		return GetSeoPart(seoPartType.Map, mapQuery)
	},
	_GetVisibleSelectValues : function() {
		var me = this;
		var refinements = new Array();
		var refinementsSelects = (isResponsive) ? gts.$(".js-lpsw-select-wrapper", this._ModuleEle).filter(":visible").find('select[id^="lps_"][module!="channel"]:not(.price)') : gts.$('select:visible[id^="lps_"][module!="channel"]:not(.price)', this._ModuleEle);
		refinementsSelects.each(function() {
			var val = gts.$(this).val();
			if (val !== "") {
				refinements.push(val)
			}
		});
		return refinements
	},
	_GetTextValues : function() {
		var refinements = new Array();
		gts.$('input[type="text"][id^="lps_"]').not("input.price_min").not("input.price_max").each(function() {
			var term = gts.$.trim(gts.$(this).val());
			if (term !== "") {
				if (term !== gts.$(this).attr("default")) {
					var val = term.seoEncodeComponent();
					var seoprefix = gts.$(this).attr("seoprefix");
					if ( typeof (seoprefix) != "undefined") {
						val = seoprefix + val
					}
					var seosuffix = gts.$(this).attr("seosuffix");
					if ( typeof (seosuffix) != "undefined") {
						val += seosuffix
					}
					refinements.push(val)
				}
			}
		});
		return refinements
	},
	_GetIsQueryStringRefinementFromEle : function(ele) {
		return gts.$(ele).attr("isquerystringrefinement") == "true"
	},
	_GetCheckedValues : function() {
		var me = this;
		var refinements = new Array();
		gts.$('input:checked[id^="lps_"][module!="channel"]', this._ModuleEle).each(function() {
			var val = gts.$(this).val();
			if (val !== "") {
				refinements.push(val)
			}
		});
		return refinements
	},
	_GetPriceSliderValue : function() {
		var refinements = new Array();
		if (gts.$("#lps_form_slider_price_value").length > 0) {
			if (gts.$("#lps_form_slider_price_value").val() !== "") {
				refinements.push(gts.$("#lps_form_slider_price_value").val())
			}
		}
		return refinements
	},
	_GetAcresValues : function() {
		var refinements = new Array();
		if (gts.$("#lps_form_slider_acres_value").length > 0) {
			if (gts.$("#lps_form_slider_acres_value").val() !== "") {
				refinements.push(gts.$("#lps_form_slider_acres_value").val())
			}
		}
		return refinements
	},
	PerformSmartSearch : function(locationSeo, keyword, refinements, searchType, viewTypeSeoPart) {
		var me = this;
		var smartSearchQueryString = this._GetSmartSearchQueryString(keyword, refinements);
		var smartSearchTargetUrl = me._Config.searchserviceroot + "/smartsearch.ashx?" + smartSearchQueryString;
		gts.$.ajax({
			url : smartSearchTargetUrl,
			dataType : "jsonp",
			beforeSend : function(jqXhr) {
				if (me._ongoingSmartSearchRequest != null) {
					me._ongoingSmartSearchRequest.abort()
				}
				me._ongoingSmartSearchRequest = jqXhr
			},
			success : function(smartSearchResponse) {
				var smartSearchResultAnalyzer = new SuggestNoSelection.SmartSearchResultAnalyzer({
					priorityLocationSeo : locationSeo,
					channel : LandingPageSearchModule.GetChannel(),
					refinements : refinements
				});
				var analysis = smartSearchResultAnalyzer.Analyze(smartSearchResponse);
				if (analysis.hasPriorityLocationSeo) {
					return me._FinishPerformSmartSearch(analysis.redirectUrl, searchType, viewTypeSeoPart, smartSearchQueryString, smartSearchResponse, analysis.useQueryString)
				}
				if (!analysis.smartSearchHasResults) {
					return window.alert(String.Format(me._Config.error_smart_search, keyword))
				}
				return me._FinishPerformSmartSearch(analysis.redirectUrl, searchType, viewTypeSeoPart, smartSearchQueryString, smartSearchResponse, analysis.useQueryString)
			}
		})
	},
	_FinishPerformSmartSearch : function(seo, searchType, viewTypeSeoPart, smartSearchQueryString, smartSearchResponse, addSmartSearchQueryString) {
		var me = this;
		window.setTimeout(function() {
			if (searchType === "radius_radio" || searchType === "map_area_radio") {
				me._ShowSmartSearchModal(smartSearchResponse, searchType);
				return false
			}
			return me._GetSmartSearchRedirectUrl(seo, viewTypeSeoPart, smartSearchQueryString, addSmartSearchQueryString)
		}, 10)
	},
	_GetSmartSearchQueryString : function(keyword, refinements) {
		var smartQueryStringArray = new Array();
		smartQueryStringArray.push("ss=true");
		smartQueryStringArray.push("channel=" + LandingPageSearchModule.GetChannel());
		smartQueryStringArray.push("keyword=" + keyword.seoEncodeComponent().toLowerCase());
		if (refinements.length > 0) {
			smartQueryStringArray.push("criteria=" + refinements.join("/"))
		}
		return smartQueryStringArray.join("&")
	},
	_GetSmartSearchRedirectUrl : function(seoPath, viewTypeSeoPart, smartSearchQueryString, addSmartSearchQueryString) {
		var url = SEOService.AddLanguage(seoPath);
		url = url.replace(/\/$/gi, "");
		if ( typeof viewTypeSeoPart !== "undefined" && viewTypeSeoPart !== null && viewTypeSeoPart !== "") {
			url += "/" + viewTypeSeoPart
		}
		if (addSmartSearchQueryString) {
			url = SEOService.AddQueryString(url, smartSearchQueryString)
		}
		url = this._Config.canonicalwebroot + url;
		return this._SafeURL(url)
	},
	_DoSmartSearch : function(seo, searchType) {
		var mapSeoUrl;
		if (searchType === "radius_radio") {
			var location = seo.split("/")[2];
			mapSeoUrl = SEOService.AddLanguage("/reno/landingpagesearch/mapactions.ashx?query_type=get_map_center_zoom&seo=" + location);
			gts.$.getJSONP(mapSeoUrl, function(data) {
				if (data.isDefined) {
					window.location.href = seo + "/" + GetSeoPart(seoPartType.Radius, data.Latitude + "-" + data.Longitude + "-" + Math.round(data.Radius * 10) / 10)
				}
			})
		} else {
			if (searchType === "map_area_radio") {
				mapSeoUrl = LocationServiceRoot + "/getmapareasearch.ashx?seoquery=" + SEOService.AddLanguage(seo);
				gts.$.get(mapSeoUrl, function(url) {
					url = SEOService.AddLanguage(url);
					url = SEOService.NormalizeSEOQuery(url);
					window.location.href = url
				})
			}
		}
	},
	_ShowSmartSearchModal : function(smartSearchResponse, searchType) {
		var me = this;
		var modal = document.createElement("div");
		var dymModal = document.createElement("div");
		var title = document.createElement("h3");
		var content = document.createElement("div");
		var zip = false;
		var i = 0;
		content.className = "dym";
		gts.$.each(smartSearchResponse.dymresult.matchgroups, function(key, matchGroupContainer) {
			var matchGroup = matchGroupContainer.matchgroup;
			if (matchGroup.directive === "only_keyword_zip_usa") {
				me._DoSmartSearch(matchGroup.match[0].seopath, searchType);
				zip = true;
				return
			} else {
				if (matchGroup.directive.indexOf("agent") === -1 && matchGroup.directive.indexOf("building") === -1) {
					var match = document.createElement("div"), description = document.createElement("div");
					match.className = "match  content-box__wrapper";
					description.className = "description";
					description.innerHTML = matchGroup.description;
					match.appendChild(description);
					gts.$.each(matchGroup.match, function(key, value) {
						var item = document.createElement("div");
						var anchor = document.createElement("a");
						anchor.innerHTML = value.title;
						item.appendChild(anchor);
						item.onclick = function() {
							me._DoSmartSearch(value.seopath, searchType)
						};
						match.appendChild(item);
						i++
					});
					content.appendChild(match)
				}
			}
		});
		if (zip) {
			return false
		}
		title.innerHTML = "Did You Mean To Search For";
		modal.className = "c-modal";
		dymModal.className = "modal__container";
		title.className = "modal__title";
		content.className = "dym modal__item";
		content.insertBefore(title, content.firstChild);
		dymModal.appendChild(content);
		modal.appendChild(dymModal);
		if (i > 0) {
			ShowDialogResult(modal)
		} else {
			alert(String.Format("Your search for '{0}' returned zero results. Please try another term", smartSearchResponse.query.keyword))
		}
		return true
	},
	ToSeoQuery : function(seoQueryArr) {
		seoQueryArr = gts.$.grep(seoQueryArr, function(val) {
			return (val != null && val !== "")
		});
		var seoQuery = "/" + seoQueryArr.join("/");
		seoQuery = seoQuery.replace(/\/$/gi, "");
		return seoQuery
	},
	DoSearch : function(searchType, url) {
		if (SuggestUtility.IsAbsoluteURL(url)) {
			this._SafeURL(url);
			return
		}
		if (searchType === SearchType.Radius || searchType === "radius_radio") {
			this._DoRadiusSearch(url);
			return
		}
		if ((searchType === SearchType.MapArea && this._Map == null) || searchType === "map_area_radio") {
			this._DoMapAreaRadioSearch(url);
			return
		}
		this._SafeURL(this._Config.canonicalwebroot + SEOService.AddLanguage(url))
	},
	_DoRadiusSearch : function(seoQuery) {
		var me = this;
		var ajaxUrl = this._Config.canonicalwebroot + String.Format(LocationServiceRoot + "/getradiussearch.ashx?seoquery={0}&center=", SEOService.AddLanguage(seoQuery));
		gts.$.getJSONP(ajaxUrl, function(data) {
			var newSeoQuery = trim(data).split("|")[0];
			newSeoQuery = SEOService.AddLanguage(newSeoQuery);
			newSeoQuery = SEOService.NormalizeSEOQuery(newSeoQuery);
			me._SafeURL(me._Config.canonicalwebroot + newSeoQuery)
		})
	},
	_DoMapAreaRadioSearch : function(seoQuery) {
		var me = this;
		var mapUrl = me._Config.canonicalwebroot + LocationServiceRoot + "/getmapareasearch.ashx?seoquery=" + SEOService.AddLanguage(seoQuery);
		gts.$.get(mapUrl, function(responseUrl) {
			responseUrl = SEOService.AddLanguage(responseUrl);
			responseUrl = SEOService.NormalizeSEOQuery(responseUrl);
			me._SafeURL(me._Config.canonicalwebroot + responseUrl)
		})
	},
	_SafeURL : function(url) {
		var launcherForm = document.createElement("form");
		launcherForm.setAttribute("action", url);
		launcherForm.setAttribute("method", "post");
		launcherForm.setAttribute("target", "_top");
		document.body.appendChild(launcherForm);
		launcherForm.submit()
	},
	OpenEmbedddedSchoolDistrictsModule : function() {
		var placeHolderId = "#school_districts_target_placeholder";
		if (!this._SchoolDistrictsEmbeddedLoaded) {
			var schoolDistrictsXslParams = {
				SeoQuery : LandingPageSearchModule.GetChannel() + "/" + this._SelectedSchoolDistrictsSeo,
				TargetEle : placeHolderId,
				Layout : "lpscontrol"
			};
			var me = this;
			gts.$(document).off("SchoolDistrictsModalCheckedChanged" + RenoEventsNS).on("SchoolDistrictsModalCheckedChanged" + RenoEventsNS, function(ev, params) {
				gts.$("#global_lps_selected_location_seo").val(params.schoolDistrictState);
				me._SelectedSchoolDistrictsSeo = params.schoolDistrictsSeo
			});
			this._SchoolDistrictsEmbeddedLoaded = SchoolDistrictsWidget.OpenEmbedded(schoolDistrictsXslParams)
		} else {
			var currentLocation = gts.$("#global_lps_selected_location_seo").val();
			var stateDropDown = gts.$(placeHolderId).find("#school_district_state_opts");
			if (stateDropDown.find("option[value='" + currentLocation + "']").length > 0) {
				stateDropDown.val(currentLocation)
			}
		}
	},
	_SchoolDistrictsModalLoaded : false,
	_SchoolDistrictsModalLoading : false,
	OpenModalSchoolDistrictsModule : function() {
		if (this._SchoolDistrictsModalLoading || this._SchoolDistrictsModalLoaded) {
			return
		}
		var schoolDistrictsXslParams = {
			SeoQuery : LandingPageSearchModule.GetChannel() + "/" + this._SelectedSchoolDistrictsSeo
		};
		var me = this;
		gts.$(document).off("SchoolDistricsModalLoaded" + RenoEventsNS);
		gts.$(document).on("SchoolDistricsModalLoaded" + RenoEventsNS, function() {
			me._SchoolDistrictsModalLoading = false
		});
		gts.$(document).off("SchoolDistrictsModalSelectionCancelled" + RenoEventsNS);
		gts.$(document).on("SchoolDistrictsModalSelectionCancelled" + RenoEventsNS, function(ev, params) {
			me._SchoolDistrictsModalLoaded = false;
			gts.$(document).off("SchoolDistrictsModalSelectionCancelled" + RenoEventsNS);
			me._SetSchoolDistrictsToLocationTermField(params)
		});
		gts.$(document).off("SchoolDistrictsModalSelectionCommitted" + RenoEventsNS);
		gts.$(document).on("SchoolDistrictsModalSelectionCommitted" + RenoEventsNS, function(ev, params) {
			me._SchoolDistrictsModalLoaded = false;
			gts.$(document).off("SchoolDistrictsModalSelectionCommitted" + RenoEventsNS);
			me._SetSchoolDistrictsToLocationTermField(params)
		});
		me._SchoolDistrictsModalLoading = true;
		SchoolDistrictsWidget.OpenModal(schoolDistrictsXslParams)
	},
	_SetSchoolDistrictsToLocationTermField : function(params) {
		this._SelectedSchoolDistrictsSeo = typeof (params.schoolDistrictsSeo) != "undefined" ? params.schoolDistrictsSeo : "";
		this._SelectedSchoolDistrictNames = typeof (params.schoolDistrictNames) != "undefined" ? params.schoolDistrictNames : "";
		var lpsTerm = "";
		if ( typeof (this._SelectedSchoolDistrictsSeo) != "undefined" && this._SelectedSchoolDistrictsSeo !== "") {
			lpsTerm = "school districts: " + this._SelectedSchoolDistrictNames.join(", ")
		}
		gts.$("#LPSTerm").val(lpsTerm)
	}
};
function SearchHeightObj() {
	this._Criteria = undefined;
	this.Initialize = function() {
		this._Criteria = gts.$(">.criteria", "#location_search");
		this.setHeight()
	};
	this.setHeight = function() {
		this._Criteria.css("height", "");
		this._Criteria.height(this._Criteria.height())
	}
};;;;
LandingPageSearchModule._SetToolTip = function() {
};
LandingPageSearchModule.LinkViewTypeRadioButtons = function() {
};
LandingPageSearchModule.TabAction = function(parentId, childId) {
	gts.$("#" + parentId + ">li").removeClass("selected");
	gts.$("#" + parentId + ">option").removeClass("selected");
	gts.$("#" + childId).addClass("selected")
};
LandingPageSearchModule.SwitchSearchType = function(type) {
	var me = this;
	gts.$(".location").removeClass("none").addClass("none");
	gts.$("#searchby_" + type).removeClass("none");
	switch(type) {
		case"type_location":
			this._InitializeSuggest_Location(this._ModuleId);
			gts.$(".view-toggle").show();
			this._LoadLocationFromDefaults();
			break;
		case"type_radius":
			this._InitializeSuggest_Radius(this._ModuleId);
			this._InitializeRadiusSelector();
			gts.$(".view-toggle").show();
			this._LoadLocationFromDefaults(function() {
				me._AjaxAdjustRadiusSelector(me._LocationSuggestObject.TextSelectedDataEle.val())
			});
			break;
		case"type_map-area":
			this._InitializeSuggest_MapArea(this._ModuleId);
			this._InitializeMapAreaMap();
			gts.$(".view-toggle").hide();
			this._LoadLocationFromDefaults(function() {
				if (me._MapIdleReceived) {
					me._RecenterMapAreaToSelectedOrDefaultLocationSeo()
				}
			});
			break;
		case"type_school_district":
			_LPPerformSearchModule.OpenEmbedddedSchoolDistrictsModule();
			break;
		case"school_district":
			_LPPerformSearchModule.OpenModalSchoolDistrictsModule();
			break
	}
	if ( typeof (window.searchHeight) != "undefined") {
		window.searchHeight.setHeight()
	}
};
LandingPageSearchModule.GetChannel = function() {
	var channel = lpsconfig.channel;
	var selectedChannelInput = gts.$('input:checked[id^="lps_"][name="channel"]');
	if (selectedChannelInput.length === 1 && String.Trim(selectedChannelInput.val()) !== "") {
		channel = String.Trim(selectedChannelInput.val())
	}
	var selectedChannelSelect = gts.$('select:visible[id^="lps_"][name="channel"]');
	if (selectedChannelSelect.length === 1 && String.Trim(selectedChannelSelect.val()) !== "") {
		channel = String.Trim(selectedChannelSelect.val())
	}
	return channel
};
LandingPageSearchModule._InitializeRadiusSelector = function() {
	var me = this;
	try {
		if (!this._RadiusSelectorInitialized && gts.$("#distance_range").length > 0 && RadiusOpts != undefined && RadiusOpts.length > 0) {
			var defaultIndex = 0;
			for (var x = RadiusOpts.length - 1; x >= 0; x--) {
				var opValue = parseFloat(RadiusOpts[x].replace(/[^0-9\.]+/g, ""));
				var defaultValue = parseFloat(lpsconfig.default_map_radius);
				if (opValue <= defaultValue) {
					defaultIndex = x;
					break
				}
			}
			if (defaultIndex === 0) {
				defaultIndex = parseInt(RadiusOpts.length / 2, 10)
			}
			gts.$("#distance_range_values").html(me._GetRadiusSelectorValue(defaultIndex));
			gts.$("#distance_range_seo").val(GetSeoPart(seoPartType.Radius, RadiusOpts[defaultIndex].replace(new RegExp("[^0-9.]+", "g"), "")));
			gts.$("#distance_range").slider({
				range : "min",
				min : 0,
				max : RadiusOpts.length - 1,
				step : 1,
				value : defaultIndex,
				slide : function(event, ui) {
					gts.$("#distance_range_values").html(me._GetRadiusSelectorValue(ui.value))
				},
				stop : function(event, ui) {
					gts.$("#distance_range_seo").val(GetSeoPart(seoPartType.Radius, RadiusOpts[ui.value].replace(new RegExp("[^0-9.]+", "g"), "")))
				}
			});
			this._RadiusSelectorInitialized = true
		}
	} catch(e) {
	}
};
LandingPageSearchModule._SetLocationTermEleDefault = function() {
	if (this._LocationTermEle.length <= 0) {
		return
	}
	var seoEle = gts.$("#LPSLocationSuggested");
	if (this._SetLocationTermEleFromPossiblePersistSearch(this._LocationTermEle, seoEle)) {
		return
	}
	if (!lpsconfig.location_selection_required) {
		return
	}
	if (this._LocationTermEle.length > 0 && lpsconfig.default_region_name !== undefined && lpsconfig.default_region_name !== "") {
		this._LocationTermEle.val(lpsconfig.default_region_name);
		seoEle.val(lpsconfig.seo_location_default)
	}
};
LandingPageSearchModule._SetRadiusTermEleDefault = function() {
	var nameEle = gts.$("#LPSTerm_Radius");
	if (nameEle.length <= 0) {
		return
	}
	var seoEle = gts.$("#LPSLocationSuggested_Radius");
	if (this._SetLocationTermEleFromPossiblePersistSearch(nameEle, seoEle)) {
		return
	}
	nameEle.val(lpsconfig.default_region_name);
	seoEle.val(lpsconfig.seo_location_default)
};
LandingPageSearchModule._SetMapAreaTermEleDefault = function() {
	var nameEle = gts.$("#LPSTerm_MapArea");
	if (nameEle.length <= 0) {
		return
	}
	var seoEle = gts.$("#LPSLocationSuggested_MapArea");
	if (this._SetLocationTermEleFromPossiblePersistSearch(nameEle, seoEle)) {
		return
	}
	nameEle.val(lpsconfig.default_region_name);
	seoEle.val(lpsconfig.seo_location_default)
};
_LPPerformSearchModule._GetVisibleSelectValues = function() {
	var me = this;
	var refinements = new Array();
	gts.$('select:visible[id^="lps_"][name!="channel"]:not(.price)').each(function() {
		var val = gts.$(this).val();
		if (val !== "") {
			refinements.push(val)
		}
	});
	return refinements
};
_LPPerformSearchModule._GetCheckedValues = function() {
	var me = this;
	var refinements = new Array();
	gts.$('input:checked[id^="lps_"][name!="channel"]').each(function() {
		var val = gts.$(this).val();
		if (val !== "") {
			refinements.push(val)
		}
	});
	return refinements
};
_LPPerformSearchModule.GetSearchType = function() {
	var context = gts.$(".lpsw");
	var searchType = "location";
	if (gts.$("#tabs_search_type", context).length > 0) {
		searchType = gts.$("#tabs_search_type .selected", context).attr("id").replace("tab_", "")
	} else {
		if (gts.$("#search_type", context).length > -1) {
			gts.$("#search_type input[type='radio']", context).each(function() {
				if (this.checked) {
					searchType = this.value
				}
			})
		}
	}
	return searchType
};
_LPPerformSearchModule.GetLocationTermValueBasedOnSearchType = function(searchType) {
	var locationValue = "";
	if (searchType === SearchType.MapArea) {
		locationValue = gts.$("#LPSTerm_MapArea").val()
	} else {
		if (searchType === SearchType.Radius) {
			locationValue = gts.$("#LPSTerm_Radius").val()
		} else {
			if (searchType === SearchType.SchoolDistrict) {
				locationValue = this._Config.seo_location_default
			} else {
				if (searchType === SearchType.Location || searchType === "map_area_radio" || searchType === "radius_radio") {
					locationValue = gts.$("#LPSTerm").val()
				}
			}
		}
	}
	if ( typeof (locationValue) == "undefined" || locationValue == null) {
		locationValue = ""
	}
	return locationValue.seoEncodeComponent()
};
_LPPerformSearchModule._ShowSmartSearchModal = function(smartSearchResponse, searchType) {
	var me = this;
	var dymModal = document.createElement("div");
	var title = document.createElement("h2");
	var content = document.createElement("div");
	var zip = false;
	var i = 0;
	content.className = "dym";
	gts.$.each(smartSearchResponse.dymresult.matchgroups, function(key, item) {
		var value = item.matchgroup;
		if (value.directive === "only_keyword_zip_usa") {
			me._DoSmartSearch(value.match[0].seopath, searchType);
			zip = true;
			return
		} else {
			if (value.directive.indexOf("agent") === -1 && value.directive.indexOf("building") === -1) {
				var match = document.createElement("div"), description = document.createElement("div");
				match.className = "match";
				description.className = "description";
				description.innerHTML = value.description;
				match.appendChild(description);
				gts.$.each(value.match, function(key, value) {
					var item = document.createElement("div");
					var anchor = document.createElement("a");
					anchor.innerHTML = value.title;
					item.appendChild(anchor);
					item.onclick = function() {
						me._DoSmartSearch(value.seopath, searchType)
					};
					match.appendChild(item);
					i++
				});
				content.appendChild(match)
			}
		}
	});
	if (zip) {
		return false
	}
	title.innerHTML = "Did You Mean To Search For";
	dymModal.appendChild(title);
	dymModal.appendChild(content);
	if (i > 0) {
		gts.$.modal(dymModal)
	} else {
		alert(String.Format("Your search for '{0}' returned zero results. Please try another term", smartSearchResponse.query.keyword))
	}
	return true
};
;;;
var _AcresRangeModule = {
	SetUpAcresRangeSelectMenu : function() {
		var me = this;
		if ( typeof lpsconfig == "undefined") {
			return
		}
		if (gts.$("select.acres_min").length == 0 && gts.$("select.acres_max").length == 0) {
			return
		}
		var acres = [AcresRangeOpts[0][1], AcresRangeOpts[AcresRangeOpts.length-1][1]];
		if (AcresRangeOpts[0][1] != 0 || AcresRangeOpts[AcresRangeOpts.length-1][0].toString().toLowerCase().indexOf("max") < 0) {
			if (AcresRangeOpts[0][1] != 0) {
				gts.$("select.acres_min option:first").html(AcresRangeOpts[0][0])
			}
			if (AcresRangeOpts[AcresRangeOpts.length-1][0].toString().toLowerCase().indexOf("max") < 0) {
				gts.$("select.acres_max option:first").html(AcresRangeOpts[AcresRangeOpts.length-1][0])
			}
			gts.$("#lps_form_slider_acres_value").val(GetSeoPart(seoPartType.Acres, AcresRangeOpts[0][1] + "-" + AcresRangeOpts[AcresRangeOpts.length-1][1]))
		}
		gts.$("select.acres_max").change(function() {
			acres[1] = this.value;
			if (parseInt(acres[0]) > parseInt(acres[1])) {
				gts.$("select.acres_min").val(AcresRangeOpts[0][1]);
				acres[0] = AcresRangeOpts[0][1]
			}
			var acresStr = GetSeoPart(seoPartType.Acres, acres.join("-"));
			gts.$("#lps_form_slider_acres_value").val(acresStr)
		});
		gts.$("select.acres_min").change(function() {
			acres[0] = this.value;
			if (parseInt(acres[0]) > parseInt(acres[1])) {
				gts.$("select.acres_max").val(AcresRangeOpts[AcresRangeOpts.length-1][1]);
				acres[1] = AcresRangeOpts[AcresRangeOpts.length-1][1]
			}
			var acresStr = GetSeoPart(seoPartType.Acres, acres.join("-"));
			gts.$("#lps_form_slider_acres_value").val(acresStr)
		})
	}
};
;;;
var _PriceRangeModule = {
	_CheckPrice : function(iPrice) {
		return NumberFormatting.NumberFormatterFactory.GetNumberFormatter(NumberFormatting.NumberFormatterType.Price).ToNumber(iPrice)
	},
	_SetUpPriceRangeSelectMenu : function() {
		var me = this;
		if ( typeof lpsconfig == "undefined") {
			return
		}
		if (gts.$("select.price_min").length == 0 && gts.$("select.price_max").length == 0) {
			return
		}
		var price = [PriceRangeOpts[0][1], PriceRangeOpts[PriceRangeOpts.length-1][1]];
		if (PriceRangeOpts[0][1] != 0 || PriceRangeOpts[PriceRangeOpts.length-1][0].toString().toLowerCase().indexOf("max") < 0) {
			if (PriceRangeOpts[0][1] != 0) {
				gts.$("select.price_min option:first").html(PriceRangeOpts[0][0])
			}
			if (PriceRangeOpts[PriceRangeOpts.length-1][0].toString().toLowerCase().indexOf("max") < 0) {
				gts.$("select.price_max option:first").html(PriceRangeOpts[PriceRangeOpts.length-1][0])
			}
			gts.$("#lps_form_slider_price_value").val(GetSeoPart(seoPartType.Price, PriceRangeOpts[0][1] + "-" + PriceRangeOpts[PriceRangeOpts.length-1][1]))
		}
		gts.$("select.price").change(function() {
			if (gts.$(this).hasClass("price_min")) {
				price[0] = this.value
			}
			if (gts.$(this).hasClass("price_max")) {
				price[1] = this.value
			}
			var priceStr = GetSeoPart(seoPartType.Price, price.join("-"));
			gts.$("#lps_form_slider_price_value").val(priceStr)
		});
		gts.$("select.price_max").change(function() {
			price[1] = this.value;
			if (parseInt(price[0]) > parseInt(price[1])) {
				gts.$("select.price_min").val(PriceRangeOpts[0][1]);
				price[0] = PriceRangeOpts[0][1]
			}
			var priceStr = GetSeoPart(seoPartType.Price, price.join("-"));
			gts.$("#lps_form_slider_price_value").val(priceStr)
		});
		gts.$("select.price_min").change(function() {
			price[0] = this.value;
			if (parseInt(price[0]) > parseInt(price[1])) {
				gts.$("select.price_max").val(PriceRangeOpts[PriceRangeOpts.length-1][1]);
				price[1] = PriceRangeOpts[PriceRangeOpts.length-1][1]
			}
			var priceStr = GetSeoPart(seoPartType.Price, price.join("-"));
			gts.$("#lps_form_slider_price_value").val(priceStr)
		})
	}
};
_PriceRangeModule._ModuleEle = null;
_PriceRangeModule._CurrentPriceMin = null;
_PriceRangeModule._CurrentPriceMax = null;
_PriceRangeModule._NewISOCurrencySymbol = null;
_PriceRangeModule._PriceRangeSlider = null;
_PriceRangeModule._PriceRangeTextboxes = null;
_PriceRangeModule._PriceRangeSliderContainerEle = null;
_PriceRangeModule._PriceRangeSeoPartName = "priceRange";
_PriceRangeModule._PriceRangeNumberFormatter = null;
_PriceRangeModule.Initialize = function(params) {
	this._ModuleEle = params.moduleEle;
	this._SetupPriceRange(params.min, params.max)
};
_PriceRangeModule._SetupPriceRange = function(min, max) {
	if ( typeof min !== "undefined" && typeof max != "undefined") {
		this._CurrentPriceMin = min;
		this._CurrentPriceMax = max
	}
	this._PriceRangeSliderContainerEle = gts.$("#PriceRange-container", this._ModuleEle);
	if (this._PriceRangeNumberFormatter == null) {
		this._PriceRangeNumberFormatter = NumberFormatting.NumberFormatterFactory.GetNumberFormatter(NumberFormatting.NumberFormatterType.Price)
	}
	this._SetupPriceRangeTextboxes();
	this._SetupPriceRangeSlider();
	this._SetUpPriceRangeSelectMenu()
};
_PriceRangeModule._SetupPriceRangeTextboxes = function() {
	var me = this;
	this._PriceRangeTextboxes = RangeTextBoxesFactory.GetRangeTextBoxes({
		type : RangeTextBoxesType.Price,
		minNum : this._CurrentPriceMin,
		maxNum : this._CurrentPriceMax,
		rangeOpts : PriceRangeOpts,
		containerEle : gts.$("#pricerangetextboxes", this._ModuleEle),
		formatter : this._PriceRangeNumberFormatter,
		onChangeCallback : function(newOptions) {
			me._OnPriceRangeTextBoxValuesChanged(newOptions)
		}
	})
};
_PriceRangeModule._SetupPriceRangeSlider = function() {
	var me = this;
	var ele = gts.$(".js-range-price", this._ModuleEle);
	var inputsPosition = ( typeof ele.data("slider-textbox-position") == "string") ? ele.data("slider-textbox-position") : "bottom";
	var max = PriceRangeOpts.length - 1;
	ele.renoSmartSliderPrice({
		rangeOpts : PriceRangeOpts,
		numberFormatter : NumberFormatting.NumberFormatterFactory.GetNumberFormatter(NumberFormatting.NumberFormatterType.Price, {
			addCurrencySymbolInFormatNumber : false
		}),
		minIndex : 0,
		maxIndex : max,
		current : 0 + "," + max,
		wrapInputs : "slider__ranges",
		wrapPosition : inputsPosition,
		inputType : "text",
		onStop : function(data) {
			me._OnPriceRangeSliderStop(data.minSeo, data.maxSeo)
		}
	}).data("gts-renoSmartSliderPrice")
};
_PriceRangeModule._OnPriceRangeSliderSlide = function(newMin, newMax) {
	this._PriceRangeTextboxes.SetValues(newMin, newMax)
};
_PriceRangeModule._OnPriceRangeSliderStop = function(newMin, newMax) {
	this._PriceRangeTextboxes.SetValues(newMin, newMax);
	this._ChangePriceRange(newMin, newMax)
};
_PriceRangeModule._OnPriceRangeTextBoxValuesChanged = function(newOptions) {
	if (newOptions.minAndMaxAreAtLimits) {
		this.ResetPrice();
		return
	}
	this._PriceRangeSlider.SetValues(newOptions.min, newOptions.max);
	this._ChangePriceRange(newOptions.min[1], newOptions.max[1])
};
_PriceRangeModule.ResetPrice = function() {
	this._PriceRangeSlider.reset();
	this._PriceRangeTextboxes.Reset();
	_PriceRangeModule._ChangePriceRange("", "")
};
_PriceRangeModule._ChangePriceRange = function(newMin, newMax) {
	this._CurrentPriceMin = newMin;
	this._CurrentPriceMax = newMax;
	gts.$(".ui-slider-handle", this._PriceRangeSliderContainerEle).blur();
	var priceRangeSeoPart = "";
	if (newMin != "" || newMax != "") {
		priceRangeSeoPart = GetSeoPart(seoPartType.Price, String.Format("{0}-{1}", newMin, newMax))
	}
	gts.$("#lps_form_slider_price_value", this._ModuleEle).val(priceRangeSeoPart)
};
;;;
_PriceRangeModule._SetupPriceRangeSlider = function() {
	var me = this;
	this._PriceRangeSlider = new PriceRangeSlider({
		rangeOpts : PriceRangeOpts,
		selectorPrefix : "PriceRange",
		selector : gts.$("#PriceRange", this._PriceRangeSliderContainerEle),
		sliderContext : this._ModuleEle,
		currentmin : this._CurrentPriceMin,
		currentmax : this._CurrentPriceMax,
		formatter : this._PriceRangeNumberFormatter,
		stopIsResettingHandler : function() {
			me.ResetPrice()
		},
		onSlide : function(newMin, newMax) {
			me._OnPriceRangeSliderSlide(newMin, newMax)
		},
		stopHandler : function(newMin, newMax) {
			me._OnPriceRangeSliderStop(newMin, newMax)
		}
	})
};
;;;
var arrFirstLoaded = [];
$(document).on("populate_first_load_seo", function() {
	arrFirstLoaded.length = 0
});
function DoSCGTab(id) {
	var noneSelector = (isResponsive) ? "is-hidden" : "none", scgContent = gts.$("#scg_content_" + id), scgSelectItems = scgContent.find("select"), scgFirstSelectItem = scgSelectItems.first();
	gts.$(".scg_tab, .scg_content").addClass(noneSelector).prop("disabled", true);
	gts.$(String.Format("#scg_tab_{0}, #scg_content_{0}", id)).removeClass(noneSelector).prop("disabled", false);
	if (scgFirstSelectItem.find("option").length <= 1) {
		scgSelectItems.each(function() {
			_ResetSelect(gts.$(this))
		});
		scgFirstSelectItem.prop("disabled", false);
		if (isMobileWebsite) {
			scgFirstSelectItem.selectmenu("enable")
		}
		eval(scgFirstSelectItem.attr("reload"))
	}
	if (window.searchHeight) {
		window.searchHeight.setHeight()
	}
}

function _ResetSelect(select) {
	var options = select[0].options;
	if (!select.hasClass("disabled") || options.length !== 1) {
		select.addClass("disabled").prop("disabled", true);
		if (isMobileWebsite) {
			select.selectmenu("disable")
		}
		options.length = 0;
		options[0] = new Option(select.attr("default"), "");
		if (isMobileWebsite) {
			select.selectmenu("refresh")
		}
	}
}

var SearchComboGroupUtility = {
	Initializing : false,
	Initialize : function() {
		this.Initializing = true;
		this._LoadFirstDropdownData();
		this.Initializing = false
	},
	_LoadFirstDropdownData : function() {
		var firstDropDown = gts.$(".scg_content select:eq(0)");
		firstDropDown.prop("disabled", false);
		eval(firstDropDown.attr("reload"))
	}
};
var _SearchComboGroupSuggestUtility = {
	SetBestSelectedLocationToSuggest : function() {
		if (SearchComboGroupUtility.Initializing && PersistSearchLocation != "" && PersistSearchLocationSeo != "") {
			return
		}
		var selectedVal = "";
		var selectedText = "";
		var selectedOption = this._GetLowestLevelLocationDropdownSelectedOption();
		if (selectedOption != null) {
			selectedVal = selectedOption.val();
			selectedText = selectedOption.text()
		}
		if (selectedVal == "") {
			this._SetDefaultValueToSuggest();
			return
		}
		this.SetValueToSuggest(selectedVal, selectedText);
		this.SetSuggestValueToHiddenSelectedLocationFields()
	},
	_GetLowestLevelLocationDropdownSelectedOption : function() {
		var found = null;
		var noneSelector = ( typeof isResponsive != "undefined" && isResponsive == true) ? ".is-hidden" : ".none";
		gts.$(".scg_content:not(" + noneSelector + ") select").each(function() {
			var selectedOption = gts.$("option:gt(0):selected", this);
			if (selectedOption.length > 0) {
				found = selectedOption;
				return false
			}
		});
		return found
	},
	SetValueToSuggest : function(seo, text) {
		gts.$("#LPSLocationSuggested").val(seo);
		gts.$("#LPSTerm").val(text)
	},
	_SetDefaultValueToSuggest : function() {
		if (gts.$("#LPSTerm").attr("default") != "") {
			this.SetValueToSuggest("", gts.$("#LPSTerm").attr("default"))
		} else {
			this.SetValueToSuggest(lpsconfig.searchtoplevelseo, "All Locations")
		}
	},
	SetSuggestValueToHiddenSelectedLocationFields : function() {
		var selectedLocationNameEle = gts.$("#global_lps_selected_location_name");
		var selectedLocationSeoEle = gts.$("#global_lps_selected_location_seo");
		if (selectedLocationNameEle.length <= 0 || selectedLocationSeoEle.length <= 0) {
			return
		}
		selectedLocationNameEle.val(gts.$("#LPSTerm").val());
		selectedLocationSeoEle.val(gts.$("#LPSLocationSuggested").val())
	},
	SetSelectedOptionToSuggest : function(dropDown) {
		if (SearchComboGroupUtility.Initializing && PersistSearchLocation != "" && PersistSearchLocationSeo != "") {
			return
		}
		var options = dropDown[0].options;
		if (options.selectedIndex <= 0) {
			return
		}
		var name = options[options.selectedIndex].text;
		name = trim(name.replace(/\([0-9,]+\)/, ""));
		_SearchComboGroupSuggestUtility.SetValueToSuggest(options[options.selectedIndex].value, name);
		_SearchComboGroupSuggestUtility.SetSuggestValueToHiddenSelectedLocationFields()
	}
};
var LandingPageSearchComboGroup = {
	LoadSCG : function(sourceSeo, targetQuery, tabId, targetId, selectId, position, channel, callback) {
		var me = this;
		var comboGroupSelector = "#scg_combo_" + tabId + "_" + selectId;
		if (targetQuery.indexOf("|") > -1 && targetId.indexOf("|") > -1) {
			var targetQueryGroup = targetQuery.split("|");
			var targetIdGroup = targetId.split("|");
			this.LoadSCG(sourceSeo, targetQueryGroup[0], tabId, targetIdGroup[0], selectId, position + 1, channel, function() {
				me.LoadSCG(sourceSeo, targetQueryGroup[1], tabId, targetIdGroup[1], selectId, position + 2, channel)
			});
			return
		}
		if (gts.$(comboGroupSelector)[0].selectedIndex == 0) {
			gts.$("#scg_content_" + tabId + " select").each(function(index) {
				if (index == position - 2) {
					var oc = gts.$(this).attr("onchange").toString();
					if (oc.indexOf("|") > -1) {
						gts.$(this).trigger("change");
						return
					}
				}
			})
		}
		var selArray = new Array();
		gts.$("#scg_content_" + tabId + " select").each(function(index) {
			if (index > position) {
				selArray.push(gts.$(this))
			}
		});
		selArray.reverse();
		for (var x = 0; x < selArray.length; x++) {
			_ResetSelect(selArray[x])
		}
		_SearchComboGroupSuggestUtility.SetBestSelectedLocationToSuggest();
		_SearchComboGroupSuggestUtility.SetSelectedOptionToSuggest(gts.$(comboGroupSelector));
		if (sourceSeo == "" || targetId == "") {
			return
		}
		this._LoadData(tabId, targetId, channel, targetQuery, sourceSeo, callback)
	},
	_LoadData : function(tabId, targetId, channel, targetQuery, sourceSeo, callback) {
		var jsonUrl = this._GetWidgetUrl(channel, targetQuery, sourceSeo);
		var me = this;
		gts.$.ajax({
			type : "GET",
			contentType : "application/json; charset=utf-8",
			url : jsonUrl,
			data : "{}",
			dataType : "jsonp",
			async : true,
			error : function(xmlHttpRequest, textStatus, errorThrown) {
				log.debug("Json Error Message: error(" + errorThrown + ') "' + textStatus + '"')
			},
			success : function(response) {
				var targetSelector = "#scg_combo_" + tabId + "_" + targetId;
				me._OnDataLoaded(response, targetSelector, callback);
				if ( typeof (callback) == "function") {
					callback()
				}
			}
		})
	},
	_OnDataLoaded : function(response, targetSelector) {
		var targetEle = gts.$(targetSelector);
		var hasValidResponseGroupOptions = response.selectlocations && typeof (response.selectlocations.location) != "undefined" && response.selectlocations.location.length > 0;
		if (hasValidResponseGroupOptions) {
			_ResetSelect(targetEle);
			this._AddOptionsToDropdown(targetEle, response.selectlocations.location);
			targetEle.removeClass("disabled").prop("disabled", false);
			if (isMobileWebsite) {
				targetEle.selectmenu("enable")
			}
			_SearchComboGroupSuggestUtility.SetSuggestValueToHiddenSelectedLocationFields();
			if (gts.$.inArray(targetSelector, arrFirstLoaded) === -1) {
				var firstLoadSeo = targetEle.attr("first_load_seo");
				if (firstLoadSeo && targetEle.filter(":has(option[value='" + firstLoadSeo + "'])").length) {
					targetEle.val(firstLoadSeo);
					targetEle.trigger("change");
					arrFirstLoaded.push(targetSelector)
				}
			}
		} else {
			if (gts.deviceIs.mobile) {
				setTimeout(function() {
					targetEle.parent().find(".selectboxit-rendering").removeClass("selectboxit-rendering").addClass("selectboxit-disabled")
				}, 50)
			}
		}
		if ( typeof (gts.$("body").selectBoxIt) != "undefined") {
			gts.$(targetEle).selectBoxIt("refresh")
		}
	},
	_AddOptionsToDropdown : function(targetEle, locations) {
		for (var x = 0; x < locations.length; x++) {
			var option = locations[x].location;
			var targetEleOptions = targetEle[0].options;
			if (option.name == null || option.name == "" || option.seo == null || option.seo == "") {
				continue
			}
			targetEleOptions[targetEleOptions.length] = new Option(option.name, option.seo)
		}
		if ( typeof gts.$(targetEle).data("selectBox-selectBoxIt") != "undefined") {
			gts.$(targetEle).trigger("enable.selectBoxIt")
		}
	},
	_GetWidgetUrl : function(channel, targetQuery, sourceSeo) {
		return String.Format("{0}/search.ashx?channel={1}&searchtype={2}&returntype=json&maxreturns=350&term={3}", lpsconfig.searchserviceroot, channel, targetQuery, sourceSeo.toLowerCase())
	}
};
function LoadSCG(sourceSeo, targetQuery, tabId, targetId, selectId, position, channel, callback) {
	return LandingPageSearchComboGroup.LoadSCG(sourceSeo, targetQuery, tabId, targetId, selectId, position, channel, callback)
};;;;
LandingPageSearchComboGroup._AddOptionsToDropdown = function(targetEle, locations) {
	for (var x = 0; x < locations.length; x++) {
		var option = locations[x].location;
		var targetEleOptions = targetEle[0].options;
		if (option.name == null || option.name == "" || option.seo == null || option.seo == "") {
			continue
		}
		targetEleOptions[targetEleOptions.length] = new Option(option.name, option.seo)
	}
};
LandingPageSearchComboGroup._OnDataLoaded = function(response, targetSelector) {
	var targetEle = gts.$(targetSelector);
	var hasValidResponseGroupOptions = response.selectlocations && typeof (response.selectlocations.location) != "undefined" && response.selectlocations.location.length > 0;
	if (hasValidResponseGroupOptions) {
		_ResetSelect(targetEle);
		this._AddOptionsToDropdown(targetEle, response.selectlocations.location);
		targetEle.removeClass("disabled").attr("disabled", false);
		if (isMobileWebsite) {
			targetEle.selectmenu("enable")
		}
		_SearchComboGroupSuggestUtility.SetSuggestValueToHiddenSelectedLocationFields();
		if (gts.$.inArray(targetSelector, arrFirstLoaded) === -1) {
			var firstLoadSeo = targetEle.attr("first_load_seo");
			if (firstLoadSeo && targetEle.filter(":has(option[value='" + firstLoadSeo + "'])").length) {
				targetEle.val(firstLoadSeo);
				targetEle.trigger("change");
				arrFirstLoaded.push(targetSelector)
			}
		}
	}
};
;;