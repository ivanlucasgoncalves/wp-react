<?php
/**
 * Plugin Name: Maintenance Mode
 * Description: Disables the WP during maintenance / updates
 * Version:     1.0
 * Author:      The Code Company
 * Author URI:  http://thecode.co
 */

namespace TheCodeCompany\MaintenanceMode;

/** TODO / Wishlist:
 *  - Option to disable frontend and/or backend during maintenance
 */

/**
 * The configuration manager for the plugin.
 *
 * @author Zachary Scott <zscott@thecode.co>
 */
class Config {
	
	const OPTION_NAME = 'maintenance_mode_options';
	
	private static $config = array( // The default configuration
		
		// Maintenance mode timing
		'start_time' => '',
		'end_time'   => '',
		
		// The maintenance mode message
		'backend_title'   => 'Maintenance',
		'backend_content' => 'The site is currently under maintenance, we will be back as soon as possible',
		
	);
	
	// Initialises the plugin configuration
	public static function init() {
		
		$options = get_option( self::OPTION_NAME );
		if ( ! empty( $options ) && is_array( $options ) ) {
			self::$config = array_merge( self::$config, $options );
		}
		
	}
	
	// Returns the value of the given configuration item
	public static function get( $name ) {
		assert( ! empty( $name ) );
		return isset( self::$config[ $name ] ) ? self::$config[ $name ] : '';
	}
	
}

/**
 * Class responsible for the options page for the maintenance mode plugin
 *
 * @author Zachary Scott <zscott@thecode.co>
 */
class SettingsPage {

	// Builds / sets up the settings page
	function build() {
		
		// Register the admin pages
        add_action( 'admin_menu', array( $this, 'register_page' ) );
        add_action( 'admin_init', array( $this, 'register_settings' ) );
		
		// Include styles & scripts for our pages
		add_action( 'admin_head', array( $this, 'enqueue_scripts' ) );
		add_action( 'admin_head', array( $this, 'enqueue_styles' ) );
		
    }

	// Registers the settings page
    function register_page() {
		
        // This page will be under "Settings"
        add_options_page(
            'Maintenance Mode', 
            'Maintenance Mode', 
            'manage_options', 
            'maintenance-mode-settings', 
            array( $this, 'build_page' )
        );
		
    }

	// Builds the settings page
    function build_page() {		
        ?>
		<style media="screen">
			.maintenance-mode h3 { padding-top:2em; }
			.maintenance-mode input[type=text] { width:25%; }
			.maintenance-mode select { display: inline-block; width:25% !important; }
			.maintenance-mode #title { width:100%; }
		</style>
		<script type="text/javascript">
			( function ( $ ) {
				$( document ).ready( function() {
					$( '.maintenance-mode select' ).select2( { minimumResultsForSearch: 1 } );
				} );
			} )( jQuery );
		</script>
		
        <div class="wrap maintenance-mode">
			
            <h2>Maintenance Mode - Settings</h2>
			
            <form method="post" action="options.php">
	            <?php
				
	            settings_fields( 'maintenance-mode-group' );   
	            do_settings_sections( 'maintenance-mode-settings' );
	            submit_button();
					
	            ?>
            </form>
			
        </div>
		
        <?php
    }

