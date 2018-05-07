<?php
/**
 * The main template file
 */
?>
 <!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, , shrink-to-fit=no, user-scalable=no">
        <link rel="profile" href="http://gmpg.org/xfn/11">
        <title>WP React</title>
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <div id="app"></div>
        <?php wp_footer(); ?>
    </body>
</html>