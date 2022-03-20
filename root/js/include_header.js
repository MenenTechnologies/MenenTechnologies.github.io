$(document).ready(function(){
    
    // find out current language
    const languages_available = new Set(["en", "es"]);
    let path = window.location.pathname;
    var lang = path.substring(1, path.substring(1).search("/") + 1);
    lang = languages_available.has(lang) ? lang : "en";

    $("#navbar").load("navbar.html", function () {
        // load finished:

        // make active the header that matches the current file
        $("a.header").each(function (index) {
            if ( window.location.pathname.indexOf( $(this).attr("id") ) >= 0 ) {
                $(this).addClass("active");
            }
        });
        
        // select current language in language pulldown
        $("#language-pulldown option[id='" + lang + "']").attr("selected", "selected");

        $("#language-pulldown").selectmenu({
            width: 100,
            select: function( event, ui ) {
                // get url
                let url = window.location;
                let path = url.pathname;
                let baseurl = url.protocol + "//" + url.host + "/";
                let fullurl =  window.location.href;

                // get language code from selected item in dropdown
                let next_lang = ui.item.element.attr('id');

                // calculate new url and load it
                if (next_lang != lang) {
                    if (lang == "en")
                        window.location.href = baseurl + next_lang + path;
                    else {
                        if (next_lang != "en")
                            window.location.href = fullurl.replace("/" + lang + "/", "/" + next_lang + "/");
                        else
                            window.location.href = fullurl.replace("/" + lang + "/", "/");
                    }
                }
            }
        });
    });
});