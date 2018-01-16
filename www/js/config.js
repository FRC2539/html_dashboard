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

    const coerceValue = function(val) {
        if (val !== null && isFinite(val))
        {
            val = Number(val);
        }

        return val;
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
            key = key.substring(1);

            if (isSimple($this))
            {
                NetworkTables.putValue(key, coerceValue($this.val()));
            }
            else if ($this.prop('type') == 'radio' && $this.is(':checked'))
            {
                NetworkTables.putValue(key, coerceValue($this.val()));
            }
            else if ($this.prop('type') == 'checkbox')
            {
                NetworkTables.putValue(key, $this.is(':checked'));
            }
        });
    });

    $(window).keydown(function(e) {
        if ( ! (e.which == 83 && e.ctrlKey))
        {
            return true;
        }

        e.preventDefault();
        $('#config').submit();

        return false;
    });

    $inputs.each(function() {
        const $this = $(this);
        NetworkTables.addKeyListener(
            $this.data('key'),
            function(key, val, isNew) {
                if (isSimple($this))
                {
                    // Round number inputs to their step, if applicable.
                    if ($this.prop('type') == 'number')
                    {
                        var step = $this.prop('step');
                        if (step && isFinite(step))
                        {
                            val = Math.round(val / step) * step;
                        }
                    }
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
                    if (val != $this.is(':checked'))
                    {
                        $this.click();
                    }
                }
            },
            true
        );
    });
});
