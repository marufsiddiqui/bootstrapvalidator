/**
 * FormValidation (http://bootstrapvalidator.com)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation, Pure, UIKit frameworks
 *
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     http://bootstrapvalidator.com/license/
 */

/**
 * This class supports Bootstrap (http://getbootstrap.com/)
 */
(function($) {
    FormValidation.Framework.Bootstrap = function(element, options) {
        options = $.extend(true, {
            button: {
                // The class of disabled button
                // http://getbootstrap.com/css/#buttons-disabled
                disabled: 'disabled'
            },
            err: {
                clazz: 'help-block',
                parent: '^(.*)col-(xs|sm|md|lg)-(offset-){0,1}[0-9]+(.*)$'
            },
            // This feature requires Bootstrap v3.1.0 or later (http://getbootstrap.com/css/#forms-control-validation).
            // Since Bootstrap doesn't provide any methods to know its version, this option cannot be on/off automatically.
            // In other word, to use this feature you have to upgrade your Bootstrap to v3.1.0 or later.
            //
            // Examples:
            // - Use Glyphicons icons:
            //  icon: {
            //      valid: 'glyphicon glyphicon-ok',
            //      invalid: 'glyphicon glyphicon-remove',
            //      validating: 'glyphicon glyphicon-refresh',
            //      feedback: 'form-control-feedback'
            //  }
            // - Use FontAwesome icons:
            //  icon: {
            //      valid: 'fa fa-check',
            //      invalid: 'fa fa-times',
            //      validating: 'fa fa-refresh',
            //      feedback: 'form-control-feedback'
            //  }
            icon: {
                valid: null,
                invalid: null,
                validating: null,
                feedback: 'form-control-feedback'
            },
            // By default, each field is placed inside the <div class="form-group"></div>
            row: {
                selector: '.form-group',
                valid: 'has-success',
                invalid: 'has-error',
                feedback: 'has-feedback'
            }
        }, options);

        FormValidation.Base.apply(this, [element, options]);
    };

    FormValidation.Framework.Bootstrap.prototype = $.extend({}, FormValidation.Base.prototype, {
        /**
         * Specific framework might need to adjust the icon position
         *
         * @param {jQuery} $field The field element
         * @param {jQuery} $icon The icon element
         */
        _fixIcon: function($field, $icon) {
            var type    = $field.attr('type'),
                field   = $field.attr('data-bv-field'),
                row     = this.options.fields[field].row || this.options.row.selector,
                $parent = $field.closest(row);

            // Place it after the container of checkbox/radio
            // so when clicking the icon, it doesn't effect to the checkbox/radio element
            if ('checkbox' === type || 'radio' === type) {
                var $fieldParent = $field.parent();
                if ($fieldParent.hasClass(type)) {
                    $icon.insertAfter($fieldParent);
                } else if ($fieldParent.parent().hasClass(type)) {
                    $icon.insertAfter($fieldParent.parent());
                }
            }

            // The feedback icon does not render correctly if there is no label
            // https://github.com/twbs/bootstrap/issues/12873
            if ($parent.find('label').length === 0) {
                $icon.addClass('fv-bootstrap-no-label');
            }
            // Fix feedback icons in input-group
            if ($parent.find('.input-group').length !== 0) {
                $icon.addClass('fv-bootstrap-icon-input-group')
                     .insertAfter($parent.find('.input-group').eq(0));
            }
        },

        /**
         * Create a tooltip or popover
         * It will be shown when focusing on the field
         *
         * @param {jQuery} $field The field element
         * @param {String} message The message
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _createTooltip: function($field, message, type) {
            var $icon = $field.data('bv.icon');
            if ($icon) {
                switch (type) {
                    case 'popover':
                        $icon
                            .css({
                                'cursor': 'pointer',
                                'pointer-events': 'auto'
                            })
                            .popover('destroy')
                            .popover({
                                container: 'body',
                                content: message,
                                html: true,
                                placement: 'auto top',
                                trigger: 'hover click'
                            });
                        break;

                    case 'tooltip':
                    /* falls through */
                    default:
                        $icon
                            .css({
                                'cursor': 'pointer',
                                'pointer-events': 'auto'
                            })
                            .tooltip('destroy')
                            .tooltip({
                                container: 'body',
                                html: true,
                                placement: 'auto top',
                                title: message
                            });
                        break;
                }
            }
        },

        /**
         * Destroy the tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _destroyTooltip: function($field, type) {
            var $icon = $field.data('bv.icon');
            if ($icon) {
                switch (type) {
                    case 'popover':
                        $icon
                            .css({
                                'cursor': '',
                                'pointer-events': 'none'
                            })
                            .popover('destroy');
                        break;

                    case 'tooltip':
                    /* falls through */
                    default:
                        $icon
                            .css({
                                'cursor': '',
                                'pointer-events': 'none'
                            })
                            .tooltip('destroy');
                        break;
                }
            }
        },

        /**
         * Hide a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _hideTooltip: function($field, type) {
            var $icon = $field.data('bv.icon');
            if ($icon) {
                switch (type) {
                    case 'popover':
                        $icon.popover('hide');
                        break;

                    case 'tooltip':
                    /* falls through */
                    default:
                        $icon.tooltip('hide');
                        break;
                }
            }
        },

        /**
         * Show a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _showTooltip: function($field, type) {
            var $icon = $field.data('bv.icon');
            if ($icon) {
                switch (type) {
                    case 'popover':
                        $icon.popover('show');
                        break;

                    case 'tooltip':
                    /* falls through */
                    default:
                        $icon.tooltip('show');
                        break;
                }
            }
        }
    });

    /**
     * Plugin definition
     * Support backward
     * @deprecated It will be removed soon. Instead of using $(form).bootstrapValidator(), use
     *  $(form).formValidation({
     *      framework: 'bootstrap'  // It's equivalent to use data-fv-framework="bootstrap" for <form>
     *  });
     */
    $.fn.bootstrapValidator = function(option) {
        var params = arguments;
        return this.each(function() {
            var $this   = $(this),
                data    = $this.data('formValidation') || $this.data('bootstrapValidator'),
                options = 'object' === typeof option && option;
            if (!data) {
                data = new FormValidation.Framework.Bootstrap(this, options);
                $this.data('formValidation', data)
                     .data('bootstrapValidator', data);
            }

            // Allow to call plugin method
            if ('string' === typeof option) {
                data[option].apply(data, Array.prototype.slice.call(params, 1));
            }
        });
    };

    $.fn.bootstrapValidator.Constructor = FormValidation.Framework.Bootstrap;
}(jQuery));
