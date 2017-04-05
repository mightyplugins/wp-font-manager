<?php
/**
 * Plugin Name: WP Font Manager
 * Plugin URI:  https://mightyplugins.com/
 * Description: WP Font Manager for managing your site google font.
 * Author:      Mighty Plugins
 * Author URI:  https://mightyplugins.com/
 * Version:     1.0.0
 * Text Domain: wp-font-manager
 * Domain Path: /languages/
 */

if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! defined( 'MP_WFM_PATH' ) ){
	define('MP_WFM_PATH', plugin_dir_path( __FILE__ ));
}

if ( ! defined( 'MP_WFM_URL' ) ){
	define('MP_WFM_URL', plugin_dir_url( __FILE__ ));
}

/**
* WP Font Manager
*/
class WP_Font_Manager
{
	
	function __construct()
	{
		add_action( 'admin_menu', array($this, 'register_pages') );

		add_action( 'wp_ajax_wfm_add_font', array($this, 'add_font_data') );
		add_action( 'wp_ajax_wfm_remove_font', array($this, 'remove_font_data') );
		add_action( 'wp_ajax_wfm_change_font', array($this, 'change_font_data') );
		add_action( 'wp_ajax_wfm_update_api', array($this, 'update_api_demo') );

		add_action( 'wp_enqueue_scripts', array($this, 'load_google_font') );

		add_action( 'init', array($this, 'load_textdomain') );
	}