	// Registers the settings for the options page
    function register_settings() {

        register_setting(
            'maintenance-mode-group',   // Option group
            Config::OPTION_NAME,       // Option name
            array( $this, 'sanitise' )
        );
		
		// The maintenance timing settings
		add_settings_section(
            'maintenance_timing_id',                      // ID
            'Maintenance Timing',                         // Title
            array( $this, 'maintenance_timing_section' ), // Callback
            'maintenance-mode-settings'                   // Page
        );
		add_settings_field(
            'start_time',                            // ID
            'Start time/date',                       // Title 
            array( $this, 'start_time_callback' ),   // Callback
            'maintenance-mode-settings',             // Page
            'maintenance_timing_id'                  // Section           
        );
		add_settings_field(
            'end_time',                          // ID
            'End time/date',                     // Title 
            array( $this, 'end_time_callback' ), // Callback
            'maintenance-mode-settings',         // Page
            'maintenance_timing_id'              // Section           
        );
		
		// The maintenance mode whitelist
		add_settings_section(
            'whitelist_id',                      // ID
            'Whitelist',                         // Title
            array( $this, 'whitelist_section' ), // Callback
            'maintenance-mode-settings'          // Page
        );
		add_settings_field(
            'whitelist',                            // ID
            'Whitelist',                            // Title 
            array( $this, 'whitelist_callback' ),   // Callback
            'maintenance-mode-settings',            // Page
            'whitelist_id'                          // Section           
        );

		// The backend maintenance mode message settings
        add_settings_section(
            'maintenance_msg_id',                      // ID
            'Maintenance Message',                     // Title
            array( $this, 'maintenance_msg_section' ), // Callback
            'maintenance-mode-settings'                // Page
        );  
        add_settings_field(
            'backend_title',                          // ID
            'Title',                                  // Title 
            array( $this, 'backend_title_callback' ), // Callback
            'maintenance-mode-settings',              // Page
            'maintenance_msg_id'                      // Section           
        );      
		add_settings_field(
            'backend_content',                          // ID
            'Content',                                  // Title 
            array( $this, 'backend_content_callback' ), // Callback
            'maintenance-mode-settings',                // Page
            'maintenance_msg_id'                        // Section           
        );  
		
    }
	
	// Sanitses the options 
	function sanitise( $values ) {
		return $values;
	}
	
	// Mainteance mode timing callbacks
    function maintenance_timing_section() {
		?>
		<hr>
		<p>
			The settings below set the window in which the maintenance mode will be active.
		</p>
		<table class="form-table">
			<tr>
				<th scope="row">
					Current time:
				</th>
				<td>
					<input type="text" value="<?php echo esc_html( current_time( 'Y-m-d H:i' ) ) ?>" readonly="readonly">
				</td>
			</tr>
		</table>
		<?php
    }
	function start_time_callback() {
        ?>
		<input type="text"
		       id="start_time"
		       name="<?php echo $this->option_form_name( 'start_time' ) ?>"
		       value="<?php echo esc_attr( Config::get( 'start_time' ) ) ?>" />
		<script>
			( function( $ ) {
				$( document ).ready( function() {
					$( '#start_time' ).datetimepicker( {
						dateFormat: 'yy-mm-dd',
						timeFormat: 'HH:mm'
					} );
				} );
			} )( jQuery );
		</script>
		<?php
    }
	function end_time_callback() {
        ?>
		<input type="text"
		       id="end_time"
		       name="<?php echo $this->option_form_name( 'end_time' ) ?>"
		       value="<?php echo esc_attr( Config::get( 'end_time' ) ) ?>" />
		<script>
			( function( $ ) {
				$( document ).ready( function() {
					$( '#end_time' ).datetimepicker( {
						dateFormat: 'yy-mm-dd',
						timeFormat: 'HH:mm'
					} );
				} );
			} )( jQuery );
		</script>
		<?php
    }
	
	// Mainteance mode whitelist callbacks
    function whitelist_section() {
		?>
		<hr>
		<p>
			The users selected below will not be locked out of the admin backend
			during maintenance.
		</p>
		<?php
    }
    function whitelist_callback() {
		
		$whitelist = Config::get( 'whitelist' );
		if ( ! is_array( $whitelist ) ) {
			$whitelist = array();
		}
		
        ?>	
		<select id="title" 
			name="<?php echo $this->option_form_name( 'whitelist' ) ?>[]" 
			multiple="multiple">
			
			<?php foreach ( get_users() as $user ) : ?>
				
				<option value="<?php echo esc_attr( $user->ID ) ?>" 
					<?php if ( in_array( $user->ID, $whitelist ) ) : ?>
						selected="selected"
					<?php endif; ?>
					>
					<?php if ( ! empty( $user->first_name ) ) : ?>
						<?php echo esc_html( $user->first_name . ' ' . $user->last_name ) ?>
					<?php else : ?>
						<?php echo esc_html( $user->user_email ) ?>
					<?php endif; ?>
				</option>
			<?php endforeach ?>
			
		</select>
		<?php
    }

