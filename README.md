# WP React

## Precursor

A web app built by **Ivan Lucas** .

---

## Technology

* Built using **React**
* WordPress REST API
* Uses SASS
* Uses PostCSS for autoprefixer
* Uses Minify JS and CSS

## Plugins

---

## NOTES


## Setup
Copy in the root of the repo, local-config-sample.php to local-config.php which is where you need to put configuration that is specific to your local environment.
NOTE local-config.php is defined in the .gitignore and should never be committed to the repository.

## Git Branching
This repo uses feature branches with some static branches used to trigger deployments to different environments.

## WordPress Core as a Subdirectory
To keep the repo cleaner and make WordPress releases faster, the site has WordPress core configure a sub directory wp/.

Nothing should ever be committed inside the wp/ directory, unless performing a WordPress update. This includes themes, plugins and anything else. All of the plugins and themes live in the top level content/ directory, as with a standard WordPress set up.

## Uploads
The uploads directory is configured on deploy for staging and production. You have to create the content/uploads directory manually on local (git ignored)

---

// drink coffee and relax
