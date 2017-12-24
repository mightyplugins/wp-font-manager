import React, { Component } from 'react';

class NotificationItem extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            removing: false,
            removed: false
        }
    }
    componentDidMount(){
        this._isMounted = true;

        setTimeout(() => {
            if(this._isMounted){
                this.setState({
                    removing: true
                })
            }
        }, 4795)
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render(){
        const {type, message} = this.props;

        let classNew = "wfm-notification-item wfm-notification-type-"+type;

        let styleNotify = {
            animation: "fadeInRight 0.3s"
        };

        if(this.state.removing){
            styleNotify.animation = "fadeOutLeft 0.3s";
        }

        if(this.state.removed){
            classNew = classNew + " removed";
        }

        return(
            <div className={classNew} style={styleNotify} onClick={() => {
                    this.setState({
                        removing: true
                    })
                    setTimeout(() => {
                        this.setState({
                            removed: true
                        })
                    }, 295)
                }}>
                <div className="wfm-notification-message" dangerouslySetInnerHTML={ { __html: message} } />
            </div>
        )
    }
}


export default NotificationItem;