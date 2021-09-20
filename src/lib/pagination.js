class Helpers {
    static mathRoundUp( number ) {
        return Math.round( number ) < number ? Math.round( number + 0.49 ) : Math.round( number );
    }
}

export class Pagination extends Helpers {
    constructor( parent, settings = {} ) {
        super();
        this.parent = parent;
        this.settings = {
            activeColor: 'red',
            activeClass: 'selected-page',
            pagesShow: 5,
            elements: null,
            pageSize: null,
            pageHandle: this.changePage,
            ...settings,
            classes: {
                mainParent: 'pagination-plugin',
                centerParent: 'pagination-plugin__wrapper',
                page: 'pagination-plugin__wrapper-btn',
                selectedSiblings: 'selected-siblings-pages',
                lastPage: 'pagination-lastPage',
                firstPage: 'pagination-firstPage',
                ...settings.classes
            }
        };
        this.init();
    }

    _createOptions( options = {} ) {
        this.settings = {
            ...this.settings,
            ...options,
            classes: {
                ...this.settings.classes,
                ...options.classes
            }
        };
        this.elements = +this.settings.elements;
        this.pageSize = +this.settings.pageSize;
        this.pageHandle = this.settings.pageHandle;
        this.activeColor = this.settings.activeColor;
        this.activeClass = this.settings.activeClass;
        this.cl = this.settings.classes;
        this.pagesShow =
            +this.settings.pagesShow % 2 === 0
                ? +this.settings.pagesShow + 1
                : +this.settings.pagesShow;
        this.siblingsPagesCounter = Math.floor( this.pagesShow / 2 );
        this.lastStartBtn =
            this.siblingsPagesCounter !== 2
                ? Math.floor( this.siblingsPagesCounter / 2 )
                : 0;
        this.pages = Helpers.mathRoundUp( this.elements / this.pageSize );
    }


    _renderPagination( activePage = 1 ) {
        activePage = +activePage;
        const errorCheck = this._errorCheck( activePage );

        if ( errorCheck === false ) return;
        if ( errorCheck !== true ) throw errorCheck;

        this.parent.innerHTML = '';
        this.parent.classList.add( this.cl.mainParent );
        const pagesParent = document.createElement( 'ul' );
        pagesParent.classList.add( this.cl.centerParent );

        this.parent.append( pagesParent );

        const makePagination = ( counter = 1 ) => {
            const page = document.createElement( 'li' );
            const isFirstPage = counter === 1;
            const isLastPage = counter === this.pages;
            let appendStatus = false;
            page.classList.add( this.cl.page );
            page.innerText = counter.toString();
            page.setAttribute( 'data-page', counter.toString() );

            page.addEventListener( 'click', ( e ) => {
                this.pageHandle( counter, this.page, e );
            }, { once: true } );

            if ( isFirstPage ) {
                if ( activePage < this.pagesShow - this.lastStartBtn || this.pages <= this.pagesShow + 2 ) {
                    page.classList.add( this.cl.selectedSiblings );
                }
                page.classList.add( this.cl.firstPage );
                this.parent.prepend( page );
            }
            if ( isLastPage ) {
                if ( activePage > this.pages - this.siblingsPagesCounter - 2 || this.pages <= this.pagesShow + 2 ) {
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
                } else if ( activePage >= this.pages - this.siblingsPagesCounter ) {
                    if ( counter >= this.pages - this.pagesShow ) {
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

            if ( counter !== this.pages ) {
                makePagination( counter + 1 );
            }
        };

        return makePagination;
    }

    destroy() {
        this.parent.innerHTML = '';
        this.parent.removeAttribute( 'class' );
    }

    init(options = {}) {
        this._createOptions(options);
        this._renderPagination()();
    }

    _errorCheck( page ) {
        switch ( true ) {
            case(!this.parent || !this.parent.nodeType || this.parent.nodeType !== 1):
                return new Error( `${ this.parent } is not Node Element` );
            case(!this.pageSize):
                return new Error( `${ this.parent } is not Node Element` );
            case(!this.elements && this.elements !== 0):
                return new Error( 'pageSize is required' );
            case(this.elements === 0):
                this.destroy();
                return false;
            case(page > this.pages):
                return new Error( `Page ${ page } is more than the total number of pages` );
            default:
                return true;
        }
    }

    changePage( page ) {
        page = page === undefined ? 1 : page;
        this._renderPagination( page )();
    }

    rebuild( options ) {
        this.init(options)
    }
}
