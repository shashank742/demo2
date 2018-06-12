<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta content="" name="description">
		<title>Can of Bliss</title>
		<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
		<link href="https://fonts.googleapis.com/css?family=Cabin:400,400i,500,600,700" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.css" media="screen">
		<link rel="stylesheet" type="text/css" href="assets/css/slick.css" media="screen">
		<link rel="stylesheet" type="text/css" href="assets/css/global.css" media="screen">
		<link rel="stylesheet" type="text/css" href="assets/css/style.css" media="screen">
		<link rel="stylesheet" type="text/css" href="assets/css/responsive.css" media="screen">
		<style>
			.datamap{
/*				left:0px;*/
				/*height: 600px; 
				width: 1300px;*/
			}
		</style>
		<script src="assets/js/jquery-1.12.4.js"></script>
		<script src="http://d3js.org/d3.v3.min.js"></script>
		<script src="http://d3js.org/topojson.v1.min.js"></script>
		<script src="https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/datamaps.none.js"></script>
	</head>
	<body>
		<!--Page Wrapper Start-->
		<div class="wrapper">
			<!--Header Section Start-->
			<?php
			include 'includes/header.php';
			?>
			<!--Header Section End-->

			<!--Content Area Start-->
			<div class="content">
				<section class="farmer-meet text-center strain-platinum">
					<div class="container">
						<div class="row">
							<div class="col-xs-12">
								<figure>
									<img src="assets/images/frame.png" alt="frame" />
								</figure>
								<h1> Platinum OG </h1>
								<p>
									A super-potent descendant of OG Kush, Master Kush, and an unknown parent. This indica-dominant hybrid has a sativa/
									indica ratio of 25/75, and that is reflected in the mostly physical high. Platinum OG produces a smell of diesel, spice, and
									coffee; the flavor is similar, with additional hints of herb. The bud is lime green and covered in fuzzy trichome hairs.
								</p>
							</div>
						</div>
					</div>
				</section>
				<div class="strain-chart">
					<div class="container">
						<div class="row">
							<div class="col-xs-12 col-lg-9 col-lg-push-3">
								<figure>
									<img src="assets/images/Chart3.png" alt="Chart3" />
								</figure>
							</div>
							<div class="col-xs-12 col-lg-3 col-lg-pull-9">
								<div class="row strain-chartInfo">
									<div class="col-xs-12 col-sm-4 col-lg-12">
										<div class="chartDesc text-center">
											<h3>entourage</h3>
											<p class="md-padding">
												The overall user experience
												produced by the interactions
												among all active compounds in
												the cannabis plant.
											</p>
										</div>
									</div>
									<div class="col-xs-6 md-border col-sm-4 col-lg-12">
										<div class="chartDesc text-center">
											<h3>Cannibanoids</h3>
											<p>
												Calling attention to the high
												levels of CBN here could
												describe some of the effects for
												why it is good for sleep or
											</p>
										</div>
									</div>
									<div class="col-xs-6 col-sm-4 col-lg-12">
										<div class="chartDesc text-center">
											<h3>TERPENES</h3>
											<p>
												Platinum OG typically has a
												higher amount of Myrcene and
												Limonene giving it a robust
												terpene profile.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<section class="Lineage-map text-center">
					<div class="container">
						<div class="row">
							<div class="col-xs-12">
								<h2> Lineage / Landrace </h2>
								<span>70% Indica / 30% Sativa</span>
								<p>
									A heady description of the landrace for this cannabis strain, should be able to
									write this up manually and not require any dynamic content for this description,
									unlike the map below.
								</p>
							</div>
							<div class="col-xs-12" style="padding: 0">
