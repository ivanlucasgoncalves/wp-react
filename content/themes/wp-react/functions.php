<?php
/**
 * WP React functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WP React
 */


/**
 * Enqueue scripts and styles.
 */
function wp_react_scripts() {
    if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_deregister_script('wp-embed');
        wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', false, null, true);
    }
    wp_enqueue_style('wpreact-style', get_stylesheet_uri());
    wp_enqueue_style('style-css', get_template_directory_uri() . '/dist/css/style.min.css', false, filemtime(get_stylesheet_directory() . '/dist/css/style.min.css'));
    wp_enqueue_script('script-js', get_template_directory_uri() . '/dist/app.min.js', array('jquery'), filemtime(get_stylesheet_directory().'/dist/app.min.js'), true);
}
add_action('wp_enqueue_scripts', 'wp_react_scripts');

/**
 * Remove WP Emoji
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

