/*global wfm_data*/
import React, { Component } from 'react';
import $ from 'jquery';
import database from './database';

class Toolbar extends Component {
    constructor(props){
        super(props);

        this.searchFonts = this.searchFonts.bind(this);
        this.filterFonts = this.filterFonts.bind(this);
    }
    componentDidMount() {
        this.$filter = $(this.filter);
        this.$filter.selectize();
        this.$filter.on('change', this.filterFonts);

        this.$language = $(this.language);
        this.$language.selectize();
        this.$language.on('change', this.searchFonts);

        this.$category = $(this.category);
        this.$category.selectize();
        this.$category.on('change', this.searchFonts);

        
        this.getFonts();
    }

    componentWillUnmount() {
        this.$filter.data('selectize').destroy();
        this.$language.data('selectize').destroy();
        this.$category.data('selectize').destroy();

        this.$language.off('change', this.searchFonts);
        this.$category.off('change', this.searchFonts);
        this.$filter.off('change', this.filterFonts);
    }

    componentDidUpdate(prevProps){
        if(this.props.apiKey != prevProps.apiKey){
            this.getFonts();
        }
    }

    searchFonts(){
        database.fonts.handleActions({
            type: "SEARCH_FONTS",
            search: this.search.value,
            lang: this.language.value,
            cat: this.category.value
        });
    }

    filterFonts(){
        this.getFonts();
    }

    getFonts(){
        if(this.props.apiKey == ''){
            return;
        }
        let apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key='+this.props.apiKey;

        if(this.filter.value != 'all'){
            apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key='+this.props.apiKey+'&sort='+this.filter.value;
        }

        $.ajax({
            url: apiUrl,
            method: "GET"
        }).done(( fonts ) => {
            database.fonts.handleActions({
                type: "SET_FONTS",
                fonts: fonts.items,
                search: this.search.value,
                lang: this.language.value,
                cat: this.category.value
            });

            database.fonts.hideLoader();
        })
    }

    render(){
        return(
            <div className="wfm-topbar wp-clearfix">
                <ul className="wfm-fonts-filters wp-clearfix">
                    <li>
                        <select id="wfm-filter" ref={el => this.filter = el} defaultValue="popularity">
                            <option value="all">{wfm_data.filter.all}</option>
                            <option value="popularity">{wfm_data.filter.popularity}</option>
                            <option value="trending">{wfm_data.filter.trending}</option>
                            <option value="style">{wfm_data.filter.style}</option>
                            <option value="alpha">{wfm_data.filter.alpha}</option>
                        </select>
                    </li>
                    <li>
                        <select id="wfm-language" ref={el => this.language = el}>
                            <option value="all">{wfm_data.language.all}</option>
                            <option value="arabic">{wfm_data.language.arabic}</option>
                            <option value="bengali">{wfm_data.language.bengali}</option>
                            <option value="cyrillic">{wfm_data.language.cyrillic}</option>
                            <option value="cyrillic-ext">{wfm_data.language.cyrillic_ext}</option>
                            <option value="devanagari">{wfm_data.language.devanagari}</option>
                            <option value="greek">{wfm_data.language.greek}</option>
                            <option value="greek-ext">{wfm_data.language.greek_ext}</option>
                            <option value="gujarati">{wfm_data.language.gujarati}</option>
                            <option value="gurmukhi">{wfm_data.language.gurmukhi}</option>
                            <option value="hebrew">{wfm_data.language.hebrew}</option>
                            <option value="kannada">{wfm_data.language.kannada}</option>
                            <option value="khmer">{wfm_data.language.khmer}</option>
                            <option value="latin">{wfm_data.language.latin}</option>
                            <option value="latin-ext">{wfm_data.language.latin_ext}</option>
                            <option value="malayalam">{wfm_data.language.malayalam}</option>
                            <option value="myanmar">{wfm_data.language.myanmar}</option>
                            <option value="oriya">{wfm_data.language.oriya}</option>
                            <option value="sinhala">{wfm_data.language.sinhala}</option>
                            <option value="tamil">{wfm_data.language.tamil}</option>
                            <option value="telugu">{wfm_data.language.telugu}</option>
                            <option value="thai">{wfm_data.language.thai}</option>
                            <option value="vietnamese">{wfm_data.language.vietnamese}</option>
                        </select>
                    </li>
                    <li>
                        <select id="wfm-category" ref={el => this.category = el}>
                            <option value="all">{wfm_data.category.all}</option>
                            <option value="serif">{wfm_data.category.serif}</option>
                            <option value="sans-serif">{wfm_data.category.sans_serif}</option>
                            <option value="display">{wfm_data.category.display}</option>
                            <option value="handwriting">{wfm_data.category.handwriting}</option>
                            <option value="monospace">{wfm_data.category.monospace}</option>
                        </select>
                    </li>
                </ul>
                <ul className="wfm-menus wp-clearfix">
                    <li className="wfm-search-wrap">
                        <input type="text" id="wfm-search" className="wfm-search" placeholder="Search" ref={el => this.search = el} onChange={this.searchFonts} />
                    </li>
                    <li className="wfm-your-fonts-wrap" onClick={() => {
                        if(database.panel.show != 'myfonts'){
                            database.panel.showMyFonts()
                        } else if(database.panel.show == 'myfonts') {
                            database.panel.hideAll()
                        }
                        }}>
                        <strong dangerouslySetInnerHTML={ { __html: wfm_data.your_fonts.replace('YOUR_FONTS', '<span className="wfm-font-count">'+this.props.enabledFonts+'</span>') } } />
                    </li>
                    <li className="wfm-settings-wrap" onClick={() => {
                        if(database.panel.show != 'settings'){
                            database.panel.showSettings()
                        } else if(database.panel.show == 'settings') {
                            database.panel.hideAll()
                        }
                        }}><strong dangerouslySetInnerHTML={ { __html: wfm_data.settings.replace('ICON_HTML', '<i class="fa fa-cogs"></i>')} } /></li>
                </ul>
            </div>
        )
    }
}

export default Toolbar;