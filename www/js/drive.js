jQuery(document).ready(function($) {
    loadCameraOnConnect({
        container: '#camera',
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

    // Autonomous Sendable Chooser
    var chooser = '/SmartDashboard/Autonomous Program/';
    var $chooserGroup = $('#automode');

    $chooserGroup.on('click', 'input,label', function(e) {
        var $this = $(this);
        if ($this.is('label'))
        {
            $this = $('#' + $this.prop('for'));
        }

        NetworkTables.putValue(chooser.substring(1) + "selected", $this.val());
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



    // Autonomous Instructions
    $('#auto-settings')
        .find('input')
        .click(tools.inputToNT)
        .each(tools.NTToInput);

    // Switch and Scale Coloring
    var resetFieldColors = function() {
        $colors = $('#switch-colors,#scale-colors');
        $colors.removeClass('current');
        $colors.children('div').removeClass();
    };

    NetworkTables.addKeyListener('/Field/layout', function(key, val, isNew) {
        resetFieldColors();
        var color = NetworkTables.getValue('/Field/color');
        var cls = color + ' ours';

        var $switch = $('#switch-colors');
        var $scale = $('#scale-colors');

        if (val.substr(0, 1) == 'L')
        {
            $switch.children('div').first().addClass(cls);
        }
        else
        {
            $switch.children('div').first().next().addClass(cls);
        }

        if (val.substr(1, 1) == 'L')
        {
            $scale.children('div').first().addClass(cls);
        }
        else
        {
            $scale.children('div').first().next().addClass(cls);
        }

        $switch.addClass('current');
        $scale.addClass('current');
    });

    NetworkTables.addRobotConnectionListener(function(connection) {
        if ( ! connection)
        {
            resetFieldColors();
            NetworkTables.putValue('Autonomous/robotLocation', '');
            NetworkTables.putValue('Autonomous/switch', '');
            NetworkTables.putValue('Autonomous/scale', '');
        }
    }, true);
});