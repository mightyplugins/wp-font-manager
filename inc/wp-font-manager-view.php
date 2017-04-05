<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>


<div class="wrap">
	<h1><?php _e('WP Font Manager', 'wp-font-manager'); ?></h1>
	<div class="wfm-wrap">
		<div class="wfm-notice"></div>
		<div class="wfm-topbar wp-clearfix">
			<ul class="wfm-fonts-filters wp-clearfix">
				<li>
					<select id="wfm-filter">
						<option value="all"><?php _e('Sorting', 'wp-font-manager'); ?></option>
						<option value="popularity" selected="selected"><?php _e('Popular', 'wp-font-manager'); ?></option>
						<option value="trending"><?php _e('Trending', 'wp-font-manager'); ?></option>
						<option value="style"><?php _e('Style', 'wp-font-manager'); ?></option>
						<option value="alpha"><?php _e('Alpha', 'wp-font-manager'); ?></option>
					</select>
				</li>
				<li>
					<select id="wfm-language">
						<option value="all"><?php _e('All subsets', 'wp-font-manager'); ?></option>
						<option value="arabic"><?php _e('Arabic', 'wp-font-manager'); ?></option>
						<option value="bengali"><?php _e('Bengali', 'wp-font-manager'); ?></option>
						<option value="cyrillic"><?php _e('Cyrillic', 'wp-font-manager'); ?></option>
						<option value="cyrillic-ext"><?php _e('Cyrillic Extended', 'wp-font-manager'); ?></option>
						<option value="devanagari"><?php _e('Devanagari', 'wp-font-manager'); ?></option>
						<option value="greek"><?php _e('Greek', 'wp-font-manager'); ?></option>
						<option value="greek-ext"><?php _e('Greek Extended', 'wp-font-manager'); ?></option>
						<option value="gujarati"><?php _e('Gujarati', 'wp-font-manager'); ?></option>
						<option value="hebrew"><?php _e('Hebrew', 'wp-font-manager'); ?></option>
						<option value="khmer"><?php _e('Khmer', 'wp-font-manager'); ?></option>
						<option value="latin"><?php _e('Latin', 'wp-font-manager'); ?></option>
						<option value="latin-ext"><?php _e('Latin Extended', 'wp-font-manager'); ?></option>
						<option value="tamil"><?php _e('Tamil', 'wp-font-manager'); ?></option>
						<option value="telugu"><?php _e('Telugu', 'wp-font-manager'); ?></option>
						<option value="thai"><?php _e('Thai', 'wp-font-manager'); ?></option>
						<option value="vietnamese"><?php _e('Vietnamese', 'wp-font-manager'); ?></option>
					</select>
				</li>
				<li>
					<select id="wfm-category">
						<option value="all"><?php _e('All Categories', 'wp-font-manager'); ?></option>
						<option value="serif"><?php _e('Serif', 'wp-font-manager'); ?></option>
						<option value="sans-serif"><?php _e('Sans Serif', 'wp-font-manager'); ?></option>
						<option value="display"><?php _e('Display', 'wp-font-manager'); ?></option>
						<option value="handwriting"><?php _e('Handwriting', 'wp-font-manager'); ?></option>
						<option value="monospace"><?php _e('Monospace', 'wp-font-manager'); ?></option>
					</select>
				</li>
			</ul>
			<ul class="wfm-menus wp-clearfix">
				<li class="wfm-search-wrap">
					<input type="text" id="wfm-search" class="wfm-search" placeholder="Search">
				</li>
				<li class="wfm-your-fonts-wrap">
					<strong><?php _e('Your Fonts', 'wp-font-manager'); ?> <span class="wfm-font-count"><?php echo count(get_option( 'wfm_fonts', array() )); ?></span></strong>
				</li>
				<li class="wfm-settings-wrap"><strong><i class="fa fa-cogs"></i> <?php _e('Settings', 'wp-font-manager'); ?></strong></li>
			</ul>
		</div>
		<div class="wfm-api-settings">
			<div class="wfm-api-settings-inner wp-clearfix">
				<div class="wfm-api-setting-field">
					<label for="googleapi"><?php _e('Google API', 'wp-font-manager'); ?></label>
					<input type="text" name="googleapi" id="googleapi" value="<?php echo get_option( 'wfm_google_api', '' ); ?>">
					<p><?php _e('Getting Google Font data you need an API.', 'wp-font-manager'); ?> <a href="https://developers.google.com/fonts/docs/developer_api#APIKey" target="_blank"><?php _e('Get an API key', 'wp-font-manager'); ?></a></p>
				</div>
				<div class="wfm-api-setting-field">
					<label for="demotext"><?php _e('Demo Text', 'wp-font-manager'); ?></label>
					<textarea name="demotext" id="demotext" cols="100" rows="3"><?php echo get_option( 'wfm_demo_text', 'The quick brown fox jumps over the lazy dog. 1234567890' ); ?></textarea>
				</div>
				<button class="wfm-save-api-settings" type="button"><i class="fa fa-floppy-o" aria-hidden="true"></i> <?php _e('Save Settings', 'wp-font-manager'); ?></button>
				<div class="wfm-font-api-saving"><i class="fa fa-refresh fa-spin fa-fw"></i> <?php _e('Saving...', 'wp-font-manager'); ?></div>
			</div>
		</div>
		<div class="wfm-ef-view-wrap">
			<div class="wfm-ef-view-inner wp-clearfix"></div>
		</div>
		
		<div class="wfm-fonts-view-wrap active">
			<div class="wfm-fonts-view"></div>
			<div class="wfm-fonts-view-overlayer"><div class="typing_loader"></div></div>
		</div>
		<div class="wfm-pagination wp-clearfix"></div>
		<div class="wfm-notification"></div>
	</div>
