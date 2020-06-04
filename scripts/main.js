$(document).ready(function () {
    console.log("Document Ready!");
    $(".anim").show(10, "swing");
    var api_key = "8459c322e00586940a5729ac6e3813f5";
    var user_id = "137579347%40N08";
    var photos_url = "https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + api_key + "&user_id=" + user_id + "&format=json&nojsoncallback=1";

    function construct_image(data) {
        var title = "";
        var server = "";
        var id = "";
        var secret = "";
        src = "https://live.staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg";
        data.photos.photo.forEach(function (value, index, array) {
            // https://live.staticflickr.com/1450/23621704493_d5cec2dd32.jpg
            title = value.title;
            server = value.server;
            id = value.id;
            secret = value.secret;
            src = "https://live.staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg";
            $(".grid").append('<div class="grid-item"><a href="https://www.flickr.com/photos/137579347@N08/" target="_blank"><img id="' + id + '" src="' + src + '" alt="' + title + '" class="flickr-img img-fluid"/><span class="flickr-title">'+ title +'</span></a></div>');
            // $('body').append($('<img>',{id: id ,src: src, alt: title}))
        });
    }
    function init_masanry() {
        var $grid = $('.grid').imagesLoaded()
            .always(function (instance) {
                //console.log('all images loaded');
            })
            .done(function (instance) {
                $(".anim").hide(1500, "swing");
                console.log('all images successfully loaded');
                $grid.masonry({
                    // options...
                    itemSelector: '.grid-item',
                    //gutter: 10,
                    // use element for option
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                    
                });
            })
            .fail(function () {
                console.log('all images loaded, at least one is broken');
            })
            .progress(function (instance, image) {
                //var result = image.isLoaded ? 'loaded' : 'broken';
                //console.log('image is ' + result + ' for ' + image.img.src);
            });
        // var $grid = $('.grid').imagesLoaded(function () {
        //     // init Masonry after all images have loaded
        //     $grid.masonry({
        //         // options...
        //         itemSelector: '.grid-item',
        //         // use element for option
        //         columnWidth: '.grid-sizer',
        //         percentPosition: true,
        //         gutter: 10
        //     });
        // });
    }
    // Assign handlers immediately after making the request,
    // and remember the jqxhr object for this request
    try {
        var jqxhr = $.getJSON(photos_url)
            .done(function (data) {
                console.log(data.stat);
                construct_image(data);
                init_masanry();
            })
            .fail(function (e) {
                console.log(e.statusText);
            });
    } catch (e) {
        console.log(e);
    }
});