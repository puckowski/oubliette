(function () {
    var width = window.innerWidth * 1.0;
    var height = window.innerHeight * 1.0;

    window.onload = function () {
        this.document.write("initial");
        document.write("<br>");
        document.write("innerwidth: " + window.innerWidth);
        document.write("<br>");
        document.write("innerheight: " + window.innerHeight);
        document.write("<br>");

        window.addEventListener("resize", function () {
            document.write('resize');
            document.write("<br>");
            document.write("innerwidth: " + window.innerWidth);
            document.write("<br>");
            document.write("innerheight: " + window.innerHeight);
            document.write("<br>");
        });

        // Detect whether device supports orientationchange event, otherwise fall back to
        // the resize event.
        var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

        window.addEventListener(orientationEvent, function() {
            // alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
            document.write('orient');
            document.write("<br>");
            document.write("innerwidth: " + window.innerWidth);
            document.write("<br>");
            document.write("innerheight: " + window.innerHeight);
            document.write("<br>");
        }, false);
    };

   
})();