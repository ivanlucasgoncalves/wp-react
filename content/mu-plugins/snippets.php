<?php
/**
 * Plugin Name: Snippets
 * Description: Snippets
 * Version:     1.0
 * Author:      The Code Company
 * Author URI:  http://thecode.co
 */

//Exit if accessed directly
if (! defined('ABSPATH'))
{
    exit;
}

// Register Custom Post Type
function snippets_post_type()
{
    $singular = 'Snippet';
    $plural = 'Snippets';

    $labels = array(
    'name'                  => $plural,
    'singular_name'         => $singular,
    'menu_name'             => $plural,
    'all_items'             => 'All ' . $plural,
    'add_new_item'          => 'Add New ' . $singular,
    'add_new'               => 'Add ' . $singular,
    'new_item'              => 'New ' . $singular,
    'edit_item'             => __('Edit Item'),
    'update_item'           => __('Update Item'),
    'view_item'             => __('View Item'),
    'view_items'            => __('View Items'),
    'search_items'          => __('Search Item'),
    'not_found'             => __('Not found'),
    'not_found_in_trash'    => __('Not found in Trash'),
    'featured_image'        => __('Featured Image'),
    'set_featured_image'    => __('Set featured image'),
    'remove_featured_image' => __('Remove featured image'),
    'use_featured_image'    => __('Use as featured image'),
    'insert_into_item'      => __('Insert into item'),
    'uploaded_to_this_item' => __('Uploaded to this item'),
    'items_list'            => __('Items list'),
    'items_list_navigation' => __('Items list navigation'),
    'filter_items_list'     => __('Filter items list'),
    );
    $args = array(
    'label'                 => $singular,
    'labels'                => $labels,
    'supports'              => false,
    'taxonomies'            => array('category', 'post_tag'),
    'hierarchical'          => false,
    'public'                => true,
    'show_ui'               => true,
    'show_in_menu'          => true,
    'menu_icon'             => 'dashicons-editor-code',
    'menu_position'         => 10,
    'show_in_admin_bar'     => false,
    'show_in_nav_menus'     => true,
    'can_export'            => true,
    'has_archive'           => true,
    'exclude_from_search'   => false,
    'publicly_queryable'    => true,
    'capability_type'       => 'page',
    'show_in_rest'          => true,
    'rest_base'             => 'snippets',
  	'rest_controller_class' => 'WP_REST_Posts_Controller',
    );
    register_post_type('snippets', $args);
}

add_action('init', 'snippets_post_type', 0);
