/*global wfm_data*/
import EventEmitter from 'events';

class Panel extends EventEmitter{
    constructor(){
        super();

        this.show = '';

        if(wfm_data.api == ''){
            this.show = 'settings';
        }
    }

    showSettings(){
        this.show = 'settings';

        this.emit('change');
    }
    showMyFonts(){
        this.show = 'myfonts';

        this.emit('change');
    }
    hideAll(){
        this.show = '';

        this.emit('change');
    }
}

export default new Panel;