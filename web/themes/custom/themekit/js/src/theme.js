/**
 * theme.js
 * Entry point for all theme related js.
 */
import './foundation-setup';
import './skip-link';
import './inject-svg';

// EXAMPLE FOUNDATION COMPONENT USAGE
import './menus-example';

// EXAMPLE ONLY
import Person from './Person';

// create
const themekit = new Person('Mr. Theme Kit');

console.log(`${Person.greeting()} ${themekit.sayName()}`);
