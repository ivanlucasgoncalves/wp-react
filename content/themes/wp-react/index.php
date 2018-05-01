<?php
/**
 * The main template file
 *
 * @package WordPress
 * @subpackage WP React
 * @since WP React 1.0
 */
?>
 <!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, , shrink-to-fit=no, user-scalable=no">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <title>WP React</title>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <div id="page" class="hfeed site">
            <div id="root"></div>
            <?php wp_footer(); ?>
        </div>
    </body>
</html>