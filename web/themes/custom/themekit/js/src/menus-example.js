/**
 * EXAMPLE FOUNDATION COMPONENT USAGE
 *
 * Include all of your dependencies. For any foundation components this will include
 * jQuery and the foundation setup js file.
 *
 * The include the module from the `foundation-sites/js/` dir as shown below.
 */

import $ from 'jquery';
import './foundation-setup';
import { DropdownMenu } from 'foundation-sites/js/foundation.dropdownMenu';

new DropdownMenu($('.menu--main > ul'));