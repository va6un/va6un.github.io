$(document).ready(function () {
  console.log("Document Ready!");
  var bgImageArray = [
  "50728746451_f414e2d910_c.jpg",
  "50729120297_f998a33f18_c.jpg",
  "50729024376_7957ba2355_c.jpg",
  "50776210611_d7f748a5c1_c.jpg",
  "50729120772_d8bd37efb4_c.jpg"
  ],
  base = "https://live.staticflickr.com/65535/",
  secs = 4;
  bgImageArray.forEach(function (img) {
    new Image().src = base + img;
  // caches images, avoiding white flash between background replacements
});
// https://live.staticflickr.com/65535/50728746451_f414e2d910_c.jpg

function backgroundSequence() {
  window.clearTimeout();
  var k = 0;
  for (i = 0; i < bgImageArray.length; i++) {
    setTimeout(function () {
    	// document.documentElement.style.background =
    	document.body.style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center fixed";
      // document.documentElement.style.backgroundSize = "cover";
      document.body.style.backgroundSize = "cover";
      if (k + 1 === bgImageArray.length) {
        setTimeout(function () {
          backgroundSequence();
        }, secs * 1000);
      } else {
        k++;
      }
    }, secs * 1000 * i);
  }
}
backgroundSequence();

});