	function load_textdomain() {
		load_plugin_textdomain( 'wp-font-manager', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
	}

	public function register_pages()
	{
		$menu = add_menu_page(__('WP Font Manager', 'wp-font-manager'), __('WP Font Manager', 'wp-font-manager'), 'manage_options', 'wp-font-manager', array($this, 'wp_font_manager_view_cb'), $this->get_svg_icon(), 99);

		add_action( 'admin_print_styles-' . $menu, array($this, 'wp_font_manager_css') );
		add_action( 'admin_print_scripts-' . $menu, array($this, 'wp_font_manager_js') );
	}

	public function get_svg_icon()
	{
		$svg = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve"><g><path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z M150,270c-66.168,0-120-53.832-120-120 S83.832,30,150,30s120,53.832,120,120S216.168,270,150,270z" fill="#82878c"/><path d="M194.463,65h-76.926c-5.522,0-10,4.478-10,10v150c0,5.523,4.478,10,10,10h7.692c5.522,0,10-4.477,10-10v-62.886h49.616 c5.522,0,10-4.478,10-10v-7.306c0-5.522-4.478-10-10-10H135.23V92.308h59.233c5.522,0,10-4.478,10-10V75 C204.463,69.478,199.985,65,194.463,65z" fill="#82878c"/></g></svg>';

  		return 'data:image/svg+xml;base64,' . base64_encode( $svg );
	}

	public function wp_font_manager_view_cb()
	{
		include MP_WFM_PATH.'/inc/wp-font-manager-view.php';
	}

	public function wp_font_manager_css()
	{
		wp_enqueue_style('selectizejs', MP_WFM_URL.'assets/selectizejs/css/selectize.css'  );
		wp_enqueue_style('wfm-style', MP_WFM_URL.'assets/css/style.css'  );
		
	}

	public function wp_font_manager_js()
	{
		wp_enqueue_script( 'jquery-masonry' );
		wp_enqueue_script( 'selectizejs', MP_WFM_URL.'assets/selectizejs/js/selectize.min.js', array('jquery'), '0.12.4', true );
		wp_enqueue_script( 'wfm-scripts', MP_WFM_URL.'assets/js/scripts.js', array('jquery', 'selectizejs', 'jquery-masonry'), '1.0.0', true );

		wp_localize_script( 'wfm-scripts', 'wfm_data', array(
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'font_families' => $this->get_enabled_fonts(),
			'fonts' => get_option( 'wfm_fonts', array() ),
			'api' => get_option( 'wfm_google_api', '' ),
			'font_added' => sprintf(__('%s font added.', 'wp-font-manager'), '<strong>{{ data.name }}</strong>'),
			'adding_error' => sprintf(__('Error: we are unable to add %s font. Please try again.', 'wp-font-manager'), '<strong>{{ data.name }}</strong>'),
			'font_removed' => sprintf(__('%s font removed.', 'wp-font-manager'), '<strong>{{ data.name }}</strong>'),
			'removing_error' => sprintf(__('Error: we are unable to remove %s font. Please try again.', 'wp-font-manager'), '<strong>{{ data.name }}</strong>'),
			'font_data_changed' => sprintf(__('%s font data has been updated.', 'wp-font-manager'), '<strong>{{ data.name }}</strong>'),
			'changing_error' => sprintf(__('Error: we are unable to change %s font. Please try again.', 'wp-font-manager'), '<strong>{{ data.name }}</strong>'),
			'settings_error' => __('Error: we are unable to save settings. Please try again.', 'wp-font-manager'),
			'data_error' => __('Error: we are unable to get font. Please check your internet connection and reload this page or try again.', 'wp-font-manager'),
			'no_api' => __('Error: Please insert a Google Font API. Google font api is requered for this plugin.')
		) );
	}

	public function get_enabled_fonts()
	{
		$all_family = array();
		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if (!empty($wfm_fonts)) {
			foreach ($wfm_fonts as $wfm_font) {
				$all_family[] = $wfm_font['all']['family'];
			}
		}

		return $all_family;
	}

	public function add_font_data()
	{
		$font_data = array();

		$font = $_POST['font'];

		if (array_search($font['family'], $this->get_enabled_fonts()) !== false) {
			echo '2';
			die();
		}

		$font_data['all'] = $font;
		$font_data['enabled'] = array(
			'subsets' => array(),
			'variants' => $font['variants'],
		);

		if (isset($font['subsets']) && !empty($font['subsets']) && is_array($font['subsets'])) {
			foreach ($font['subsets'] as $subset) {
				if($subset == 'latin'){
					$font_data['enabled']['subsets'][] = $subset;
				}
			}
			
		}

		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if (!is_array($wfm_fonts)) {
			$wfm_fonts = array();
		}

		$wfm_fonts[] = $font_data;

		echo update_option( 'wfm_fonts', $wfm_fonts );
		die();
	}

	public function remove_font_data()
	{
		$font_name = $_POST['font'];
		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if (!empty($wfm_fonts)) {
			foreach ($wfm_fonts as $key => $font) {
				if($font['all']['family'] == $font_name){
					unset($wfm_fonts[$key]);

					echo update_option( 'wfm_fonts', $wfm_fonts );
					die();
				}
			}
		}

		echo 0;
		die();
	}


	public function change_font_data()
	{
		$font_name = $_POST['font'];
		$font_subsets = $_POST['subsets'];
		$font_variants = $_POST['variants'];

		if (!is_array($font_subsets)) {
			$font_subsets = array();
		}

		if (!is_array($font_variants)) {
			$font_variants = array();
		}

		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if (!empty($wfm_fonts)) {
			foreach ($wfm_fonts as $key => $font) {
				if($font['all']['family'] == $font_name){
					$wfm_fonts[$key]['enabled']['subsets'] = $font_subsets;
					$wfm_fonts[$key]['enabled']['variants'] = $font_variants;
				}
			}
		}

		echo update_option( 'wfm_fonts', $wfm_fonts );
		die();
	}

	public function update_api_demo()
	{
		$api = $_POST['api'];
		$demo = $_POST['demo'];

		update_option( 'wfm_google_api', $api );
		update_option( 'wfm_demo_text', $demo );

		echo 1;
		die();
	}

	public function load_google_font()
	{
		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if (empty($wfm_fonts)) {
			return;
		}

		$fonts = array();
		$all_subsets = array();

		if (!empty($wfm_fonts)) {
			foreach ($wfm_fonts as $font) {
				$temp_font = str_replace(' ', '+', $font['all']['family']);
				$subsets = $font['enabled']['subsets'];
				$variants = implode(',', $font['enabled']['variants']);

				if (!empty($variants)) {
					$temp_font .= ':'.$variants;
				}

				$fonts[] = $temp_font;

				if (!empty($subsets)) {
					foreach ($subsets as $subset) {
						$all_subsets[] = $subset;
					}
				}

			}
		}

		$all_subsets = array_unique($all_subsets);

		$font_link = '//fonts.googleapis.com/css?family=';

		$font_link .= implode('|', $fonts);

		if (!empty($all_subsets)) {
			$font_link .= '&amp;subset=';
			$font_link .= implode(',', $all_subsets);
		}
		
		wp_enqueue_style( 'wfm-google-font', $font_link );
	}
}

new WP_Font_Manager();