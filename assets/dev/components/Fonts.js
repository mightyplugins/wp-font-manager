import React, { Component } from 'react';
import database from './database';
import equal from 'deep-equal';

import FontItem from './FontItem';

class Fonts extends Component {
    constructor(props){
         super(props);

         this.state = {
             fonts: []
         };
    }

    componentWillMount() {
        this.setCurrentPageFonts()
    }

    componentDidUpdate(prevProps){
        if(!equal(this.props.fonts, prevProps.fonts) || !equal(this.props.currentPage, prevProps.currentPage) || database.fonts.updated){
            this.setCurrentPageFonts()

            database.fonts.updated = false
        }
    }

    setCurrentPageFonts(){
        const {currentPage, perPage, fonts, enabledFontFamilies} = this.props;
        let from = (currentPage - 1) * perPage,
            to = (currentPage * perPage) - 1,
            allfonts = [];

        for(var i = from; i <= to; i++){
            if(fonts[i]){
                if (enabledFontFamilies.indexOf(fonts[i].family) !== -1) {
                    fonts[i].enabled = true;
                } else {
                    fonts[i].enabled = false;
                }
                allfonts.push(fonts[i]);
            }
        }

        this.setState({
            fonts: allfonts
        });
    }

    render(){
        let containerClass = 'wfm-fonts-view-wrap';

        if(this.props.isLoading){
            containerClass = 'wfm-fonts-view-wrap active';
        }

        
        return(
            <div className={containerClass}>
                <div className="wfm-fonts-view">
                    {
                        this.state.fonts.map((font, index) => {
                            
                            return(
                                <FontItem demoText={this.props.demoText} font={font} key={index} />
                            )
                        })
                    }
                </div>
                {
                    this.state.isLoading &&
                    <div className="wfm-fonts-view-overlayer"><div className="typing_loader"></div></div>
                }
                
            </div>
        )
    }
}

export default Fonts;