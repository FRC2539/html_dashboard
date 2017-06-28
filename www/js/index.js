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
        host: 'tegra-ubuntu.local',
        port: 5801,
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
        host: 'tegra-ubuntu.local',
        port: 5802,
        image_url: '/?action=stream',
        data_url: '/program.json',
        wait_img: '/img/waiting.gif',
        error_img: null,
        attrs: {
            width: "100%",
        }

    });

    $("[data-role='header']").toolbar();

    var addAlertListener = function(color, alert) {
        NetworkTables.addKeyListener(
            '/SmartDashboard/' + alert.key,
            function(key, val, isNew) {
                var empty = true;
                for (var j in val)
                {
                    var msg = $.trim(val[j]);
                    if (msg == '')
                    {
                        continue;
                    }

                    empty = false;
                    ohSnap(msg, {
                        color: color,
                        icon: 'ui-btn-icon-left ui-icon-' + alert.icon,
                        duration: alert.duration * 1000
                    });
                }

                if ( ! empty)
                {
                    NetworkTables.putValue(
                        '/SmartDashboard/' + alert.key,
                        ['']
                    );
                }
            },
            true
        );
    };

    var alerts = {
        orange: {
            key: 'Alerts',
            icon: 'alert',
            duration: 8
        },
        white: {
            key: 'Info',
            icon: 'info',
            duration: 4
        }
    };

    for (var i in alerts)
    {
        addAlertListener(i, alerts[i]);
    }

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

    NetworkTables.addKeyListener(
        '/cameraTarget/liftVisible',
        function(key, val, isNew) {
            $('#liftDistance').toggle(val);
        },
        true
    );
    NetworkTables.addKeyListener(
        '/cameraTarget/liftDistance',
        function(key, val, isNew) {
            $('#liftDistance > span')[0].textContent = Math.round(val);
        },
        true
    );
});
