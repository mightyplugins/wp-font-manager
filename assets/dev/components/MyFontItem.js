/*global wfm_data*/
import React, { Component } from 'react';
import $ from 'jquery';
import database from './database';
import equal from 'deep-equal';

class MyFontItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            showSettings: false,
            updating: false,
            fontAllData: this.props.fontAllData,
            fontEnabledData: this.props.fontEnabledData,
        }
    }
    render(){
        const {family, index} = this.props;
        const {fontAllData, fontEnabledData} = this.state;
        let settingsClass = 'wfm-enabled-font-settings';
        if(this.state.showSettings){
            settingsClass += ' active';
        }
        return(
            <div className="wfm-enabled-font-item">
                <div className="wfm-enabled-font-item-inner">
                    <div className="wfm-enabled-font-data">
                        <h3 className="wfm-enabled-font-name">{family}</h3>
                        <div className="wfm-enabled-font-controls">
                            <a href="#" className="wfm-ef-remove" onClick={e => {
                                    e.preventDefault()
                                    if(!confirm(wfm_data.remov_confirm.replace('FONT_NAME', family))){
                                        return;
                                    }
                                    $.ajax({
                                        url: wfm_data.ajax_url,
                                        method: "POST",
                                        data: {
                                            nonce: wfm_data.nonce,
                                            action: 'wfm_remove_font',
                                            font: family
                                        }
                                    }).done(html => {
                                        if (html == 1) {
                                            database.fonts.removeFont(index)

                                            database.fonts.fontRemoved();

                                            database.notify.add({
                                                message: wfm_data.font_removed.replace('FONT_NAME', family),
                                                type: 'warning'
                                            })
                                        } else {
                                            database.notify.add({
                                                message: wfm_data.removing_error.replace('FONT_NAME', family),
                                                type: 'error'
                                            })
                                        }
                                    }).fail(() => {
                                        database.notify.add({
                                            message: wfm_data.removing_error.replace('FONT_NAME', family),
                                            type: 'error'
                                        })
                                    })
                                }}><i className="fa fa-trash"></i></a>
                            <a href="#" className="wfm-ef-settings" onClick={e => {
                                    e.preventDefault()
                                    this.setState({
                                        showSettings: !this.state.showSettings
                                    })
                                }}><i className="fa fa-cog"></i></a>
                        </div>
                    </div>
                    <div className={settingsClass}>
                        <form ref="form" onSubmit={(e) => {
                            e.preventDefault()

                            

                            var variants = [];
                            $('input[name="variant"]:checked', this.refs.form).each((i, variant) => {
                                
                                variants.push(variant.value)
                            })

                            var subsets = [];
                            $('input[name="subset"]:checked', this.refs.form).each((i, subset) => {
                                
                                subsets.push(subset.value)
                            })

                            if(equal(fontEnabledData.variants, variants) && equal(fontEnabledData.subsets, subsets)){
                                database.notify.add({
                                    message:  wfm_data.nothing_changed,
                                    type: 'warning'
                                })
                                return;
                            }

                            this.setState({
                                updating: true
                            })

                            $.ajax({
                                url: wfm_data.ajax_url,
                                method: "POST",
                                data: {
                                    nonce: wfm_data.nonce,
                                    action: 'wfm_change_font',
                                    font: family,
                                    variants: variants,
					                subsets: subsets,
                                }
                            }).done(r => {
                                if(r == 1){
                                    database.notify.add({
                                        message:  wfm_data.font_data_changed.replace('FONT_NAME', family),
                                        type: 'success'
                                    })

                                    this.setState({
                                        fontEnabledData: {
                                            variants: variants,
                                            subsets: subsets
                                        }
                                    })
                                } else {
                                    database.notify.add({
                                        message:  wfm_data.changing_error.replace('FONT_NAME', family),
                                        type: 'error'
                                    })
                                }
                                this.setState({
                                    updating: false
                                })
                            }).fail(() => {
                                database.notify.add({
                                    message:  wfm_data.changing_error.replace('FONT_NAME', family),
                                    type: 'error'
                                })
                            })
                            
                            }}>
                            <div className="wfm-row wp-clearfix">
                                <div className="wfm-enabled-font-variants">
                                    {
                                        fontAllData.variants.map((variant, index) => {
                                            let defaultChecked = false
                                            if(fontEnabledData.variants.indexOf(variant) !== -1){
                                                defaultChecked = true
                                            }
                                            return(
                                                <label key={index}><input type="checkbox" name="variant" className="wfm-ef-variant-checkbox" defaultChecked={defaultChecked} value={variant} /> {variant}</label>
                                            )
                                        })
                                    }
                                </div>
                                <div className="wfm-enabled-font-subsets">
                                    {
                                        fontAllData.subsets.map((subset, index) => {
                                            let defaultChecked = false
                                            if(fontEnabledData.subsets.indexOf(subset) !== -1){
                                                defaultChecked = true
                                            }
                                            return(
                                                <label key={index}><input type="checkbox" name="subset" className="wfm-ef-subset-checkbox" defaultChecked={defaultChecked} value={subset} /> {subset}</label>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                !this.state.updating &&
                                <button type="submit" className="wfm-ef-update" dangerouslySetInnerHTML={{__html: wfm_data.update.replace('ICON_HTML', '<i class="fa fa-floppy-o" aria-hidden="true"></i>')}} />
                            }
                        </form>
                        {
                            this.state.updating &&
                            <div className="wfm-font-data-updating" dangerouslySetInnerHTML={{__html: wfm_data.updating.replace('ICON_HTML', '<i class="fa fa-refresh fa-spin fa-fw"></i>')}} />
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}


export default MyFontItem;