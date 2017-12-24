/*global wfm_data*/
import React, { Component } from 'react';
import MyFontItem from './MyFontItem'

class MyFonts extends Component {
    render(){
        return(
            <div className="wfm-ef-view-wrap">
                <div className="wfm-ef-view-inner wp-clearfix">
                    {
                        this.props.enabledFontsAll.length ?
                        this.props.enabledFontsAll.map((enabledFont, index) => {
                            return(
                                <MyFontItem fontAllData={enabledFont.all} fontEnabledData={enabledFont.enabled} family={enabledFont.all.family} index={index} key={index} />
                            )
                        })
                        :
                        <div className="wfm-no-font-saved">{wfm_data.no_saved_font}</div>
                    }
                </div>
            </div>
        )
    }
}


export default MyFonts;