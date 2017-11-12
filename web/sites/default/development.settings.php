<?php
/**
 * @file
 * amazee.io Drupal 8 development environment configuration file.
 *
 * This file will only be included on development environments.
 *
 * It contains some defaults that the amazee.io team suggests, please edit them as required.
 */

// Show all error messages on the site
$config['system.logging']['error_level'] = 'all';

// Aggregate CSS files on
$config['system.performance']['css']['preprocess'] = 1;

// Aggregate JavaScript files on
$config['system.performance']['js']['preprocess'] = 1;

// Stage file proxy URL from production URL
if(getenv('AMAZEEIO_PRODUCTION_URL')){
  $config['stage_file_proxy.settings']['origin'] = getenv('AMAZEEIO_PRODUCTION_URL');
}

// Sets Mailchimp API key
$config['mailchimp.settings']['api_key'] = getenv('AMAZEEIO_MAILCHIMP_API_KEY');

// Configure shield for test environment.
$config['shield.settings']['user'] = 'dcco';
$config['shield.settings']['pass'] = '3ditdcco';