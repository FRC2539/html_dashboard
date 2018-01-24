$(document).ready(function() {
    const $config = $('#save-config');
    const $inputs = $config.find('input,select').filter(function() {
        return typeof $(this).data('key') != 'undefined';
    });


    $config.submit(function(e) {
        e.preventDefault();

        $inputs.each(tools.inputToNT);
    });

    $(window).keydown(function(e) {
        if ( ! (e.which == 83 && e.ctrlKey))
        {
            return true;
        }

        e.preventDefault();
        $config.submit();

        return false;
    });

    $inputs.each(tools.NTToInput);
});
