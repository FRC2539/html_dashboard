jQuery(document).ready(function($) {
    loadCameraOnConnect({
        container: '#camera1',
        proto: null,
        host: 'tegra-ubuntu.local',
        port: 5801,
        image_url: '/?action=stream',
        data_url: '/settings.json',
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
        data_url: '/settings.json',
        wait_img: '/img/waiting.gif',
        error_img: null,
        attrs: {
            width: "100%",
        }
    });

    // Autonomous Sendable Chooser
    var chooser = '/SmartDashboard/Autonomous Program/';
    var $chooserGroup = $('#automode');

    $chooserGroup.on('click', 'input,label', function(e) {
        var $this = $(this);
        if ($this.is('label'))
        {
            $this = $this.parent().children('input');
        }

        NetworkTables.putValue(chooser + 'selected', $this.val());
    });

    var updateChooser = function(key, val, isNew) {
        var options = NetworkTables.getValue(chooser + 'options');
        if (options === undefined)
        {
            return;
        }
        if (options.length <= 1)
        {
            $chooserGroup.hide();
        }
        else
        {
            $chooserGroup.show();
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
                $('<label>')
                    .text(options[i])
                    .append(
                        $('<input>').attr({
                            type: 'radio',
                            name: 'automode',
                            value: options[i],
                            checked: selected == options[i]
                        })
                    )
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

    // Autonomous Instructions
    $('#auto-settings')
        .find('input')
        .click(tools.inputToNT)
        .each(tools.NTToInput);

    NetworkTables.addKeyListener(
        '/FMSInfo/GameSpecificMessage',
        function(key, val, isNew) {
            var color = 'blue';
            if (NetworkTables.getValue('/FMSInfo/isRedAlliance'))
            {
                color = 'red';
            }
        }
    );
});
