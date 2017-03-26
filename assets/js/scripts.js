(function($, wp) {
	$('.wfm-topbar select').selectize();
	$('.wfm-font-item .wfm-font-styles select').selectize();

	var $grid = $('.wfm-fonts-view').masonry({
		// options
		itemSelector: '.wfm-font-item',
		// columnWidth: '.wfm-font-item'
	});


	window.wfm_core = {
		url : '//fonts.googleapis.com/css?family=',
		apiUrl: 'https://www.googleapis.com/webfonts/v1/webfonts?key='+wfm_data.api+'&callback=wfm_core.run',
		container: $('.wfm-fonts-view'),
		pagination: $('.wfm-pagination'),
		overlayer: $('.wfm-fonts-view-wrap'),
		efContainer: $('.wfm-ef-view-inner'),
		fonts: [],
		items: [],
		fontView: wp.template('wfm-font-item'),
		enabledFontView: wp.template('wfm-font-enabled-item'),
		perPage: 20,
		init: function () {
			

			this.onClickAddBtn();

			this.triggerFilter();

			this.sorting();

			this.runEnabledFont();

			this.onClickYourFont();

			this.onClickUpdateBtn();

			this.onClickApiUpdate();

			this.onClickSettings();

			

			$('body').on('relayout', function () {
				setTimeout(function () {
					$grid.masonry();
				}, 1000);
			});

			if (_.isEmpty(wfm_data.api)) {
				return;
			}

			$.get(this.apiUrl+'&sort=popularity');

		},
		run: function (json) {
			if( typeof json != 'object' || typeof json.items != 'object'  ){
				return;
			}

			this.items = json.items;
			this.fonts = json.items;

			this.renderFonts(0);

			this.renderPagination();

			
		},
		renderFonts: function (page) {
			var from = (page * this.perPage),
				to = (((page + 1) * this.perPage) - 1),
				self = this;

			$('.wfm-fonts-view .wfm-font-item').each(function () {
				$grid.masonry( 'remove', $(this) );
			});

			self.container.html('');

			for (var i = from; i <= to; i++) {

				if (typeof self.fonts[i] !== 'undefined') {
					
					var fontData = {
						name: self.fonts[i].family,
						style: self.fonts[i].variants.length,
						glink: self.buildLink(self.fonts[i].family, self.fonts[i].variants),
						variants: self.processVariants(self.fonts[i].variants),
						enabled: false
					};

					if (wfm_data.font_families.indexOf(self.fonts[i].family) !== -1) {
						fontData.enabled = true;
					}

					var itemObj = $(self.fontView(fontData));

					itemObj.addClass(fontData.name.toLowerCase().replace(/ /g, '-'));

					itemObj.find('.wfm-font-styles select').selectize();
					itemObj.find('.wfm-add-font').data('gfont', self.fonts[i]);

					var selectedValue = itemObj.find('.wfm-font-styles select').val(),
						demoCss = self.getCssFromVal(selectedValue);

					itemObj.find('.wfm-font-demo').css(demoCss);

					itemObj.find('.wfm-font-styles select').on('change', function () {
						var parent = $(this).parents('.wfm-font-item'),
							selectedValue2 = $(this).val(),
							demoCss2 = self.getCssFromVal(selectedValue2);

						parent.find('.wfm-font-demo').css(demoCss2);

						setTimeout(function () {
							$grid.masonry();
						}, 500);
					});

					itemObj.on('load', function () {
						$grid.masonry();
					});

					$grid.masonry().append( itemObj ).masonry( 'appended', itemObj ).masonry();
				}

			}

			self.overlayer.removeClass('active');

			
		},
		renderPagination: function () {
			var self = this,
				pages = parseInt(self.fonts.length / self.perPage),
				paged = self.fonts.length - (pages * self.perPage),
				html = '<ul>';

			self.pagination.html('');

			if (!paged) {
				pages = pages - 1;
			}

			html += '<li class="wfm-prev"><span><i class="fa fa-angle-left" aria-hidden="true"></i></span></li>';

			for (var i = 0; i <= pages; i++) {

				if (pages <= 6) {
					if (!i) {
						html += '<li class="active wfm-enable-force"><a href="#" data-page="'+i+'" class="active">'+(i+1)+'</a></li>';
					} else {
						html += '<li class="wfm-enable-force"><a href="#" data-page="'+i+'">'+(i+1)+'</a></li>';
					}
				} else {
					if (i == pages ) {
						html += '<li class="wfm-dots wfm-last-dots"><span>...</span></li>';
					}

					if (!i) {
						html += '<li class="active"><a href="#" data-page="'+i+'" class="active">'+(i+1)+'</a></li>';
					} else if (i == pages) {
						html += '<li class="last-item"><a href="#" data-page="'+i+'">'+(i+1)+'</a></li>';
					} else {
						html += '<li><a href="#" data-page="'+i+'">'+(i+1)+'</a></li>';
					}

					if (i == 1) {
						html += '<li class="wfm-dots wfm-first-dots"><span>...</span></li>';
					}
				}

				
				
			}

			html += '<li class="wfm-next"><span><i class="fa fa-angle-right" aria-hidden="true"></i></span></li>';

			html += '</ul>';

			var obj = $(html);

			obj.find('> li > a').on('click', function (e) {
				e.preventDefault();

				var btn = $(this);
				if (!btn.hasClass('active')) {
					var page = btn.data('page');

					$('.wfm-pagination ul li.wfm-enable').removeClass('wfm-enable');


					if (btn.parent().prev().hasClass('wfm-first-dots') || btn.parent().prev().prev().hasClass('wfm-first-dots') || btn.parent().hasClass('last-item')) {
						$('.wfm-pagination ul li.wfm-first-dots').addClass('wfm-disable');
					} else {
						$('.wfm-pagination ul li.wfm-first-dots').removeClass('wfm-disable');
					}

					if (!btn.parent().prev().hasClass('wfm-first-dots')) {
						btn.parent().prev().addClass('wfm-enable');
					}

					$('.wfm-pagination ul li.active').removeClass('active');
					$('.wfm-pagination ul li a.active').removeClass('active');

					$('.wfm-pagination ul li a[data-page="'+page+'"]').addClass('active');
					$('.wfm-pagination ul li a[data-page="'+page+'"]').parent().addClass('active');

					self.overlayer.addClass('active');

					setTimeout(function () {
						self.renderFonts(page);
					}, 500);
				}
				
			});

			obj.find('> li.wfm-next').on('click', function (e) {
				e.preventDefault();

				var next = $('.wfm-pagination ul li.active').next();

				if (next.hasClass('wfm-dots')) {
					next = next.next();
				}

				next.find('a').trigger('click');
			});

			obj.find('> li.wfm-prev').on('click', function (e) {
				e.preventDefault();

				var prev = $('.wfm-pagination ul li.active').prev();

				if (prev.hasClass('wfm-dots')) {
					prev = prev.prev();
				}

				prev.find('a').trigger('click');
			});

			self.pagination.html(obj);
		},
		getCssFromVal: function ( value ) {
			var css = {};
			if(value.indexOf('_') == -1){
				css['font-weight'] = value;
				css['font-style'] = 'normal';
			} else {
				var newVal = value.split('_');

				css['font-weight'] = newVal[0];
				css['font-style'] = newVal[1];
			}

			return css;
		},
		buildLink: function (name, variants) {
			var link = this.url;

			link += name.replace(/ /g, '+')+':'+variants.join(',');

			return link;
		},
		font_loaded: function () {
			$('body').trigger('relayout');
		},
		onClickAddBtn: function () {
			var self = this;
			this.container.on('click', '.wfm-add-font', function (e) {
				e.preventDefault();

				if ($(this).hasClass('wfm-added')) {
					return;
				}

				var fontData = $(this).data('gfont'),
					btn = $(this),
					data = {
						action: 'wfm_add_font',
						font: {
							'family': fontData.family,
							'subsets': fontData.subsets,
							'variants': fontData.variants,
						}
					};


				$.ajax({
					url: wfm_data.ajax_url,
					method: "POST",
					data: data
				}).done(function (html) {
					if (html == 1) {
						btn.addClass('wfm-added');
						btn.find('.dashicons-plus').removeClass('dashicons-plus').addClass('dashicons-yes');

						var fontDataInit = {
							name: fontData.family,
							variants: fontData.variants,
							subsets: fontData.subsets,
							enabledVariants: fontData.variants,
							enabledSubsets: [],
						};

						if (fontData.subsets.indexOf('latin') !== -1) {
							fontDataInit.enabledSubsets.push('latin');
						}

						self.initEnabledFont(fontDataInit);

						var count = parseInt($('.wfm-font-count').html());

						count += 1;

						$('.wfm-font-count').html(count);
					}
				});
			});
		},
		processVariants: function (variants) {
			var fontVariants = {};

			_.each(variants, function (variant) {
				var temp = variant;

				if(variant == 'regular'){
					fontVariants['400'] = 'Regular 400';
				} else if(variant == 'italic'){
					fontVariants['400_italic'] = 'Regular 400 Italic';
				} else {
					if (_.isEmpty(temp.replace(/\d+/g, ''))) {
						variant = parseInt(variant);

						if (variant == 100) {
							fontVariants[variant] = 'Thin '+variant;
						} else if (variant == 200) {
							fontVariants[variant] = 'Extra-Light '+variant;
						} else if (variant == 300) {
							fontVariants[variant] = 'Light '+variant;
						} else if (variant == 400) {
							fontVariants[variant] = 'Regular '+variant;
						} else if (variant == 500) {
							fontVariants[variant] = 'Medium '+variant;
						} else if (variant == 600) {
							fontVariants[variant] = 'Semi-Bold '+variant;
						} else if (variant == 700) {
							fontVariants[variant] = 'Bold '+variant;
						} else if (variant == 800) {
							fontVariants[variant] = 'Extra-Bold '+variant;
						} else if (variant == 900) {
							fontVariants[variant] = 'Black '+variant;
						}
					} else {
						if (!_.isEmpty(temp.replace(/[a-zA-Z]+/g, ''))) {

							if (temp.replace(/[a-zA-Z]+/g, '') == 100) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Thin '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							} else if (temp.replace(/[a-zA-Z]+/g, '') == 200) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Extra-Light '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							} else if (temp.replace(/[a-zA-Z]+/g, '') == 300) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Light '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							} else if (temp.replace(/[a-zA-Z]+/g, '') == 400) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Regular '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							} else if (temp.replace(/[a-zA-Z]+/g, '') == 500) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Medium '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							} else if (temp.replace(/[a-zA-Z]+/g, '') == 600) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Semi-Bold '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							} else if (temp.replace(/[a-zA-Z]+/g, '') == 700) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Bold '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							} else if (temp.replace(/[a-zA-Z]+/g, '') == 800) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Extra-Bold '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							} else if (temp.replace(/[a-zA-Z]+/g, '') == 900) {
								fontVariants[variant.replace(/[a-zA-Z]+/g, '')+'_'+temp.replace(/\d+/g, '')] = 'Black '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
							}
						}
					}
				}
			});

			return fontVariants;
		},
		triggerFilter: function () {
			var self = this;

			$('#wfm-search').on('change keyup', function () {
				self.applyFilter()
			});

			$('#wfm-language').on('change', function () {
				self.applyFilter()
			});

			$('#wfm-category').on('change', function () {
				self.applyFilter()
			});
		},
		applyFilter: function () {
			var self = this,
				search = $('#wfm-search').val(),
				lang = $('#wfm-language').val(),
				cat = $('#wfm-category').val();

			self.overlayer.addClass('active');

			if (cat == 'all' && lang == 'all' && _.isEmpty(search)) {
				self.fonts = self.items;
			} else {
				self.fonts = [];

				_.each(self.items, function (item) {
					var catFlt = langFlt = searchFlt = true;

					if (cat == 'all') {
						catFlt = true;
					} else if(item.category == cat){
						catFlt = true;
					} else {
						catFlt = false;
					}

					if (lang == 'all') {
						langFlt = true;
					} else if(item.subsets.indexOf(lang) !== -1){
						langFlt = true;
					} else {
						langFlt = false;
					}

					if (_.isEmpty(search)) {
						searchFlt = true;
					} else if(item.family.toLowerCase().indexOf(search.toLowerCase()) !== -1){
						searchFlt = true;
					} else {
						searchFlt = false;
					}

					if ( catFlt && langFlt && searchFlt ) {
						self.fonts.push(item);
					}
				});
			}


			self.renderFonts(0);

			self.renderPagination();
		},
		sorting: function () {
			var self = this;
			$('#wfm-filter').on('change', function () {
				var sortVal = $(this).val();

				if (sortVal != 'all') {
					$.get(self.apiUrl+'&sort='+sortVal);
				}
				
			});
		},
		runEnabledFont: function () {
			var self = this;

			_.each(wfm_data.fonts, function (font) {
				var data = {
					name: font.all.family,
					variants: font.all.variants,
					subsets: font.all.subsets,
					enabledVariants: font.enabled.variants,
					enabledSubsets: font.enabled.subsets,
				};

				self.initEnabledFont(data);
			});
		},
		initEnabledFont: function (data) {
			var self = this;

			var itemObj = $(self.enabledFontView(data));

			itemObj.data('wfm_font_name', data.name);

			itemObj.find('.wfm-ef-settings').on('click', function (e) {
				e.preventDefault();

				if (itemObj.find('.wfm-enabled-font-settings').hasClass('active')) {
					itemObj.find('.wfm-enabled-font-settings').removeClass('active');
				} else {
					itemObj.find('.wfm-enabled-font-settings').addClass('active');
				}
			});

			itemObj.find('.wfm-ef-remove').on('click', function (e) {
				e.preventDefault();

				var name = itemObj.data('wfm_font_name'),
					ajaxData = {
						action: 'wfm_remove_font',
						font: name
					};


				$.ajax({
					url: wfm_data.ajax_url,
					method: "POST",
					data: ajaxData
				}).done(function (html) {
					if (html == 1) {
						itemObj.remove();

						var count = parseInt($('.wfm-font-count').html());

						count -= 1;

						$('.wfm-font-count').html(count);

						$('.'+name.toLowerCase().replace(/ /g, '-')).find('.wfm-add-font').removeClass('wfm-added').find('.dashicons').removeClass('dashicons-yes').addClass('dashicons-plus');
					}
				});


			});

			self.efContainer.append(itemObj);
		},
		onClickYourFont: function () {
			var self = this;

			$('.wfm-your-fonts-wrap').on('click', function (e) {
				e.preventDefault();

				if ($('.wfm-ef-view-wrap').hasClass('active')) {
					$('.wfm-ef-view-wrap').removeClass('active');
				} else {
					$('.wfm-ef-view-wrap').addClass('active');
					$('.wfm-api-settings').removeClass('active');
				}
			});
		},
		onClickSettings: function () {
			var self = this;

			$('.wfm-settings-wrap').on('click', function (e) {
				e.preventDefault();

				if ($('.wfm-api-settings').hasClass('active')) {
					$('.wfm-api-settings').removeClass('active');
				} else {
					$('.wfm-api-settings').addClass('active');
					$('.wfm-ef-view-wrap').removeClass('active');
				}
			});
		},
		onClickUpdateBtn: function () {
			var self = this;

			$('.wfm-ef-view-wrap').on('click', '.wfm-ef-update', function (e) {

				e.preventDefault();

				var btn = $(this),
					item = btn.parents('.wfm-enabled-font-item'),
					fontName = item.data('wfm_font_name'),
					updating = item.find('.wfm-font-data-updating'),
					subsets = [],
					variants = [];

				if (btn.hasClass('disabled')) {
					return;
				}

				item.find('.wfm-ef-variant-checkbox:checked').each(function () {
					variants.push($(this).val());
				});

				item.find('.wfm-ef-subset-checkbox:checked').each(function () {
					subsets.push($(this).val());
				});

				var ajaxData = {
					action: 'wfm_change_font',
					font: fontName,
					variants: variants,
					subsets: subsets,
				};;

				btn.addClass('disabled');

				updating.addClass('active');

				$.ajax({
					url: wfm_data.ajax_url,
					method: "POST",
					data: ajaxData
				}).done(function (html) {
					if (html == 1) {
						btn.removeClass('disabled');

						updating.removeClass('active');
					}
				});
			});
		},
		onClickApiUpdate: function () {
			$('.wfm-save-api-settings').on('click', function (e) {
				e.preventDefault();

				var btn = $(this),
					api = $('#googleapi').val(),
					demo = $('#demotext').val();

				btn.addClass('disabled');

				$('.wfm-font-api-saving').addClass('active');

				var ajaxData = {
					action: 'wfm_update_api',
					api: api,
					demo: demo
				};

				$.ajax({
					url: wfm_data.ajax_url,
					method: "POST",
					data: ajaxData
				}).done(function (html) {
					location.reload(true);
				});
			});
		}
	};

	wfm_core.init();
})(jQuery, wp);