	// Backend mainteance mode messages callbacks
    function maintenance_msg_section() {
		?>
		<hr>
		<p>
			The below will be displayed to users which try and access the backend while the site
			is in maintenance mode.
		</p>
		<?php
    }
    function backend_title_callback() {
        ?>
		<input type="text" 
			id="title" 
			name="<?php echo $this->option_form_name( 'backend_title' ) ?>" 
			value="<?php echo esc_attr( Config::get( 'backend_title' ) ) ?>" />
		<?php
    }
    function backend_content_callback() {
		
		wp_editor( Config::get( 'backend_content' ), 'backend_content', array(
			'textarea_name' => $this->option_form_name( 'backend_content' ),
		) );
		
    }
	
	// Returns the form name for the given plugin option
	private function option_form_name( $option ) {
		assert( ! empty( $option ) );
		return Config::OPTION_NAME . '[' . esc_attr( $option ) . ']';
	}
	
	// Enqueues the scripts for the date/time picker JS
	function enqueue_scripts() {
		
		\wp_enqueue_script(
			'select2',
			'//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/js/select2.min.js',
			array( 'jquery' ),
			'4.0.1',
			false
		);
		
		// Avoid conflict with this plugin
		if ( class_exists( 'CMBBetterDateTimePlugin' ) ) {
			return;
		}

		\wp_enqueue_script(
			'jquery-ui',
			'//code.jquery.com/ui/1.11.2/jquery-ui.min.js',
			array( 'jquery' ),
			'1.11.2',
			false
		);

		\wp_enqueue_script(
			'jquery-timepicker',
			'//cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-timepicker-addon.min.js',
			array( 'jquery-ui' ),
			'1.4.5',
			false
		);

	}

	// Enqueues the styles for the date/time picker JS
	function enqueue_styles() {
		
		\wp_enqueue_style(
			'select2',
			'//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/css/select2.css',
			array(),
			'4.0.1',
			false
		);
		
		// Avoid conflict with this plugin
		if ( class_exists( 'CMBBetterDateTimePlugin' ) ) {
			return;
		}
		
		\wp_enqueue_style(
			'jquery-ui',
			'//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css',
			array(),
			'1.11.2',
			false
		);

		\wp_enqueue_style(
			'jquery-timepicker',
			'//cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.4.5/jquery-ui-timepicker-addon.min.css',
			array( ),
			'1.4.5',
			false
		);

	}
	
}

/**
 * Main driver class for the maintenance mode plugin.
 * 
 * @author Zachary Scott <zscott@thecode.co>
 */
class MaintenanceMode {
	
	function __construct() {
		
		add_action( 'plugins_loaded', array( $this, 'init' ) );
		
	}
	
	function init() {
		
		// Initialise the plugin configuration
		Config::init();
		
		// Setup the settings/options page
		$settings_page = new SettingsPage();
		$settings_page->build();
		
		add_action( 'admin_init', array( $this, 'disable_admin' ) );
		
	}
	
	// Disables the admin page
	function disable_admin() {

		// Dont disable ajax calls
		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			return;
		}

		
		// Only lock out backend during the maintenance window
		$current_time = current_time( 'mysql' );
		$start_time = Config::get( 'start_time' );
		$end_time = Config::get( 'end_time' );
		if ( $current_time < $start_time || $current_time >= $end_time ) {
			return;
		}
		
		// Allow users in whitelist access
		$whitelist = is_array( Config::get( 'whitelist' ) ) ? Config::get( 'whitelist' ) : array();
		if ( in_array( get_current_user_id(), $whitelist ) ) {
			return;
		}
		
		// Grab the maintenance mode message content
		
		$title = Config::get( 'backend_title' );
		$title = esc_html( $title );
		
		$content = Config::get( 'backend_content' );
		$content = wpautop( $content );
		
		// Kick em out
		
		wp_die( "<h1>{$title}</h1>{$content}" );
		
	}
	
}

// boot
new MaintenanceMode();