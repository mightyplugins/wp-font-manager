/*global wfm_data*/
import EventEmitter from 'events';

class Fonts extends EventEmitter{
    constructor(){
        super();

        this.fonts = [];
        this.allfonts = [];
        this.loader = true;
        this.demoText = 'The quick brown fox jumps over the lazy dog. 1234567890';
        this.currentPage = 1;
        this.enabledFonts = wfm_data.font_families.length;
        this.enabledFontFamilies = wfm_data.font_families;
        
        this.updated = false;
        this.apiKey = wfm_data.api;

        if(wfm_data.fonts.length === undefined){
            this.enabledFontsAll =  Object.keys(wfm_data.fonts).map(function (key) { return wfm_data.fonts[key]; });
        } else {
            this.enabledFontsAll = wfm_data.fonts;
        }
    }

    setApi(apiKey){
        this.apiKey = apiKey;

        this.emit("change");
    }
    
    fontAdded(){
        this.enabledFonts += 1;

        this.emit("change");
    }


    fontRemoved(){
        this.enabledFonts -= 1;

        this.emit("change");
    }

    addNewFont(font){
        this.enabledFontsAll.push(font);
        this.addEnabledFontFamilies(font.all.family)

        this.updated = true;

        this.emit("change");
    }

    removeFont(index){
        this.removeEnabledFontFamilies(index);

        this.enabledFontsAll.splice(index, 1);

        this.updated = true;

        this.emit("change");
    }

    removeEnabledFontFamilies(index){
        this.enabledFontFamilies.splice(this.enabledFontFamilies.indexOf(this.enabledFontsAll[index].all.family), 1);

        this.emit("change");
    }

    addEnabledFontFamilies(family){
        this.enabledFontFamilies.push(family);

        this.emit("change");
    }

    setFonts(fonts){
        this.fonts = fonts;
        this.allfonts = fonts;
    }

    showLoader(){
        this.loader = true;

        this.emit("change");
    }

    hideLoader(){
        this.loader = false;

        this.emit("change");
    }
    
    applyFilter(search = '', lang = 'all', cat = 'all'){
        this.fonts = [];

        this.allfonts.forEach(font => {
            let catFlt = true,
                langFlt = true,
                searchFlt = true;

            if( search == '' ){
                searchFlt = true;
            } else if( font.family.toLowerCase().indexOf(search.toLowerCase()) !== -1 ){
                searchFlt = true;
            } else {
                searchFlt = false;
            }

            if (lang == 'all') {
                langFlt = true;
            } else if(font.subsets.indexOf(lang) !== -1){
                langFlt = true;
            } else {
                langFlt = false;
            }

            if (cat == 'all') {
                catFlt = true;
            } else if(font.category == cat){
                catFlt = true;
            } else {
                catFlt = false;
            }

            if(catFlt && langFlt && searchFlt ){
                this.fonts.push(font);
            }
        });

        this.emit("change");
    }

    setDemoText(text){
        this.demoText = text;
        
        this.emit("change");
    }

    setCurrentPage(page, fire= true){
        this.currentPage = page;
        
        if(fire){
            this.emit("change");
        }
        
    }

    handleActions(action){
        switch(action.type) {
            case "SET_FONTS": 
                this.setFonts(action.fonts);
                this.applyFilter(action.search, action.lang, action.cat);
                break;
            
            case "SEARCH_FONTS":
                this.setCurrentPage(1, false);
                this.applyFilter(action.search, action.lang, action.cat);
                break;
            case "CHANGE_DEMO_TEXT":
                this.setDemoText(action.text)
                break;
            case "SET_CURRENT_PAGE":
                this.setCurrentPage(action.page);
                break;
        }
    }

}

const fonts = new Fonts;

export default fonts;