<!-- 								<div id="" style="position: relative" ></div> -->
								<div id="ai_data_maps" style="height: 600px; width: 900px;"></div>
							</div>
						</div>
					</div>
				</section>
				<section class="approve-wrap subpage2-approve strain-approve">
					<div class="container">
						<div class="row">
							<div class="col-xs-12 col-sm-10 col-sm-offset-1 text-center">
								<h2> User Approved </h2>
								<p>
									Don’t just take our word for it, here is what the farmer’s have to say about this
									cannabis or this farmer. I Suppose it could be either one. A few more words to fill
									the space.
								</p>
							</div>
						</div>
						<div class="row approve-description">
							<div class="col-xs-12 col-sm-4">
								<div class="approve-content text-center">
									<figure>
										<img src="assets/images/v2.png" alt="CanIMG1" />
									</figure>
									<p>
										Granddaddy purple pull ’n’ snap
										convection, percolator maui
										wowie decarboxulate landrace
										closed-loop exraction seasoning.
										Sour Diesel micro screen white
										widow dab feminized.
									</p>
									<span> JOHN DOE </span>
								</div>
							</div>
							<div class="col-xs-12 col-sm-4">
								<div class="approve-content text-center">
									<figure>
										<img src="assets/images/v1.png" alt="CanIMG1" />
									</figure>
									<p>
										Granddaddy purple pull ’n’ snap
										convection, percolator maui
										wowie decarboxulate landrace
										closed-loop exraction seasoning.
										Sour Diesel micro screen white
										widow dab feminized.
									</p>
									<span> JOHN DOE </span>
								</div>
							</div>
							<div class="col-xs-12 col-sm-4">
								<div class="approve-content text-center">
									<figure>
										<img src="assets/images/HoverState1.png" alt="HoverState1" />
									</figure>
									<p>
										Granddaddy purple pull ’n’ snap
										convection, percolator maui
										wowie decarboxulate landrace
										closed-loop exraction seasoning.
										Sour Diesel micro screen white
										widow dab feminized.
									</p>
									<span> JOHN DOE </span>
								</div>
							</div>
							<div class="col-xs-12 col-sm-4 hidden-xs">
								<div class="approve-content text-center">
									<figure>
										<img src="assets/images/v2.png" alt="CanIMG1" />
									</figure>
									<p>
										Granddaddy purple pull ’n’ snap
										convection, percolator maui
										wowie decarboxulate landrace
										closed-loop exraction seasoning.
										Sour Diesel micro screen white
										widow dab feminized.
									</p>
									<span> JOHN DOE </span>
								</div>
							</div>
							<div class="col-xs-12 col-sm-4 hidden-xs">
								<div class="approve-content text-center">
									<figure>
										<img src="assets/images/v1.png" alt="CanIMG1" />
									</figure>
									<p>
										Granddaddy purple pull ’n’ snap
										convection, percolator maui
										wowie decarboxulate landrace
										closed-loop exraction seasoning.
										Sour Diesel micro screen white
										widow dab feminized.
									</p>
									<span> JOHN DOE </span>
								</div>
							</div>
							<div class="col-xs-12 col-sm-4 hidden-xs ">
								<div class="approve-content text-center">
									<figure>
										<img src="assets/images/HoverState1.png" alt="HoverState1" />
									</figure>
									<p>
										Granddaddy purple pull ’n’ snap
										convection, percolator maui
										wowie decarboxulate landrace
										closed-loop exraction seasoning.
										Sour Diesel micro screen white
										widow dab feminized.
									</p>
									<span> JOHN DOE </span>
								</div>
							</div>
						</div>
					</div>
				</section>
				<!--locator start-->
				<section class="locator subpage3-locator strain-locator">
					<div class="container">
						<h3> Bliss Locator </h3>
						<p>
							Find authorized Bliss Dispensaries near you with our handy locator.
						</p>
						<div class="row">
							<div class="col-xs-12 col-sm-7 col-md-8">
								<div class="locator-wrap">
									<div id="map" style="position: relative; overflow: hidden;"></div>
								</div>
							</div>
							<div class="col-sm-5 hidden-xs col-md-4">
								<div class="address-tabWrap">
									<div class="address-tab-link">
										<ul class="clearfix">
											<li class="active" id = "map-toggle-dose-pen-50">
												<a href="javascript:void(0)"> adult use </a>
											</li>
											<li id = "map-toggle-delivery">
												<a href="javascript:void(0)"> delivery </a>
											</li>
											<li id = "map-toggle-stores">
												<a href="javascript:void(0)"> medical </a>
											</li>
										</ul>
									</div>
									<div class="address-tabContent">
										<div class="address-info active">
											<form>
												<input type="text" id="zipcode" placeholder="City / Zip" />
												<button class="btn btn-default" id="zipbutton">
													find
												</button>
											</form>
											<div id = "find-us-space-stores">
												<ul class="actual-area">

												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="locator-btn text-center visible-xs">
							<a href="#" class="btn btn-default"> click here to search </a>
						</div>
					</div>
				</section>
				<!--locator end-->
				<section class="bliss-available strain-bliss">
					<div class="container">
						<div class="available-intro">
							<h3> Cans of Bliss Available </h3>
						</div>
						<div class="available-link hidden-xs text-center">
							<h4>filter by farmer</h4>
							<ul class="link">
								<li class="venusFilter active" filtercan="Venus">
									<a href="javascript:void(0)"> <img src="assets/images/Icon1avail.png" alt="Icon1avail"> </a>
								</li>
								<li class="rebelFilter" filtercan="rebel">
									<a href="javascript:void(0)"> <img src="assets/images/Icon2avail.png" alt="Icon2avail"> </a>
								</li>
								<li class="kodiakFilter" filtercan="kodiak">
									<a href="javascript:void(0)"> <img src="assets/images/Icon3avail.png" alt="Icon3avail"> </a>
								</li>
							</ul>
						</div>
						<div class="available-content">
							<ul class="clearfix active"><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/oval.png" alt="oval"><span class="venus-number"> VF4567 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/oval.png" alt="oval"><span class="venus-number"> VF4570 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/oval.png" alt="oval"><span class="venus-number"> VF4572 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/oval.png" alt="oval"><span class="venus-number"> VF4574 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/oval.png" alt="oval"><span class="venus-number"> VF4575 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/oval.png" alt="oval"><span class="venus-number"> VF4576 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/can-bliss.png" alt="oval"><span class="venus-number"> VF4577 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/can-bliss.png" alt="oval"><span class="venus-number"> VF4578 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/can-bliss.png" alt="oval"><span class="venus-number"> VF4579 asf  </span><span class="venus-farms"> Venus Farms</span></a></li><li class="Venus"><a href="javascript:void(0)"><img src="assets/images/can-bliss.png" alt="oval"><span class="venus-number"> VF4584 asf  </span><span class="venus-farms"> Venus Farms</span></a></li></ul>							
							
							<div class="available-btn text-center">
								<a href="#" class="btn btn-default"> Show More </a>
							</div>
						</div>
					</div>
				</section>
			</div>
			<!--Content Area End-->

			<!--Footer Section Start-->
			<?php
			include 'includes/footer.php';
			?>
			<!--Footer Section End-->
		</div>
		<!--Page Wrapper End-->
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXwshAuuuHbU5SEkn5eN1lr5tv95Bouew&amp" async="" defer=""></script>
		<script src='https://cdn.rawgit.com/googlemaps/v3-utility-library/master/infobox/src/infobox.js'></script>
		<script src='https://cdn.rawgit.com/geocodezip/geoxml3/master/polys/geoxml3.js'></script>
		<script src='https://cdn.rawgit.com/geocodezip/geoxml3/master/ProjectedOverlay.js'></script>
		<script src="assets/js/bootstrap.js"></script>
		<script src="assets/js/slick.js"></script>
		<script src="assets/js/jquery.mCustomScrollbar.concat.min.js"></script>
		<script src="assets/js/retina.min.js"></script>
		<script src="assets/js/sticky-kit.min.js"></script>
		<script src="assets/js/sticky.js"></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js'></script>
		<script src="http://d3js.org/d3.v3.min.js"></script>
	<script src="http://datamaps.github.io/scripts/topojson.js"></script>
	<script src="http://datamaps.github.io/scripts/0.5.8/datamaps.all.js"></script>
		<script src="assets/js/site.js"></script>
	</body>
</html>