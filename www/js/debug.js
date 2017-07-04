$(document).ready(function($) {

    NetworkTables.addGlobalListener(function(key, value, isNew) {
        key = key.split('/');
        key.shift();

        if (isNew)
        {
            var id = 'nt-';
            var $parent = $('#networktables');
            for (var i in key)
            {
                id += key[i];
                if ($('#' + id).length == 0)
                {
                    if (i != 0)
                    {
                        /*$parent.append(
                            $('<ul>')
                                .data('role', 'listview')
                                .prop('id', id)
                        );*/
                    }
                    else
                    {
                        var li = '<li data-role="collapsible">';
                        $parent.append(
                            $(li)
                                .prop('id', id)
                                .append('<h3>' + key[i] + '</h3>')
                        );
                    }
                }
            }
            $('#networktables').trigger('create');
        }
        else
        {
            $('#nt' + key.join('-')).html(value);
        }

    }, true);

});
