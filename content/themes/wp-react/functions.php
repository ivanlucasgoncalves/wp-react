<?php
/**
 * WP React functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WP React
 */

if (! function_exists('wpreact_setup')) :
    function wpreact_setup()
    {
      
        //
        add_theme_support('post-thumbnails');
        add_image_size('post-blog', 650, 350, true);
        add_image_size('post-full-image', 1160, 560, true);
      
    }
endif;
add_action('after_setup_theme', 'wpreact_setup');

/**
 * Enqueue scripts and styles.
 */
function wp_react_scripts()
{
    if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_deregister_script('wp-embed');
        //wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', false, null, true);
        // Add livereload for local access | DO NOT CHANGE
        wp_enqueue_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
    }
    wp_enqueue_style('wpreact-style', get_stylesheet_uri());
    wp_enqueue_style('style-css', get_template_directory_uri() . '/dist/css/style.min.css', false, filemtime(get_stylesheet_directory() . '/dist/css/style.min.css'));
    wp_enqueue_script('script-js', get_template_directory_uri() . '/dist/app.min.js', array(), filemtime(get_stylesheet_directory().'/dist/app.min.js'), true);
    
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
    // Add Author Avatar
    register_rest_field(
        'post',
        'author_avatar',
        array(
        'get_callback' => 'wpreact_get_author_avatar',
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
    // Add Published Date
    register_rest_field(
        'comment',
        'published_comment',
        array(
        'get_callback' => 'wpreact_published_comment',
        'update_callback' => null,
        'schema' => null)
    );
    // Add Next Post
    register_rest_field(
        'post',
        'next_post',
        array(
        'get_callback' => 'wpreact_next_post',
        'update_callback' => null,
        'schema' => null)
    );
    // Add Previous Post
    register_rest_field(
        'post',
        'previous_post',
        array(
        'get_callback' => 'wpreact_previous_post',
        'update_callback' => null,
        'schema' => null)
    );
    // Add Tags
    register_rest_field(
        'post',
        'tags_post',
        array(
        'get_callback' => 'wpreact_tags',
        'update_callback' => null,
        'schema' => null)
    );
    // Add Comments Number
    register_rest_field(
        'post',
        'comments_number',
        array(
        'get_callback' => 'wpreact_comments_number',
        'update_callback' => null,
        'schema' => null)
    );
    // Add Posts Related
    register_rest_field(
        'post',
        'related_posts',
        array(
        'get_callback' => 'wpreact_related_posts',
        'update_callback' => null,
        'schema' => null)
    );
    // Schema for post_views field
    $post_views_schema = array(
        'description'   => 'Post views count',
        'type'          => 'integer',
        'context'       =>   array( 'view', 'edit' )
    );
     
    // Add the post_views field
    register_rest_field(
        'post',
        'post_views',
        array(
            'get_callback'      => 'get_post_views',
            'update_callback'   => 'update_post_views',
            'schema'            => $post_views_schema
        )
    );
}
add_action('rest_api_init', 'wpreact_register_fields');

function wpreact_get_author_name($object, $field_name, $request)
{
    return get_the_author_meta('display_name');
}

function wpreact_get_author_avatar($object, $field_name, $request)
{
    $args = get_avatar_data($object['id']);
    return $args['url'];
}

function wpreact_get_image_src($object, $field_name, $request)
{
    if ($object['featured_media'] == 0) {
        return $object['featured_media'];
    }
    $feat_img_array = wp_get_attachment_image_src($object['featured_media'], 'post-blog', true);
    return $feat_img_array[0];
}

function wpreact_published_date($object, $field_name, $request)
{
    $published_date = get_the_date('F j, Y', $object['id']);
    return $published_date;
}

function wpreact_published_comment($object, $field_name, $request)
{
    $published_comment = get_comment_date('F j, Y', $object['id']);
    return $published_comment;
}

function wpreact_excerpt_length($length)
{
    return 20;
}
add_filter('excerpt_length', 'wpreact_excerpt_length');

function wpreact_next_post($object, $field_name, $request)
{
    $next_post = get_next_post();
    return $next_post;
}

function wpreact_previous_post($object, $field_name, $request)
{
    $previous_post = get_previous_post();
    return $previous_post;
}

function wpreact_tags($object, $field_name, $request)
{
    $tags = get_the_tags();
    return $tags;
}

function wpreact_comments_number($object, $field_name, $request)
{
    $comments_number = get_comments_number('0', '1', '%');
    return $comments_number;
}

function wpreact_related_posts($object, $field_name, $request)
{
    $tags_related = wp_get_post_tags(get_the_ID());
    if ($tags_related) {
        $tag_ids = array();
        foreach ($tags_related as $individual_tag) {
            $tag_ids[] = $individual_tag->term_id;
        }
        $args = array(
          'tag__in' => $tag_ids,
          'post__not_in' => array(get_the_ID()),
          'posts_per_page'=> 3, // Number of related posts to display.
          'caller_get_posts'=> 1,
        );
        $posts_array = get_posts($args);
        
        //Querying posts
        $allposts = new WP_Query($args);
        while ($allposts -> have_posts()) {
            $allposts -> the_post();
            $postsrelated[] = array( //Creating an array with all fiels for Related Posts
              'ID' => get_the_ID(),
              'title' => get_the_title(),
              'featured_image_src' => get_the_post_thumbnail_url(get_the_ID(), 'post-blog'),
              'slug' => get_post_field('post_name'),
              'excerpt' => get_the_excerpt(),
              'comments_number' => get_comments_number('0', '1', '%'),
              'published_date' => get_the_date('F j, Y')
            );
        }
        return $postsrelated;
        wp_reset_query();
    }
}

/**
* Callback for retrieving post views count*/
function get_post_views($object, $field_name, $request)
{
    return (int) get_post_meta($object['id'], $field_name, true);
}
 
/**
* Callback for updating post views count*/
function update_post_views($value, $object, $field_name)
{
    if (! $value || ! is_numeric($value)) {
        return;
    }
    return update_post_meta($object->ID, $field_name, (int) $value);
}

/**
 * Remove WP Emoji
 */
remove_action('wp_head', 'rsd_link'); // remove really simple discovery link
remove_action('wp_head', 'wp_generator'); // remove wordpress version

remove_action('wp_head', 'feed_links', 2); // remove rss feed links (make sure you add them in yourself if youre using feedblitz or an rss service)
remove_action('wp_head', 'feed_links_extra', 3); // removes all extra rss feed links

remove_action('wp_head', 'index_rel_link'); // remove link to index page
remove_action('wp_head', 'wlwmanifest_link'); // remove wlwmanifest.xml (needed to support windows live writer)

// Turn off oEmbed auto discovery.
add_filter('embed_oembed_discover', '__return_false');

// Don't filter oEmbed results.
remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);

// Remove oEmbed discovery links.
remove_action('wp_head', 'wp_oembed_add_discovery_links');

// Remove oEmbed-specific JavaScript from the front-end and back-end.
remove_action('wp_head', 'wp_oembed_add_host_js');

remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');

function filter_rest_allow_anonymous_comments()
{
    return true;
}
add_filter('rest_allow_anonymous_comments', 'filter_rest_allow_anonymous_comments');
