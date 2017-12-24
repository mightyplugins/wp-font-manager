/*global wfm_data*/
import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Fonts from './Fonts';
import Settings from './Settings';
import MyFonts from './MyFonts';
import Pagination from './Pagination';
import Notification from './Notification';
import database from './database'

class FontManager extends Component {
    constructor(props){
        super(props);

         this.setValues =  this.setValues.bind(this)

        this.state = {
            fonts: database.fonts.fonts,
            allfonts: database.fonts.allfonts,
            loader: database.fonts.loader,
            demoText: database.fonts.demoText,
            currentPage: database.fonts.currentPage,
            enabledFonts: database.fonts.enabledFonts,
            enabledFontsAll: database.fonts.enabledFontsAll,
            enabledFontFamilies: database.fonts.enabledFontFamilies,
            showPanel: database.panel.show,
            apiKey: database.fonts.apiKey,
        }
    }
    
    componentDidMount(){
        database.panel.on('change', this.setValues)
        database.fonts.on('change', this.setValues)
    }

    componentWillUnmount(){
        database.panel.removeListener('change', this.setValues)
        database.fonts.removeListener('change', this.setValues)
    }

    setValues(){
        this.setState({
            fonts: database.fonts.fonts,
            allfonts: database.fonts.allfonts,
            loader: database.fonts.loader,
            demoText: database.fonts.demoText,
            currentPage: database.fonts.currentPage,
            enabledFonts: database.fonts.enabledFonts,
            enabledFontFamilies: database.fonts.enabledFontFamilies,
            apiKey: database.fonts.apiKey,
            showPanel: database.panel.show
        })
    }

    render(){
        return(
            <div className="wfm-area">
                <Toolbar enabledFonts={this.state.enabledFonts} apiKey={this.state.apiKey} />
                {
                    this.state.showPanel == 'settings' &&
                    <Settings apiKey={this.state.apiKey} />
                }
                {
                    this.state.showPanel == 'myfonts' &&
                    <MyFonts enabledFontsAll={ this.state.enabledFontsAll} />
                }
                {
                    this.state.fonts.length != 0 &&
                    <div className="wfm-api-setting-field wfm-demo-text-section">
                        <label htmlFor="demotext">{ wfm_data.demo_text }</label>
                        <input type="text" name="demotext" id="demotext" cols="100" rows="3" defaultValue={database.fonts.demoText} onChange={e => {
                            database.fonts.handleActions({
                                type: 'CHANGE_DEMO_TEXT',
                                text: e.target.value
                            })
                            }} />
                    </div>
                }
                {
                     this.state.apiKey == '' &&
                    <div className="wfm-no-apikey">{wfm_data.no_api}</div>
                }
                <Fonts fonts={this.state.fonts} isLoading={this.state.loader} demoText={this.state.demoText} perPage="20" currentPage={this.state.currentPage} enabledFontFamilies={this.state.enabledFontFamilies}/>
                {
                    this.state.fonts.length != 0 &&
                    <Pagination fontsToRender={this.state.fonts.length} currentPage={this.state.currentPage} />
                }
                
                <Notification />
            </div>
        )
    }
}

export default FontManager;