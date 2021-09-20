class Helpers {
    static mathRoundUp( number ) {
        return Math.round( number ) < number ? Math.round( number + 0.49 ) : Math.round( number );
    }
}

class Pagination extends Helpers {
    constructor( parent, settings = {} ) {
        super();
        this.settings = {
            activeColor: 'red',
            activeClass: 'selected-page',
            pagesShow: 5,
            elements: null,
            pageSize: null,
            pageHandle: this.changePage,
            ...settings
        };
        this.cl = {
            mainParent: 'pagination-plugin',
            centerParent: 'pagination-plugin__wrapper',
            page: 'pagination-plugin__wrapper-btn',
            selectedSiblings: 'selected-siblings-pages',
            lastPage: 'pagination-lastPage',
            firstPage: 'pagination-firstPage'
        };
        this.parent = parent;
        this.pagesShow =
            +this.defaultSettings.pagesShow % 2 === 0
                ? +this.defaultSettings.pagesShow + 1
                : +this.defaultSettings.pagesShow;

        this.elements = +this.defaultSettings.elements;
        this.pageSize = +this.defaultSettings.pageSize;
        this.siblingsPagesCounter = Math.floor( this.pagesShow / 2 );
        this.lastStartBtn =
            this.siblingsPagesCounter !== 2
                ? Math.floor( this.siblingsPagesCounter / 2 )
                : 0;

        this.activeColor = this.defaultSettings.activeColor;
        this.activeClass = this.defaultSettings.activeClass;
        this.pageHandle = this.defaultSettings.pageHandle;
        this.changePage();
    }

    _getPages() {
        return Helpers.mathRoundUp( this.elements / this.pageSize );
    }

    _renderPagination( activePage ) {
        activePage = +activePage;
        const errorCheck = this._errorCheck();

        if ( errorCheck === false ) return;
        if ( errorCheck !== true ) throw errorCheck;

        this.parent.innerHTML = '';
        this.parent.classList.add( this.cl.mainParent );
        const pagesParent = document.createElement( 'ul' );
        pagesParent.classList.add( this.cl.centerParent );

        this.parent.append( pagesParent );

        const makePagination = ( counter = 1 ) => {
            const page = document.createElement( 'li' );
            const pages = this._getPages();
            const isFirstPage = counter === 1;
            const isLastPage = counter === pages;
            let appendStatus = false;
            console.log( pages );
            page.classList.add( this.cl.page );
            page.innerText = counter.toString();
            page.setAttribute( 'data-page', counter.toString() );

            page.addEventListener( 'click', ( e ) => {
                this.pageHandle( counter, e, page );
            }, { once: true } );

            if ( isFirstPage ) {
                if ( activePage < this.pagesShow - this.lastStartBtn || pages <= this.pagesShow + 2 ) {
                    page.classList.add( this.cl.selectedSiblings );
                }
                page.classList.add( this.cl.firstPage );
                this.parent.prepend( page );
            }
            if ( isLastPage ) {
                if ( activePage > pages - this.siblingsPagesCounter - 2 || pages <= this.pagesShow + 2 ) {
                    page.classList.add( this.cl.selectedSiblings );
                }
                page.classList.add( this.cl.lastPage );
                this.parent.append( page );
            }

            if ( !isFirstPage && !isLastPage ) {
                if ( activePage < this.pagesShow - this.lastStartBtn ) {
                    if ( counter <= this.pagesShow + 1 ) {
                        appendStatus = true;
                    }
                } else if ( activePage >= pages - this.siblingsPagesCounter ) {
                    if ( counter >= pages - this.pagesShow ) {
                        appendStatus = true;
                    }
                } else {
                    if (
                        counter <= activePage &&
                        activePage - counter <= this.siblingsPagesCounter
                    ) {
                        appendStatus = true;
                    }
                    if (
                        counter >= activePage &&
                        activePage - counter >= -this.siblingsPagesCounter
                    ) {
                        appendStatus = true;
                    }
                }
            }

            if ( appendStatus ) {
                pagesParent.appendChild( page );
            }
            if ( counter === activePage ) {
                page.classList.add( this.activeClass );
                page.style.color = this.activeColor;
            }

            if ( counter !== pages ) {
                makePagination( counter + 1 );
            }
        };
        return makePagination;
    }

    destroy() {
        this.parent.innerHTML = '';
        this.parent.removeAttribute( 'class' );
    }

    _errorCheck() {
        if ( !this.parent || !this.parent.nodeType || this.parent.nodeType !== 1 ) {
            return new Error( `${this.parent} is not Node Element` );
        }
        if ( !this.pageSize ) {
            return new Error( 'pageSize is required' );
        }
        if ( !this.elements && this.elements !== 0 ) {
            return new Error( 'elements is required' );
        }

        if ( this.elements === 0 ) {
            this.destroy();
            return false;
        }
        return true;
    }

    changePage( page ) {
        page = page === undefined ? 1 : page;
        this._renderPagination( page )();
    }
}
