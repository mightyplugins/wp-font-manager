/*global wfm_data*/
import React, { Component } from 'react';
import $ from 'jquery';
import equal from 'deep-equal';
import database from './database'

class FontItem extends Component {

    constructor(props){
        super(props);

        this.changeStyles = this.changeStyles.bind(this);

        this.state = {
            fontWeight: 400,
            fontStyle: '',
            adding: false,
            loading: true,
            css: ''
        };
    }

    componentWillReceiveProps(){
        console.log('hi')
    }


    componentDidMount() {
        this.$styles = $(this.styles);
        this.$styles.selectize({
            onChange: (value) => {
                this.changeStyles(value)
            }
        });

        const {font:{family, variants, subsets}, demoText} = this.props;
        $.get(this.buildLink(family, variants), (data) => {
            this.setState({
                css: data,
                loading: false
            })
        })

    }

    componentWillUpdate(nextProps){
        if(!equal(this.props, nextProps)){
            this.setState({
                loading: true
            })
            this.$styles.data('selectize').destroy()
        }
    }

    componentDidUpdate(prevProps){
        if(!equal(this.props, prevProps)){
            const {font:{family, variants, subsets}, demoText} = this.props;
            $.get(this.buildLink(family, variants), (data) => {
                this.setState({
                    css: data,
                    loading: false
                })
            })
            this.$styles.selectize({
                onChange: (value) => {
                    this.changeStyles(value)
                }
            });
        }
    }

    componentWillUnmount() {
        this.$styles.data('selectize').destroy()
        
    }

    changeStyles(newval){
        let value = newval.split('_');
        this.setState({
            fontWeight: value[0],
            fontStyle: value[1]
        })
    }

    buildLink(name, variants) {
        var link = '//fonts.googleapis.com/css?family=';

        link += name.replace(/ /g, '+')+':'+variants.join(',');

        return link;
    }

    processVariants (variants) {
        return variants.map(variant => {
            let label = '',
                value = '';
             if(variant == 'regular'){
                 label = 'Regular 400';
                 value = '400';
             } else if(variant == 'italic'){
                 label = 'Regular 400 Italic';
                 value = '400_italic';
             } else {
                if(variant.replace(/\d+/g, '') == ''){
                    variant = parseInt(variant);

                    if (variant == 100) {
                        label = 'Thin '+variant;
                    } else if (variant == 200) {
                        label = 'Extra-Light '+variant;
                    } else if (variant == 300) {
                        label = 'Light '+variant;
                    } else if (variant == 400) {
                        label = 'Regular '+variant;
                    } else if (variant == 500) {
                        label = 'Medium '+variant;
                    } else if (variant == 600) {
                        label = 'Semi-Bold '+variant;
                    } else if (variant == 700) {
                        label = 'Bold '+variant;
                    } else if (variant == 800) {
                        label = 'Extra-Bold '+variant;
                    } else if (variant == 900) {
                        label = 'Black '+variant;
                    }
                    value = variant;
                } else {
                    if (variant.replace(/[a-zA-Z]+/g, '') != '') {

                        if (variant.replace(/[a-zA-Z]+/g, '') == 100) {
                            label = 'Thin '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        } else if (variant.replace(/[a-zA-Z]+/g, '') == 200) {
                            label = 'Extra-Light '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        } else if (variant.replace(/[a-zA-Z]+/g, '') == 300) {
                            label = 'Light '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        } else if (variant.replace(/[a-zA-Z]+/g, '') == 400) {
                            label = 'Regular '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        } else if (variant.replace(/[a-zA-Z]+/g, '') == 500) {
                            label = 'Medium '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        } else if (variant.replace(/[a-zA-Z]+/g, '') == 600) {
                            label = 'Semi-Bold '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        } else if (variant.replace(/[a-zA-Z]+/g, '') == 700) {
                            label = 'Bold '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        } else if (variant.replace(/[a-zA-Z]+/g, '') == 800) {
                            label = 'Extra-Bold '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        } else if (variant.replace(/[a-zA-Z]+/g, '') == 900) {
                            label = 'Black '+variant.replace(/[a-zA-Z]+/g, '')+' Italic';
                        }

                        value = variant.replace(/[a-zA-Z]+/g, '')+'_'+variant.replace(/\d+/g, '');

                    }
                }
             }
            return {
                label: label,
                value: value
            }
        })
    }


    render(){
        const {font:{family, variants, subsets}, demoText} = this.props;

        const demoStyle = {
            fontFamily: family,
            fontWeight: this.state.fontWeight,
            fontStyle: this.state.fontStyle
        };

        return(
            <div className="wfm-font-item">
                <div className="wfm-font-item-inner">
                    {
                        this.state.loading &&
                        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                    }
                    <div className="wfm-font-name-wrap">
                        <h3 className="wfm-font-name">{family} <span>({wfm_data.styles.replace('COUNT_TOTAL', variants.length)})</span></h3>
                        <div className="wfm-font-styles wp-clearfix">
                            <span>Style:</span>
                            <select ref={el => this.styles = el} value="400" readOnly>
                                {
                                    this.processVariants(variants).map((variant, index) => {
                                        return(
                                            <option value={variant.value} key={index}>{variant.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {
                            this.props.font.enabled ?
                            <a href="#" className="wfm-add-font wfm-added" onClick={e => {
                                e.preventDefault()
                                }}><span className="dashicons dashicons-yes"></span></a>
                            :
                            <a href="#" className="wfm-add-font" onClick={e => {
                                e.preventDefault()
                                let fontToAdd = {
                                    family: family,
                                    subsets: subsets,
                                    variants: variants
                                };

                                $.ajax({
                                    url: wfm_data.ajax_url,
                                    method: "POST",
                                    data: {
                                        nonce: wfm_data.nonce,
                                        action: 'wfm_add_font',
                                        font: fontToAdd
                                    }
                                }).done(html => {
                                    if (html == 1) {

                                        database.fonts.addNewFont({
                                            all: fontToAdd,
                                            enabled: {
                                                subsets: ["latin"],
                                                variants: variants
                                            }
                                        });
                                        database.fonts.fontAdded();

                                        database.notify.add({
                                            message:  wfm_data.font_added.replace('FONT_NAME', family),
                                            type: 'success'
                                        })
                                    } else {
                                        database.notify.add({
                                            message:  wfm_data.adding_error.replace('FONT_NAME', family),
                                            type: 'error'
                                        })
                                    }
                                }).fail(() => {
                                    database.notify.add({
                                        message:  wfm_data.adding_error.replace('FONT_NAME', family),
                                        type: 'error'
                                    })
                                })
                                }}><span className="dashicons dashicons-plus"></span></a>
                        }
                    </div>
                    <div className="wfm-font-demo" style={demoStyle} onLoad={e => {
                     console.log('hi 2')
                     this.setState({
                         loading: false
                     })
                 }}>{demoText}</div>
                </div>
                <style>{this.state.css}</style>
            </div>
        )
    }
}

export default FontItem;