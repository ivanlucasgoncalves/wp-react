<?php

/**
 * NOTE: ensure you have run composer to install necessary packages
 */

require_once(__DIR__ . '/vendor/autoload.php');


// set up environment variables
$dotenv = new Dotenv\Dotenv(__DIR__ . '/');
$dotenv->load();
$dotenv->required(['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'])->notEmpty();

// DB Config
//---------------------------------
define('DB_HOST', getenv('DB_HOST'));
define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');
define('DB_PREFIX', getenv('DB_PREFIX'));

// ==============================================================
// Table prefix
// Change this if you have multiple installs in the same database
// ==============================================================
$table_prefix = DB_PREFIX;

define('WP_SITEURL', getenv('WP_SITEURL'));
define('WP_HOME',    getenv('WP_HOME'));

// Salt keys, generated via https://api.wordpress.org/secret-key/1.1/salt/
// NOTE these need to be different for each environment otherwise they can cause interference when
//      logging into prod v staging etc.
define('AUTH_KEY',         '14&?E)/7DdlY(OqO*;83:o0TJK[z#h/.nC2Os@r6H~L8x@wN`TaSNl2(SOSY,X@#');
define('SECURE_AUTH_KEY',  'f]?Y,^P44L-uW(7.AiKyE+TXM{5+YGGC+L|r4Wp[)--sscE~,.^po`-+^;=f.[.8');
define('LOGGED_IN_KEY',    '[#/G_ZVs|0=(-IZ9|5@.4EME+mY]91r-_4oAn<]OqJu-4kL^;?I~D^3--4$nehNG');
define('NONCE_KEY',        'bo/lG7*X8x|}#v=O2U4dO !L3 )kzV^|QcQGtZvk`j .Oj~T2q)5c(Cjb76|+-f@');
define('AUTH_SALT',        'q;.F6w+[2pjW!PZ%w7M-aGoO.DQ4?22({@2p!~pdQgKu^^h}`~tC}S=T`maL2q4f');
define('SECURE_AUTH_SALT', '_lcN<$W~;cZsLAekz,5pfJI!EuA,y|P!@&S{{H4P%C-);~[ivunz:il_}w_U-?!%');
define('LOGGED_IN_SALT',   '++x#(h;pa$L8qG;v|+YejHL3&Ys]-ZJ0}2jbV#r!fDl@17U[A}.LUO-GtK-M2i^1');
define('NONCE_SALT',       '!KlzQt5P<|/+h#OAD-IHSMi:c6#-e@h@K7vGb7U|VPnVj^y`@MsMT{v-`h-Q#xqz');

// ========================
// Custom Content Directory
// ========================
define('WP_CONTENT_DIR', dirname(__FILE__) . '/content');
define('WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content');

// ===================
// WordPress
// ===================
if (!defined('ABSPATH'))
define('ABSPATH', dirname(__FILE__) . '/wp/');
require_once(ABSPATH . 'wp-settings.php');

// ===================
// That's all, stop editing! Happy blogging /* . */
// ===================
