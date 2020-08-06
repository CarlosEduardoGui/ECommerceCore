function AjaxModal() {

    jQuery(document).ready(function () {

        jQuery(function () {

            jQuery.ajaxSetup({ cache: false });

            jQuery("a[data-modal]").on("click",
                function (e) {
                    jQuery('#myModalContent').load(this.href,
                        function () {
                            jQuery('#myModal').modal({
                                keyboard: true
                            },
                                'show');
                            bindForm(this);
                        });

                    return false;
                });
        });

        function bindForm(dialog) {
            jQuery('form', dialog).submit(function () {

                jQuery.ajax({
                    url: this.action,
                    type: this.method,
                    data: jQuery(this).serialize(),
                    success: function (result) {
                        if (result.success) {
                            jQuery('#myModal').modal('hide');
                            jQuery('#EnderecoTarget').load(result.url);
                        } else {
                            jQuery('#myModalContent').html(result);
                            bindForm(dialog);
                        }
                    }
                });

                return false;
            });
        }
    });
}