import EventEmitter from 'events';

class Notify extends EventEmitter{
    constructor(){
        super();

        this.notify = [];
    }

    add(notify){
        this.notify.push(notify);

        setTimeout(() => {
            this.remove()
        }, 5000)

        this.emit('change');
    }
    remove(){
        this.notify.shift();

        this.emit('change');
    }
}

export default new Notify;