$(document).ready(function() {
    const simpleInputs = [
        'text',
        'number',
        'date',
        'time',
        'url',
        'password',
        'hidden'
    ];

    const $config = $('#save-config');
    const $inputs = $config.find('input,select').filter(function() {
        return typeof $(this).data('key') != 'undefined';
    });

    const isSimple = function($el) {
        return $el.is('select') || simpleInputs.indexOf($el.prop('type')) != -1;
    };

    $('#config').submit(function(e) {
        e.preventDefault();

        $inputs.each(function() {
            var $this = $(this);
            var key = $this.data('key');

            if ( ! key)
            {
                return;
            }

            if (isSimple($this))
            {
                NetworkTables.putValue(key, $this.val());
            }
            else if ($this.prop('type') == 'radio' && $this.is(':checked'))
            {
                NetworkTables.putValue(key, $this.val());
            }
            else if ($this.prop('type') == 'checkbox')
            {
                if ($this.is(':checked'))
                {
                    NetworkTables.putValue(key, 'True');
                }
                else
                {
                    NetworkTables.putValue(key, 'False');
                }
            }
        });
    });

    $inputs.each(function() {
        const $this = $(this);
        NetworkTables.addKeyListener(
            $this.data('key'),
            function(key, val, isNew) {
                if (isSimple($this))
                {
                    $this.val(val);
                }
                else if ($this.prop('type') == 'radio')
                {
                    if (val == $this.val() && ! $this.is(':checked'))
                    {
                        $this.click();
                    }
                }
                else if ($this.prop('type') == 'checkbox')
                {
                    if (val == 'True' && ! $this.is(':checked'))
                    {
                        $this.click();
                    }
                    else if (val == 'False' && $this.is(':checked'))
                    {
                        $this.click();
                    }
                }
            },
            true
        );
    });
});
