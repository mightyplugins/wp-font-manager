import React, { Component } from 'react';
import NotificationItem from './NotificationItem'
import database from './database'

class Notification extends Component {
    constructor(props){
        super(props);

         this.setValues =  this.setValues.bind(this)

        this.state = {
            notifications: database.notify.notify,
        }
    }
    componentDidMount(){
        database.notify.on('change', this.setValues)
    }

    componentWillUnmount(){
        database.notify.removeListener('change', this.setValues)
    }

    setValues(){
        this.setState({
            notifications: database.notify.notify,
        })
    }
    render(){
        return(
            <div className="wfm-notification">
                {
                    this.state.notifications.map((notification, index) => {
                        return (
                            <NotificationItem key={index} type={notification.type} message={notification.message} />
                        )
                    })
                }
            </div>
        )
    }
}


export default Notification;