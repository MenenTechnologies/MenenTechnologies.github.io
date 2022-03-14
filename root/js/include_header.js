$(document).ready(function(){
    $("#navbar").load("navbar.html", function () {
        // load finished:
        // make active the header that matches the current file
        $("a.header").each(function (index) {
            if ( window.location.pathname.indexOf( $(this).attr("id") ) >= 0 ) {
                $(this).addClass("active");
            }
        });

        $("#language-pulldown").selectmenu({
            width: 100,
        });
    });
});