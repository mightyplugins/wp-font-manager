import React, { Component } from 'react';
import database from './database'

class Pagination extends Component {
    constructor(props){
        super(props);

        this.state = {
            length: database.fonts.fonts.length,
            currentPage: 1
        }
    }
    
    getTotalPage(){
        let pages = parseInt(this.props.fontsToRender / 20);
        let addOne = this.props.fontsToRender - (pages * 20);

        if(addOne){
            pages += 1;
        }

        return pages;
    }

    getCurrentBeforeAfter(){
        const {currentPage} = this.props;

        if(currentPage == 1){
            return [1,2,3]
        } else if(this.getTotalPage() == (currentPage + 1)) {
            return [currentPage - 1, currentPage]
        } else if(this.getTotalPage() == currentPage) {
            return [currentPage - 2, currentPage - 1]
        } else {
            return [currentPage - 1, currentPage, currentPage + 1]
        }
    }

    render(){
        const {currentPage} = this.props;

        const pages = this.getTotalPage();

        if(pages == 1){
            return null;
        }

        let lastActive = '';

        if(pages == currentPage){
            lastActive = 'active'
        }

        let firstActive = '';

        if(pages == 1){
            firstActive = 'active'
        }

        return(
            <div className="wfm-pagination wp-clearfix">
                <ul>
                    <li className="wfm-prev"><span onClick={e => {
                        e.preventDefault()
                        if(currentPage != 1){
                            database.fonts.handleActions({
                                type: 'SET_CURRENT_PAGE',
                                page: currentPage - 1
                            })
                        }
                        }}><i className="fa fa-angle-left" aria-hidden="true"></i></span></li>
                    {
                        currentPage > 2 &&
                        <li className={firstActive}><a href="#" onClick={e => {
                            e.preventDefault()
                            database.fonts.handleActions({
                                type: 'SET_CURRENT_PAGE',
                                page: 1
                            })
                            }}>1</a></li>
                    }
                    {
                        currentPage > 3 &&
                        <li className="wfm-dots wfm-first-dots"><span>...</span></li>
                    }
                    {
                        this.getCurrentBeforeAfter().map((page, index) => {
                            let classActive = '';
                            if(currentPage == page){
                                classActive = 'active';
                            }
                            return(
                                <li className={classActive} key={index}><a href="#" onClick={e => {
                                    e.preventDefault()
                                    database.fonts.handleActions({
                                        type: 'SET_CURRENT_PAGE',
                                        page: page
                                    })
                                    }}>{page}</a></li>
                            )
                        })
                    }
                    {
                        pages > 4 && currentPage != pages && currentPage != (pages - 1) && currentPage != (pages - 2) &&
                        <li className="wfm-dots wfm-last-dots"><span>...</span></li>
                    }
                    <li className={lastActive}><a href="#" onClick={e => {
                        e.preventDefault()
                        database.fonts.handleActions({
                            type: 'SET_CURRENT_PAGE',
                            page: pages
                        })
                        }}>{pages}</a></li>
                    <li className="wfm-next"><span onClick={e => {
                        e.preventDefault()
                        if(pages != currentPage){
                            database.fonts.handleActions({
                                type: 'SET_CURRENT_PAGE',
                                page: currentPage + 1
                            })
                        }
                        }}><i className="fa fa-angle-right" aria-hidden="true"></i></span></li>
                </ul>
            </div>
        )
    }
}


export default Pagination;