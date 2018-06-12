var store = [1, 5, 4];
var bool = true;
var currentImage;
var imagesdata;
var skipImages;
var len1;
var len2;
var showImgHold = {};
var imagesHold = {};
$(document).ready(function() {
	$.getJSON("assets/json/imgdata.json", function(response) {
		//console.log(response);
		imagesdata = response.imagesdata;
		skipImages = response.skipImages;
		len1 = imagesdata.length;
		len2 = skipImages.length;
		for (var k = 0; k < len1; k++) {
			showImg.push(imagesdata[k].imgsrc);
		}
		for (var l = 0; l < len2; l++) {
			images.push(skipImages[l].imgsrc);
		}

		random();

	});

});

function random() {
	bool = false;
	callNo = Math.floor((Math.random() * 7));
	for (var s = 0; s < store.length; s++) {
		if (store[s] == callNo) {
			bool = true;
			break;
		}
	}

	if (bool) {
		//console.log("callNo  " + callNo)
		random();
		return false;
	}

	//console.log("callNo------------->" + callNo)
	store.push(callNo);
	if (store.length == 4) {
		currentImage = store[0];
		//console.log(currentImage);
		//console.log("currentImage 2")
		store.splice(0, 1);

		showImgHold = [];
		imagesHold = [];

		demo(0);

	}

}

function demo(index) {
	//console.log("demo 3")

	//var imgSrc = Math.floor((Math.random() * len1));
	var src = Math.floor((Math.random() * len2));
	//3 len
	//	console.log(src);
	showImgHold = {
		'key' : currentImage,
		'val' : showImg[currentImage]
	};
	imagesHold = {
		'key' : src,
		'val' : images[src]
	};
	images.splice(src, 1);
	//len 3  now 2
	showImg.splice(currentImage, 1);
	// len7  now 6
	j = 0;
	opacityModify(index)
}

function opacityModify(index) {
	$(".animateImges li").eq((showImgHold['key'])).find("img").fadeOut(500, "linear", function() {
		setArr(index)
	});

}

function setArr(index) {
	images.splice(imagesHold['key'], 0, showImgHold['val'])// 2 now 3
	showImg.splice(showImgHold['key'], 0, imagesHold['val'])// 6 now 7
	$(".animateImges li").eq(showImgHold['key']).find("img").attr("src", imagesHold['val']).fadeIn(500, "linear", function() {
		setTimeout(function() {
			random();
		}, 3000)
	});

}