</div>

<script type="text/html" id="tmpl-wfm-font-enabled-item">
	<div class="wfm-enabled-font-item">
		<div class="wfm-enabled-font-item-inner">
			<div class="wfm-enabled-font-data">
				<h3 class="wfm-enabled-font-name">{{ data.name }}</h3>
				<div class="wfm-enabled-font-controls">
					<a href="#" class="wfm-ef-remove"><i class="fa fa-trash"></i></a>
					<a href="#" class="wfm-ef-settings"><i class="fa fa-cog"></i></a>
				</div>
			</div>
			<div class="wfm-enabled-font-settings">
				<div class="wfm-row wp-clearfix">
					<div class="wfm-enabled-font-variants">
						<# _.each(data.variants, function(value){ #>
							<# if(data.enabledVariants.indexOf(value) !== -1){ #>
								<label><input type="checkbox" class="wfm-ef-variant-checkbox" value="{{ value }}" checked="checked"> {{ value }}</label>
							<# } else { #>
								<label><input type="checkbox" class="wfm-ef-variant-checkbox" value="{{ value }}"> {{ value }}</label>
							<# } #>
							
						<# }); #>
					</div>
					<div class="wfm-enabled-font-subsets">
						<# _.each(data.subsets, function(value){ #>
							<# if(data.enabledSubsets.indexOf(value) !== -1){ #>
								<label><input type="checkbox" class="wfm-ef-subset-checkbox" value="{{ value }}" checked="checked"> {{ value }}</label>
							<# } else { #>
								<label><input type="checkbox" class="wfm-ef-subset-checkbox" value="{{ value }}"> {{ value }}</label>
							<# } #>
							
						<# }); #>
					</div>
				</div>
				<a href="#" class="wfm-ef-update"><i class="fa fa-floppy-o" aria-hidden="true"></i> <?php _e('Update', 'wp-font-manager'); ?></a>
				<div class="wfm-font-data-updating"><i class="fa fa-refresh fa-spin fa-fw"></i> <?php _e('Updating...', 'wp-font-manager'); ?></div>
			</div>
		</div>
	</div>
</script>
<script type="text/html" id="tmpl-wfm-font-item">
	<div class="wfm-font-item wp-clearfix">
		<div class="wfm-font-item-inner">
			<div class="wfm-font-name-wrap">
				<h3 class="wfm-font-name">{{ data.name }} <span>({{ data.style }} <?php _e('Styles', 'wp-font-manager'); ?>)</span></h3>
				<div class="wfm-font-styles wp-clearfix">
					<span><?php _e('Style:', 'wp-font-manager'); ?></span>
					<select name="" id="">
						<# _.each(data.variants, function(label, value){ #>
							<# if(value == 400){ #>
								<option value="{{ value }}" selected="selected">{{ label }}</option>
							<# } else { #>
								<option value="{{ value }}">{{ label }}</option>
							<# } #>
							
						<# }); #>
					</select>
				</div>
				<# if(data.enabled){ #>
					<a href="#" class="wfm-add-font wfm-added"><span class="dashicons dashicons-yes"></span></a>
				<# } else { #>
					<a href="#" class="wfm-add-font"><span class="dashicons dashicons-plus"></span></a>
				<# } #>
			</div>
			<div class="wfm-font-demo" style="font-family: {{ data.name }};">
				<?php echo get_option( 'wfm_demo_text', 'The quick brown fox jumps over the lazy dog. 1234567890' ); ?>
			</div>
		</div>
		<link rel='stylesheet' onload="wfm_core.font_loaded()" href='{{{ data.glink }}}' type='text/css' media='all' />
	</div>
</script>

<script type="text/html" id="tmpl-wfm-notification-item">
	<div class="wfm-notification-item wfm-notification-type-{{ data.type }}">
		<div class="wfm-notification-message">{{{ data.message }}}</div>
	</div>
</script>

<script type="text/html" id="tmpl-wfm-notice-item">
	<div class="wfm-notice-item notice updated settings-error is-dismissible wfm-notice-type-{{ data.type }}">
		<div class="wfm-notice-message">{{{ data.message }}}</div>
		<button type="button" class="notice-dismiss"><span class="screen-reader-text"><?php _e('Dismiss this notice.', 'wp-font-manager'); ?></span></button>
	</div>
</script>