<?php
/**
 * Plugin Name: WP Font Manager
 * Plugin URI:  https://mightyplugins.com/product/wp-font-manager/
 * Description: WP Font Manager for managing your site google font.
 * Author:      Mighty Plugins
 * Author URI:  https://mightyplugins.com/
 * Version:     1.0.1
 * Text Domain: wp-font-manager
 * Domain Path: /languages/
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'MP_WFM_PATH' ) ) {
	define( 'MP_WFM_PATH', plugin_dir_path( __FILE__ ) );
}

if ( ! defined( 'MP_WFM_URL' ) ) {
	define( 'MP_WFM_URL', plugin_dir_url( __FILE__ ) );
}

include_once MP_WFM_PATH . '/class-wp-font-manager.php';

if ( class_exists( 'WP_Font_Manager' ) ) {
	new WP_Font_Manager();
}
