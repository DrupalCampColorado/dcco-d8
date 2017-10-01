/**
 * @file entity-browser-improvements.js
 *
 * Adds extra UI improvements to all entity browsers in the admin theme.
 */

!function($){
  "use strict";

  Drupal.behaviors.entityBrowserImprover = {
    attach: function(context, settings) {
      // Add .view-entity-browser-BROWSER-NAME to this list for browsers you want to add the click item functionality
      let $browserSelectors = ['.view-entity-browser-image', '.view-entity-browser-video', '.view-entity-browser-svg'];
      $browserSelectors = $browserSelectors.join(', ');
      let $browserCol = $($browserSelectors, context);
      $browserCol = $browserCol.find('.views-col');

      $browserCol.each(function(i, el) {
        let $this = $(this);
        if (!$this.hasClass('processed')) {
          $this.click(function() {
            let $checkbox = $(this).find('input[type="checkbox"]');

            $checkbox.prop("checked", !$checkbox.prop("checked"));
            $(this).toggleClass('column-selected');
          });
        }
        $this.addClass('processed');
      });
    }
  };

}(jQuery);