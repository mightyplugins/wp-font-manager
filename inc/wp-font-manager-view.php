<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>


<div class="wrap">
	<h1><?php _e('WP Font Manager', 'wp-font-manager'); ?></h1>
	<div class="wfm-wrap">
		<div class="wfm-topbar wp-clearfix">
			<ul class="wfm-fonts-filters wp-clearfix">
				<li>
					<select id="wfm-filter">
						<option value="all"><?php _e('Sorting', 'wp-font-manager'); ?></option>
						<option value="popularity" selected="selected">Popular</option>
						<option value="trending">Trending</option>
						<option value="style">Style</option>
						<option value="alpha">Alpha</option>
					</select>
				</li>
				<li>
					<select id="wfm-language">
						<option value="all">All subsets</option>
						<option value="arabic">Arabic</option>
						<option value="bengali">Bengali</option>
						<option value="cyrillic">Cyrillic</option>
						<option value="cyrillic-ext">Cyrillic Extended</option>
						<option value="devanagari">Devanagari</option>
						<option value="greek">Greek</option>
						<option value="greek-ext">Greek Extended</option>
						<option value="gujarati">Gujarati</option>
						<option value="hebrew">Hebrew</option>
						<option value="khmer">Khmer</option>
						<option value="latin">Latin</option>
						<option value="latin-ext">Latin Extended</option>
						<option value="tamil">Tamil</option>
						<option value="telugu">Telugu</option>
						<option value="thai">Thai</option>
						<option value="vietnamese">Vietnamese</option>
					</select>
				</li>
				<li>
					<select id="wfm-category">
						<option value="all">All Categories</option>
						<option value="serif">Serif</option>
						<option value="sans-serif">Sans Serif</option>
						<option value="display">Display</option>
						<option value="handwriting">Handwriting</option>
						<option value="monospace">Monospace</option>
					</select>
				</li>
			</ul>
			<ul class="wfm-menus wp-clearfix">
				<li class="wfm-search-wrap">
					<input type="text" id="wfm-search" class="wfm-search" placeholder="Search">
				</li>
				<li class="wfm-your-fonts-wrap">
					<strong>Your Fonts <span class="wfm-font-count"><?php echo count(get_option( 'wfm_fonts', array() )); ?></span></strong>
				</li>
				<li class="wfm-settings-wrap"><strong><i class="fa fa-cogs"></i> Settings</strong></li>
			</ul>
		</div>
		<div class="wfm-api-settings">
			<div class="wfm-api-settings-inner wp-clearfix">
				<div class="wfm-api-setting-field">
					<label for="googleapi">Google API</label>
					<input type="text" name="googleapi" id="googleapi" value="<?php echo get_option( 'wfm_google_api', '' ); ?>">
					<p>Getting Google Font data you need an API. <a href="https://developers.google.com/fonts/docs/developer_api#APIKey" target="_blank">Get an API key</a></p>
				</div>
				<div class="wfm-api-setting-field">
					<label for="demotext">Demo Text</label>
					<textarea name="demotext" id="demotext" cols="100" rows="3"><?php echo get_option( 'wfm_demo_text', 'The quick brown fox jumps over the lazy dog. 1234567890' ); ?></textarea>
				</div>
				<button class="wfm-save-api-settings" type="button"><i class="fa fa-floppy-o" aria-hidden="true"></i> Save Settings</button>
				<div class="wfm-font-api-saving"><i class="fa fa-refresh fa-spin fa-fw"></i> Saving...</div>
			</div>
		</div>
		<div class="wfm-ef-view-wrap">
			<div class="wfm-ef-view-inner wp-clearfix"></div>
		</div>
		<div class="wfm-notice"></div>
		<div class="wfm-fonts-view-wrap active">
			<div class="wfm-fonts-view"></div>
			<div class="wfm-fonts-view-overlayer"><div class="typing_loader"></div></div>
		</div>
		<div class="wfm-pagination wp-clearfix"></div>
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
				<a href="#" class="wfm-ef-update"><i class="fa fa-floppy-o" aria-hidden="true"></i> Update</a>
				<div class="wfm-font-data-updating"><i class="fa fa-refresh fa-spin fa-fw"></i> Updating...</div>
			</div>
		</div>
	</div>
</script>
<script type="text/html" id="tmpl-wfm-font-item">
	<div class="wfm-font-item wp-clearfix">
		<div class="wfm-font-item-inner">
			<div class="wfm-font-name-wrap">
				<h3 class="wfm-font-name">{{ data.name }} <span>({{ data.style }} Styles)</span></h3>
				<div class="wfm-font-styles wp-clearfix">
					<span>Style:</span>
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