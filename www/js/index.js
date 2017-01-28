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

    /*loadCameraOnConnect({
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

    });*/
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

    var chooser = '/SmartDashboard/Autonomous Program/';
    var $chooserGroup = $('#automode');

    $chooserGroup.on('click', 'input,label', function(e) {
        var $this = $(this);
        if ($this.is('label'))
        {
            $this = $('#' + $this.prop('for'));
        }

        NetworkTables.putValue(chooser + "selected", $this.val());
    });

    var updateChooser = function(key, val, isNew) {
        var options = NetworkTables.getValue(chooser + 'options');
        if (options === undefined)
        {
            return;
        }

        var selected = NetworkTables.getValue(chooser + 'selected');
        if (selected === undefined)
        {
                selected = NetworkTables.getValue(chooser + 'default');
        }

        var $controlGroup = $chooserGroup.find('.ui-controlgroup-controls');
        $controlGroup.empty();
        for (var i in options)
        {
            $controlGroup.append(
                $('<input>').attr({
                    type: 'radio',
                    name: 'automode',
                    id: 'automode-' + i,
                    value: options[i],
                    checked: selected == options[i]
                })
            ).append(
                $('<label>')
                    .attr('for', 'automode-' + i)
                    .text(options[i])
            );
        }
        $controlGroup.trigger('create');

        var $labels = $controlGroup.find('label');
        $labels.first().addClass('ui-first-child');
        $labels.last().addClass('ui-last-child');
    };

    NetworkTables.addKeyListener(chooser + 'options', updateChooser, true);
    NetworkTables.addKeyListener(chooser + 'default', updateChooser, true);
    NetworkTables.addKeyListener(chooser + 'selected', updateChooser, true);
});
