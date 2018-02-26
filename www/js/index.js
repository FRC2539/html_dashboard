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
});
