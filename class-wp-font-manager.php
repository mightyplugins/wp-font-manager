<?php
/**
 * WP Font Manager
 */
class WP_Font_Manager {
	/**
	 * WP_Font_Manager class constractor
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	function __construct() {
		add_action( 'admin_menu', array( $this, 'register_pages' ) );

		add_action( 'wp_ajax_wfm_add_font', array( $this, 'add_font_data' ) );
		add_action( 'wp_ajax_wfm_remove_font', array( $this, 'remove_font_data' ) );
		add_action( 'wp_ajax_wfm_change_font', array( $this, 'change_font_data' ) );
		add_action( 'wp_ajax_wfm_update_api', array( $this, 'update_api_demo' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'load_google_font' ) );

		add_action( 'init', array( $this, 'load_textdomain' ) );
	}

	/**
	 * Loading text domain
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	function load_textdomain() {
		load_plugin_textdomain( 'wp-font-manager', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	}

	/**
	 * Register page
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function register_pages() {
		$menu = add_menu_page( __( 'WP Font Manager', 'wp-font-manager' ), __( 'WP Font Manager', 'wp-font-manager' ), 'manage_options', 'wp-font-manager', array( $this, 'wp_font_manager_view_cb' ), $this->get_svg_icon(), 99 );

		add_action( 'admin_print_styles-' . $menu, array( $this, 'wp_font_manager_css' ) );
		add_action( 'admin_print_scripts-' . $menu, array( $this, 'wp_font_manager_js' ) );
	}

	/**
	 * SVG Icon for page
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function get_svg_icon() {
		$svg = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve"><g><path d="M150,0C67.29,0,0,67.29,0,150s67.29,150,150,150s150-67.29,150-150S232.71,0,150,0z M150,270c-66.168,0-120-53.832-120-120 S83.832,30,150,30s120,53.832,120,120S216.168,270,150,270z" fill="#82878c"/><path d="M194.463,65h-76.926c-5.522,0-10,4.478-10,10v150c0,5.523,4.478,10,10,10h7.692c5.522,0,10-4.477,10-10v-62.886h49.616 c5.522,0,10-4.478,10-10v-7.306c0-5.522-4.478-10-10-10H135.23V92.308h59.233c5.522,0,10-4.478,10-10V75 C204.463,69.478,199.985,65,194.463,65z" fill="#82878c"/></g></svg>';

		return 'data:image/svg+xml;base64,' . base64_encode( $svg );
	}

	/**
	 * Include font manager view
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function wp_font_manager_view_cb() {
		include MP_WFM_PATH . '/inc/wp-font-manager-view.php';
	}

	/**
	 * Enqueue all css styles
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function wp_font_manager_css() {
		wp_enqueue_style( 'selectizejs', MP_WFM_URL . 'assets/selectizejs/css/selectize.css' );
		wp_enqueue_style( 'font-awesome', MP_WFM_URL . 'assets/font-awesome/css/font-awesome.min.css' );
		wp_enqueue_style( 'wfm-style', MP_WFM_URL . 'assets/css/style.css' );
	}

	/**
	 * Enqueue all javascripts files
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function wp_font_manager_js() {
		$min = '';

		if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
			$min = '.min';
		}

		wp_enqueue_script( 'selectizejs', MP_WFM_URL . 'assets/selectizejs/js/standalone/selectize.js', array( 'jquery', 'wp-util' ), '0.12.4', true );
		wp_enqueue_script( 'wfm-main-script', MP_WFM_URL . 'assets/js/main' . $min . '.js', array( 'jquery', 'selectizejs'), '1.0.0', true );

		wp_localize_script( 'wfm-main-script', 'wfm_data', array(
			'nonce' => wp_create_nonce( 'wfm_nonce' ),
			'ajax_url' => admin_url( 'admin-ajax.php' ),
			'font_families' => $this->get_enabled_fonts(),
			'fonts' => get_option( 'wfm_fonts', array() ),
			'api' => get_option( 'wfm_google_api', '' ),
			'api_label' => __( 'Google API', 'wp-font-manager' ),
			/* translators: %1$s: link opening  translators: %2$s: link closing */
			'api_desc' => sprintf( __( 'To use this plugin, you need a Google Font API key. %1$sGet an API key%2$s', 'wp-font-manager' ), '<a href="https://developers.google.com/fonts/docs/developer_api#APIKey" target="_blank">', '</a>' ),
			/* translators: %s: font name */
			'font_added' => sprintf( _x( '%s font added.', 'wp-font-manager' ), '<strong>FONT_NAME</strong>' ),
			/* translators: %s: font name */
			'adding_error' => sprintf( __( 'Error: we are unable to add %s font. Please try again.', 'wp-font-manager' ), '<strong>FONT_NAME</strong>' ),
			/* translators: %s: font name */
			'font_removed' => sprintf( __( '%s font removed.', 'wp-font-manager' ), '<strong>FONT_NAME</strong>' ),
			/* translators: %s: font name */
			'remov_confirm' => sprintf( __( 'Do you want to remove %s font?', 'wp-font-manager' ), 'FONT_NAME' ),
			/* translators: %s: font name */
			'removing_error' => sprintf( __( 'Error: we are unable to remove %s font. Please try again.', 'wp-font-manager' ), '<strong>FONT_NAME</strong>' ),
			/* translators: %s: font name */
			'font_data_changed' => sprintf( __( '%s font data has been updated.', 'wp-font-manager' ), '<strong>FONT_NAME</strong>' ),
			/* translators: %s: font name */
			'changing_error' => sprintf( __( 'Error: we are unable to change %s font. Please try again.', 'wp-font-manager' ), '<strong>FONT_NAME</strong>' ),
			'nothing_changed' => __( 'Nothing Changed!', 'wp-font-manager' ),
			'settings_error' => __( 'Error: we are unable to save settings. Please try again.', 'wp-font-manager' ),
			'data_error' => __( 'Error: we are unable to get font. Please check your internet connection and reload this page or try again.', 'wp-font-manager' ),
			'no_api' => __( 'Error: Google Font API key is missing. Please insert your Google API key at settings tab.', 'wp-font-manager' ),
			'api_updated' => __( 'Google Font API key updated.', 'wp-font-manager' ),
			'api_updat_fail' => __( 'Error: Google Font API key updating failed.', 'wp-font-manager' ),
			'demo_text' => __( 'Demo Text', 'wp-font-manager' ),
			/* translators: %s: icon */
			'settings' => sprintf( __( '%s Settings', 'wp-font-manager' ), 'ICON_HTML' ),
			/* translators: %s: icon */
			'save_settings' => sprintf( __( '%s Save Settings', 'wp-font-manager' ), 'ICON_HTML' ),
			/* translators: %s: icon */
			'saving' => sprintf( __( '%s Saving...', 'wp-font-manager' ), 'ICON_HTML' ),
			/* translators: %s: icon */
			'your_fonts' => sprintf( __( 'Your Fonts %s', 'wp-font-manager' ), 'YOUR_FONTS' ),
			'no_saved_font' => __( 'No font added please add a font.', 'wp-font-manager' ),
			/* translators: %s: total styles */
			'styles' => sprintf( __( '%s Styles', 'wp-font-manager' ), 'COUNT_TOTAL' ),
			/* translators: %s: icon */
			'update' => sprintf( __( '%s Update', 'wp-font-manager' ), 'ICON_HTML' ),
			/* translators: %s: icon */
			'updating' => sprintf( __( '%s Updating...', 'wp-font-manager' ), 'ICON_HTML' ),
			'filter' => array(
				'all' => __( 'Sorting', 'wp-font-manager' ),
				'popularity' => __( 'Popular', 'wp-font-manager' ),
				'trending' => __( 'Trending', 'wp-font-manager' ),
				'style' => __( 'Style', 'wp-font-manager' ),
				'alpha' => __( 'Alpha', 'wp-font-manager' ),
			),
			'language' => array(
				'all' => __( 'All subsets', 'wp-font-manager' ),
				'arabic' => __( 'Arabic', 'wp-font-manager' ),
				'bengali' => __( 'Bengali', 'wp-font-manager' ),
				'cyrillic' => __( 'Cyrillic', 'wp-font-manager' ),
				'cyrillic_ext' => __( 'Cyrillic Extended', 'wp-font-manager' ),
				'devanagari' => __( 'Devanagari', 'wp-font-manager' ),
				'greek' => __( 'Greek', 'wp-font-manager' ),
				'greek_ext' => __( 'Greek Extended', 'wp-font-manager' ),
				'gujarati' => __( 'Gujarati', 'wp-font-manager' ),
				'gurmukhi' => __( 'Gurmukhi', 'wp-font-manager' ),
				'hebrew' => __( 'Hebrew', 'wp-font-manager' ),
				'kannada' => __( 'Kannada', 'wp-font-manager' ),
				'khmer' => __( 'Khmer', 'wp-font-manager' ),
				'latin' => __( 'Latin', 'wp-font-manager' ),
				'latin_ext' => __( 'Latin Extended', 'wp-font-manager' ),
				'malayalam' => __( 'Malayalam', 'wp-font-manager' ),
				'myanmar' => __( 'Myanmar', 'wp-font-manager' ),
				'oriya' => __( 'Oriya', 'wp-font-manager' ),
				'sinhala' => __( 'Sinhala', 'wp-font-manager' ),
				'tamil' => __( 'Tamil', 'wp-font-manager' ),
				'telugu' => __( 'Telugu', 'wp-font-manager' ),
				'thai' => __( 'Thai', 'wp-font-manager' ),
				'vietnamese' => __( 'Vietnamese', 'wp-font-manager' ),
			),
			'category' => array(
				'all' => __( 'All Categories', 'wp-font-manager' ),
				'serif' => __( 'Serif', 'wp-font-manager' ),
				'sans_serif' => __( 'Sans Serif', 'wp-font-manager' ),
				'display' => __( 'Display', 'wp-font-manager' ),
				'handwriting' => __( 'Handwriting', 'wp-font-manager' ),
				'monospace' => __( 'Monospace', 'wp-font-manager' ),
			),
		) );
	}

	/**
	 * Return all enabled fonts from option
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function get_enabled_fonts() {
		$all_family = array();
		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if ( ! empty( $wfm_fonts ) ) {
			foreach ( $wfm_fonts as $wfm_font ) {
				$all_family[] = $wfm_font['all']['family'];
			}
		}

		return $all_family;
	}

	/**
	 * Add Font by Ajax
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function add_font_data() {
		if ( isset( $_POST['nonce'] ) && ! wp_verify_nonce( sanitize_key( $_POST['nonce'] ), 'wfm_nonce' ) ) {
			echo 0;
			die();
		}

		$font_family = isset( $_POST['font'] ) && isset( $_POST['font']['family'] ) ? sanitize_text_field( wp_unslash( $_POST['font']['family'] ) ) : '';
		$font_subsets = isset( $_POST['font'] ) && isset( $_POST['font']['subsets'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['font']['subsets'] ) ) : array();
		$font_variants = isset( $_POST['font'] ) && isset( $_POST['font']['variants'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['font']['variants'] ) ) : array();

		if ( array_search( $font_family, $this->get_enabled_fonts() ) !== false ) {
			echo '2';
			die();
		}
		$font_data = array(
			'all' => array(
				'family' => $font_family,
				'subsets' => $font_subsets,
				'variants' => $font_variants,
			),
		);
		$font_data['enabled'] = array(
			'subsets' => array(),
			'variants' => $font_variants,
		);

		if ( ! empty( $font_subsets ) && is_array( $font_subsets ) ) {
			foreach ( $font_subsets as $subset ) {
				if ( 'latin' == $subset ) {
					$font_data['enabled']['subsets'][] = $subset;
				}
			}
		}

		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if ( ! is_array( $wfm_fonts ) ) {
			$wfm_fonts = array();
		}

		$wfm_fonts[] = $font_data;

		update_option( 'wfm_fonts', $wfm_fonts );
		echo 1;
		die();
	}

	/**
	 * Remove font by Ajax
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function remove_font_data() {
		if ( isset( $_POST['nonce'] ) && ! wp_verify_nonce( sanitize_key( $_POST['nonce'] ), 'wfm_nonce' ) ) {
			echo 0;
			die();
		}

		$font_name = isset( $_POST['font'] ) ? sanitize_text_field( wp_unslash( $_POST['font'] ) ) : '';
		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if ( ! empty( $wfm_fonts ) ) {
			foreach ( $wfm_fonts as $key => $font ) {
				if ( isset( $font['all'] ) && isset( $font['all']['family'] ) && $font['all']['family'] == $font_name ) {
					unset( $wfm_fonts[ $key ] );

					update_option( 'wfm_fonts', $wfm_fonts );
					echo 1;
					die();
				}
			}
		}

		echo 0;
		die();
	}

	/**
	 * Change font data by Ajax
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function change_font_data() {
		if ( isset( $_POST['nonce'] ) && ! wp_verify_nonce( sanitize_key( $_POST['nonce'] ), 'wfm_nonce' ) ) {
			echo 0;
			die();
		}

		$font_name = isset( $_POST['font'] ) ? sanitize_text_field( wp_unslash( $_POST['font'] ) ) : '';
		$font_subsets = isset( $_POST['subsets'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['subsets'] ) ) : array();
		$font_variants = isset( $_POST['variants'] ) ? array_map( 'sanitize_text_field', wp_unslash( $_POST['variants'] ) ) : array();

		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if ( ! empty( $wfm_fonts ) ) {
			foreach ( $wfm_fonts as $key => $font ) {
				if ( isset( $font['all'] ) && isset( $font['all']['family'] ) && $font['all']['family'] == $font_name ) {
					$wfm_fonts[ $key ]['enabled']['subsets'] = $font_subsets;
					$wfm_fonts[ $key ]['enabled']['variants'] = $font_variants;
				}
			}
		}

		update_option( 'wfm_fonts', $wfm_fonts );
		echo 1;
		die();
	}

	/**
	 * Update google font API by Ajax
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function update_api_demo() {
		if ( isset( $_POST['nonce'] ) && ! wp_verify_nonce( sanitize_key( $_POST['nonce'] ), 'wfm_nonce' ) ) {
			echo 0;
			die();
		}

		$api = isset( $_POST['api'] ) ? sanitize_text_field( wp_unslash( $_POST['api'] ) ) : '';

		update_option( 'wfm_google_api', $api );

		echo 1;
		die();
	}

	/**
	 * Load google font to front end
	 *
	 * @package		WP_Font_Manager
	 * @since		1.0.0
	 */
	public function load_google_font() {
		$wfm_fonts = get_option( 'wfm_fonts', array() );

		if ( empty( $wfm_fonts ) ) {
			return;
		}

		$fonts = array();
		$all_subsets = array();

		if ( ! empty( $wfm_fonts ) ) {
			foreach ( $wfm_fonts as $font ) {
				$temp_font = str_replace( ' ', '+', $font['all']['family'] );
				$subsets = $font['enabled']['subsets'];
				$variants = implode( ',', $font['enabled']['variants'] );

				if ( ! empty( $variants ) ) {
					$temp_font .= ':' . $variants;
				}

				$fonts[] = $temp_font;

				if ( ! empty( $subsets ) ) {
					foreach ( $subsets as $subset ) {
						$all_subsets[] = $subset;
					}
				}
			}
		}

		$all_subsets = array_unique( $all_subsets );

		$key = array_search( 'latin', $all_subsets );

		if ( false !== $key ) {
			unset( $all_subsets[ $key ] );
		}

		$font_link = '//fonts.googleapis.com/css?family=';

		$font_link .= implode( '|', $fonts );

		if ( ! empty( $all_subsets ) ) {
			$font_link .= '&amp;subset=';
			$font_link .= implode( ',', $all_subsets );
		}
		wp_enqueue_style( 'wfm-google-font', $font_link );
	}
}
