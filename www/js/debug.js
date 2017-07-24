$(document).ready(function($) {

    function addItem($container, id, name, last) {
        var li = '<li';
        if ( ! last)
        {
            li += ' data-role="collapsible"';
        }
        li += '>';
        $container.append(
            $(li)
                .prop('id', id)
                .append('<h3>' + name + '</h3>')
        );
    }

    NetworkTables.addGlobalListener(function(key, value, isNew) {
        key = key.split('/');
        key.shift();

        var id = 'nt';
        var $parent = $('#networktables');
        for (var i in key)
        {
            var last = (i == key.length - 1);
            if (last && Array.isArray(value))
            {
                last = false;
            }
            id += '-' + key[i].replace(/ /g, '_').replace(/~/g, '');
            if ($('#' + id).length == 0)
            {
                if (i != 0)
                {
                    var set = $parent.prop('id') + '-set';
                    if ($('#' + set).length == 0)
                    {
                        $parent.append(
                            $('<ul data-role="collapsibleset" data-inset="false">')
                                .prop('id', set)
                        );
                    }
                    addItem($('#' + set), id, key[i], last);
                }
                else
                {
                    addItem($parent, id, key[i], last);
                }
            }
            $parent = $('#' + id);
        }

        if (Array.isArray(value))
        {
            var output = '';
            for (var i in value)
            {
                output += '<li>' + value[i] + '</li>';
            }

            if ($('#' + id + '-val').length)
            {
                $('#' + id + '-val').html(output);
            }
            else
            {
                $parent.append(
                    $('<ul id="' + id + '-val">' + output + '</ul>')
                );
            }
        }
        else
        {
            if ($('#' + id + '-val').length)
            {
                $('#' + id + '-val').html('(' + value + ')');
            }
            else
            {
                $parent.find('h3').append(
                    $('<span id="' + id + '-val">(' + value + ')</span>')
                );
            }
        }
        $('#networktables').trigger('create');

    }, true);

    NetworkTables.addKeyListener(
        '/SmartDashboard/Active Commands/Ids',
        function(key, ids, isNew) {
            var names = NetworkTables.getValue(
                '/SmartDashboard/Active Commands/Names'
            );

            var html = '';
            for (var i in ids)
            {
                html += '<button class="ui-btn ui-corner-all ui-shadow ui-icon-forbidden ui-btn-icon-right" data-id="' + ids[i] + '">' + names[i] + '</button>';
            }

            $('#active-commands').html(html);
        },
        true
    );

    $('#active-commands').click('button', function(e) {
        var $button = $(e.target);
        var id = parseInt($button.data('id'));
        NetworkTables.putValue(
            '/SmartDashboard/Active Commands/Cancel',
            [id]
        );
        $button.hide();
    });

});
