/*global wfm_data*/
import React, { Component } from 'react';
import $ from 'jquery'
import database from './database';

class Settings extends Component {
    constructor(props){
        super(props);

        this.state = {
            updating: false
        }
    }
    render(){
        return(
            <div className="wfm-api-settings">
                <div className="wfm-api-settings-inner wp-clearfix">
                    <div className="wfm-api-setting-field">
                        <label htmlFor="googleapi">{wfm_data.api_label}</label>
                        <input type="text" ref="googleapi" defaultValue={this.props.apiKey} />
                        <p dangerouslySetInnerHTML={ { __html: wfm_data.api_desc} } />
                    </div>
                    <button
                        className="wfm-save-api-settings"
                        type="button"
                        onClick={() => {
                            this.setState({
                                updating: true
                            })
                            $.ajax({
                                url: wfm_data.ajax_url,
                                method: "POST",
                                data: {
                                    nonce: wfm_data.nonce,
                                    action: 'wfm_update_api',
                                    api: this.refs.googleapi.value
                                }
                            }).done(html => {
                                if (html == 1) {
                                    database.fonts.setApi(this.refs.googleapi.value)

                                    database.notify.add({
                                        message: wfm_data.api_updated,
                                        type: 'success'
                                    })
                                } else {
                                    database.notify.add({
                                        message: wfm_data.api_updat_fail,
                                        type: 'error'
                                    })
                                }

                                this.setState({
                                    updating: false
                                })

                                database.panel.hideAll();
                            }).fail(() => {
                                database.notify.add({
                                    message: wfm_data.api_updat_fail,
                                    type: 'error'
                                })

                                this.setState({
                                    updating: false
                                })
                            })
                        }}
                        dangerouslySetInnerHTML={{__html: wfm_data.save_settings.replace('ICON_HTML', '<i class="fa fa-floppy-o" aria-hidden="true"></i>')}}
                        />
                    {
                        this.state.updating &&
                        <div className="wfm-font-api-saving" dangerouslySetInnerHTML={{__html: wfm_data.saving.replace('ICON_HTML', '<i class="fa fa-refresh fa-spin fa-fw"></i>')}} />
                    }
                    
                </div>
            </div>
        )
    }
}


export default Settings;