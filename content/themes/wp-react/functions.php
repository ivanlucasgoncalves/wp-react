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
function wp_react_scripts()
{
    if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_deregister_script('wp-embed');
        wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', false, null, true);
        // Add livereload for local access | DO NOT CHANGE
        wp_enqueue_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
    }
    wp_enqueue_style('wpreact-style', get_stylesheet_uri());
    wp_enqueue_style('style-css', get_template_directory_uri() . '/dist/css/style.min.css', false, filemtime(get_stylesheet_directory() . '/dist/css/style.min.css'));
    wp_enqueue_script('script-js', get_template_directory_uri() . '/dist/app.min.js', array('jquery'), filemtime(get_stylesheet_directory().'/dist/app.min.js'), true);
    
    $url = trailingslashit(home_url());
    $path = trailingslashit(parse_url($url, PHP_URL_PATH));

    wp_scripts()->add_data('script-js', 'data', sprintf('var WPReactSettings = %s;', wp_json_encode(
        array(
          'title' => get_bloginfo('name', 'display'),
          'path' => $path,
          'URL' => array(
            'api' => esc_url_raw(get_rest_url(null, '/wp/v2')),
            'root' => esc_url_raw($url),
          )
        )
    )));
}
add_action('wp_enqueue_scripts', 'wp_react_scripts');

//
add_theme_support('post-thumbnails');
add_image_size('post-blog', 650, 350, true);

// Add various fields to the JSON output
function wpreact_register_fields()
{
    // Add Author Name
    register_rest_field(
        'post',
        'author_name',
        array(
        'get_callback' => 'wpreact_get_author_name',
        'update_callback' => null,
        'schema' => null)
    );
    // Add Featured Image
    register_rest_field(
        'post',
        'featured_image_src',
        array(
        'get_callback' => 'wpreact_get_image_src',
        'update_callback' => null,
        'schema' => null)
    );
    // Add Published Date
    register_rest_field(
        'post',
        'published_date',
        array(
        'get_callback' => 'wpreact_published_date',
        'update_callback' => null,
        'schema' => null)
    );
}
add_action('rest_api_init', 'wpreact_register_fields');

function wpreact_get_author_name($object, $field_name, $request)
{
    return get_the_author_meta('display_name');
}

function wpreact_get_image_src($object, $field_name, $request)
{
    if ($object['featured_media'] == 0)
    {
        return $object['featured_media'];
    }
    $feat_img_array = wp_get_attachment_image_src($object['featured_media'], 'post-blog', true);
    return $feat_img_array[0];
}

function wpreact_published_date($object, $field_name, $request)
{
    return get_the_time('F j, Y');
}

function wpreact_excerpt_length($length)
{
    return 20;
}
add_filter('excerpt_length', 'wpreact_excerpt_length');

/**
 * Remove WP Emoji
 */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');
