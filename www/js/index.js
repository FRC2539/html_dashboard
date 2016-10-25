$(document).ready(function() {
    var connectionChange = function(connected) {
        if (connected)
        {
            $('#connection-indicator')
                .addClass('connected')
                .removeClass('disconnected');
        }
        else
        {
            $('#connection-indicator')
                .addClass('disconnected')
                .removeClass('connected');
        }
    };

    NetworkTables.addRobotConnectionListener(connectionChange, true);

    loadCameraOnConnect({
        container: '#camera1', // where to put the img tag
        proto: null,                    // optional, defaults to http://
        host: 'tegra-ubuntu',                     // optional, if null will use robot's autodetected IP address
        port: 8080,                     // webserver port
        image_url: '/?action=stream',   // mjpg stream of camera
        data_url: '/program.json',      // used to test if connection is up
        wait_img: null,                 // optional img to show when not connected, can use SVG instead
        error_img: null,                // optional img to show when error connecting, can use SVG instead
        attrs: {                        // optional: attributes set on svg or img element
            width: 640,                     // optional, stretches image to this width
            height: 480,                    // optional, stretches image to this width
        }
        
    });

});
