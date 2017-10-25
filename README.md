# Drupalcamp 2018 - Camp Announcement Landing Page 

This D8 site serves as a landing page for Drupalcamp 2018 until the full camp website is built out.

## Hosting and Deployment
The site is hosted with Amazee IO, so deployments happen when a branch of this repo receives a commit.

## Local Environment
We use Amazee's environment, Cachalot, to run the site locally on all developer machines. For first-time setup instructions, [read this](https://stories.amazee.io/easy-local-drupal-development-on-os-x-a01a343f99e3).

Once you have Amazee's environment installed on your machine running the site requires a few simple commands:

* `cachalot up` - starts the Amazee Cachalot VM
* `docker-compose up -d` - starts the local environment
* `docker-compose exec --user drupal drupal bash` - ssh into the local Docker environment

## Composer

This site uses Composer to manage all of its dependencies, and the vendor directory is intentionally excluded. You'll need to run `composer install` to install everything required to run the site.

## CMI

All configuration on this is managed via CMI. All configuration changes should be exported locally, committed and imported on remote sites.