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
        container: '#camera1',
        proto: null,
        host: 'tegra-ubuntu',
        port: 8080,
        image_url: '/?action=stream',
        data_url: '/program.json',
        wait_img: '/img/waiting.gif',
        error_img: null,
        attrs: {
            width: "100%",
        }

    });
    loadCameraOnConnect({
        container: '#camera2',
        proto: null,
        host: 'axis-camera.local',
        port: 80,
        image_url: '/mjpg/video.mjpg',
        data_url: '/view/index.shtml',
        wait_img: '/img/waiting.gif',
        error_img: null,
        attrs: {
            width: "100%",
        }

    });

    NetworkTables.addKeyListener(
        '/SmartDashboard/Alerts',
        function(key, val, isNew) {
            val = $.trim(val);
            if (val == '')
            {
                return;
            }
            ohSnap(val, {
                color: 'orange',
                icon: 'ui-btn-icon-left ui-icon-alert',
                duration: 8000
            });
        },
        true
    );
});
