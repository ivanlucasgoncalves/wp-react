<?php
/**
 * Starter Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Starter_Theme
 */


/**
 * Enqueue scripts and styles.
 */
function starter_theme_scripts() {
	
	wp_enqueue_style( 'starter_theme-style', get_stylesheet_uri() );
	
	wp_enqueue_style( 'style-css', get_template_directory_uri() . '/dist/css/style.css' );
	
	wp_enqueue_script( 'script-js', get_template_directory_uri() . '/dist/app.js', array(), '', true );

}
add_action( 'wp_enqueue_scripts', 'starter_theme_scripts' );



