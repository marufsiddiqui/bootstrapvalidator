/**
 * FormValidation (http://bootstrapvalidator.com)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation, Pure, UIKit frameworks
 *
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     http://bootstrapvalidator.com/license/
 */

/**
 * This class supports validating UIKit framework (http://getuikit.com/)
 */
(function($) {
    FormValidation.Framework.UIKit = function(element, options) {
        options = $.extend(true, {
            button: {
                // The class for disabled button
                // http://foundation.zurb.com/docs/components/buttons.html
                disabled: 'disabled'
            },
            err: {
                clazz: 'uk-form-help-block',
                parent: '^.*uk-form-controls.*$'
            },
            // UIkit doesn't support feedback icon
            icon: {
                valid: null,
                invalid: null,
                validating: null,
                feedback: 'fv-control-feedback'
            },
            row: {
                // http://getuikit.com/docs/form.html
                selector: '.uk-form-row',
                valid: '',
                invalid: '',
                feedback: 'fv-has-feedback'
            }
        }, options);

        FormValidation.Base.apply(this, [element, options]);
    };

    FormValidation.Framework.UIKit.prototype = $.extend({}, FormValidation.Base.prototype, {
        /**
         * Specific framework might need to adjust the icon position
         *
         * @param {jQuery} $field The field element
         * @param {jQuery} $icon The icon element
         */
        _fixIcon: function($field, $icon) {
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
                $icon
                    .attr('title', message)
                    .css({
                        'cursor': 'pointer'
                    });
                $icon.data('tooltip', new $.UIkit.tooltip($icon));
            }
        },

        /**
         * Destroy the tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _destroyTooltip: function($field, type) {
            this._hideTooltip($field, type);
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
                var $tooltip = $icon.data('tooltip');
                if ($tooltip) {
                    $tooltip.hide();
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
                var $tooltip = $icon.data('tooltip');
                if ($tooltip) {
                    $tooltip.show();
                }
            }
        }
    });
}(jQuery));
