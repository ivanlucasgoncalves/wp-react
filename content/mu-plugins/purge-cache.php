<?php
/**
 * Plugin Name: Purge Cache
 * Description: Allow admins to purge the WordPress cache
 * Version:     1.0
 * Author:      The Code Company
 * Author URI:  http://thecode.co
 */

namespace TheCodeCompany;

/**
 * Purge cache plugin driver class.
 *
 * @author Zachary Scott <zscott@thecode.co>
 */
class PurgeCachePlugin {

	function __construct() {

		// If the object cache is not configured, skip
		if ( ! class_exists( 'WP_Object_Cache' ) ) {
			add_action( 'admin_notices', array( $this, 'not_enabled_notice' ) );
			return;
		}

		// Add the menu option / functionality
		add_action( 'admin_bar_menu', array( $this, 'add_admin_bar_item' ), 999 );
		add_action( 'admin_init', array( $this, 'handle_purge_request' ) );

	}

	// Add the menu bar entry / item
	function add_admin_bar_item( $wp_admin_bar ) {
		assert( ! empty( $wp_admin_bar ) );

		// Only for admins
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$wp_admin_bar->add_node( array(
			'id'    => 'purge_cache',
			'title' => 'Purge Cache',
			'href'  => self::get_purge_cache_url(),
			// 'meta'  => array( 'class' =>  ),
		) );

	}

	// Handles call to purge the object cache
	function handle_purge_request() {

		// Only for admins
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		// Only if the flag is set in the request
		if ( ! isset( $_REQUEST['purge-cache'] ) || ! $_REQUEST['purge-cache'] ) {
			return;
		}

		// Check the nonce
		$nonce = isset( $_REQUEST['_wpnonce'] ) ? $_REQUEST['_wpnonce'] : '';
		if ( ! wp_verify_nonce( $nonce, 'purge-cache' ) ) {
			wp_die( 'Cheatin\' huh' );
		}

		// Flush the cache
		if ( function_exists( 'wp_cache_flush' ) ) {
			wp_cache_flush();
		}

		// Let the user know it worked
		add_action( 'admin_notices', array( $this, 'success_notice' ) );

	}

	// Notice given to admins to let them know that the purge was successful
	function success_notice() {
		?>
		<div class="success notice notice-success is-dismissible">
			<p>
				Cache purged successfully
			</p>
		</div>
		<?php
	}

	// Notice given to admins if object cache is not enabled
	function not_enabled_notice() {
		?>
		<div class="error notice notice-success is-dismissible">
			<p>
				Purge cache is not enabled as object cache is not configured
			</p>
		</div>
		<?php
	}

	/** Returns the URL to purge the object cache. */
	public static function get_purge_cache_url() {
		return wp_nonce_url(
			admin_url( 'index.php?purge-cache=1' ),
			'purge-cache'
		);
	}

}

// Boot
new PurgeCachePlugin();
