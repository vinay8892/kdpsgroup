const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700" rel="stylesheet">

    <link rel="stylesheet" href="css/open-iconic-bootstrap.min.css">
    <link rel="stylesheet" href="css/animate.css">
    
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/magnific-popup.css">

    <link rel="stylesheet" href="css/aos.css">

    <link rel="stylesheet" href="css/ionicons.min.css">

    
    <link rel="stylesheet" href="css/flaticon.css">
    <link rel="stylesheet" href="css/icomoon.css">
    <link rel="stylesheet" href="css/style.css">

	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css?v=1.0" rel="stylesheet"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	
  <script src="js/jquery.min.js"></script>
  <script src="js/jquery-migrate-3.0.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/jquery.easing.1.3.js"></script>
  <script src="js/jquery.waypoints.min.js"></script>
  <script src="js/jquery.stellar.min.js"></script>
  <script src="js/owl.carousel.min.js"></script>
  <script src="js/jquery.magnific-popup.min.js"></script>
  <script src="js/aos.js"></script>
  <script src="js/jquery.animateNumber.min.js"></script>
  <script src="js/bootstrap-datepicker.js"></script>
  <script src="js/jquery.timepicker.min.js"></script>
  <script src="js/scrollax.min.js"></script>
  <script src="js/main.js"></script>
  

  
	<footer class="ftco-footer ftco-bg-dark ftco-section" style="background-color:#ffcce6;">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-3">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2" style="color:blue;">K.D.Public School.</h2>
              <p  style="color:black;">K.D.PUBLIC SCHOOL is an English Medium, Co-Educational School which is aimed to produce greater tallents for the country. The School is upto VIIIth class.</p>
            </div>
            <ul class="ftco-footer-social list-unstyled float-md-left float-lft " >
              <li><a href="#"><span class="icon-twitter" style="color:black;"></span></a></li>
              <li><a href="https://www.facebook.com/kdps.jamon/" target="_blank"><span class="icon-facebook" style="color:black;"></span></a></li>
              <li><a href="#"><span class="icon-instagram" style="color:black;"></span></a></li>
			  <li><a href="#"><span class="icon-linkedin" style="color:black;"></span></a></li>
			  <li><a href="https://www.youtube.com/@kdpsjamo"><span class="icon-youtube" style="color:black;"></span></a></li>
            </ul>
			
          </div>
		  
		  <div class="col-md-4 pr-md-4">
				<!-- place for logo -->
				 
            <div class="ftco-footer-widget mb-4 ml-md-5">
              <h2 class="ftco-heading-2"></h2>
              <ul class="list-unstyled">
                <li><a href="#" class="py-2 d-block"><img style="height:250px;width:250px;float: center;" src="images/logo.png" alt="K.D. Public School"></a></li>
              </ul>
            </div>
		  </div>
		  
          <div class="col-md-2">
            <div class="ftco-footer-widget mb-4 ml-md-5">
              <h2 class="ftco-heading-2" style="color:black;">Quick Links</h2>
              <ul class="list-unstyled">
                <li><a href="about.html" class="py-2 d-block" style="color:#0000EE;">About</a></li>
                <li><a href="gallery.html" class="py-2 d-block" style="color:#0000EE;">Gallery</a></li>
                <li><a href="contact.html" class="py-2 d-block" style="color:#0000EE;">Contact</a></li>
              </ul>
            </div>
          </div>

          <div class="col-md-3">
            <div class="ftco-footer-widget mb-4">
            	<h2 class="ftco-heading-2" style="color:black;">Office</h2>
            	<div class="block-23 mb-3">
	              <ul>
	                <li><span class="icon icon-map-marker" style="color:blue;"></span><span class="text" style="color:black;">K.D.Public School,WARISGANJ ROAD-JAMON DISTT.-AMETHI (U.P.)</span></li>
	                <li><a href="#"><span class="icon icon-phone" style="color:black;"></span><span class="text" style="color:black;">+ (91) 9792866866</span></a></li>
					<li><a href="#"><span class="icon icon-phone" style="color:black;"></span><span class="text" style="color:black;">+ (91) 9628606060</span></a></li>
	                <li><a href="#"><span class="icon icon-envelope" style="color:yellow;"></span><span class="text" style="color:black;">info@kdpsgroup.com</span></a></li>
	              </ul>
	            </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">

            <p style="color:black;">
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | K.D.Public School </p>
          </div>
        </div>
      </div>
    </footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const fontAwesome = document.querySelector('link[href*="font-awesome"]');
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    if (fontAwesome) {
      shadowRoot.appendChild(fontAwesome.cloneNode());
    }

    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define('footer-component', Footer);