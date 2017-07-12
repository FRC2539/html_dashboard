$(document).ready(function($) {

    function addItem($container, id, name) {
        var li = '<li data-role="collapsible">';
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
                    addItem($('#' + set), id, key[i]);
                }
                else
                {
                    addItem($parent, id, key[i]);
                }
            }
            $parent = $('#' + id);
        }

        if ( ! Array.isArray(value))
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

});
