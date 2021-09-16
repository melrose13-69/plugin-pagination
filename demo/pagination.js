class Helpers {
    static mathRoundUp( number ) {
        return Math.round( number ) < number ? Math.round( number + 0.4 ) : Math.round( number );
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

        this.parent = parent;
        this.pagesShow =
            +this.settings.pagesShow % 2 === 0
                ? +this.settings.pagesShow + 1
                : +this.settings.pagesShow;

        this.elements = +this.settings.elements;
        this.pageSize = +this.settings.pageSize;
        this.siblingsPagesCounter = Math.floor( this.pagesShow / 2 );
        this.lastStartBtn =
            this.siblingsPagesCounter !== 2
                ? Math.floor( this.siblingsPagesCounter / 2 )
                : 0;

        this.activeColor = this.settings.activeColor;
        this.activeClass = this.settings.activeClass;
        this.pageHandle = this.settings.pageHandle;
        this.changePage();
    }

    _getPages() {
        return Helpers.mathRoundUp( this.elements / this.pageSize );
    }

    _renderPagination( activePage ) {
        activePage = +activePage;
        const errorCheck = this._errorCheck();

        if ( errorCheck !== true ) throw errorCheck;

        this.parent.innerHTML = '';
        this.parent.classList.add( 'pagination-plugin' );
        this.pagesParent = document.createElement( 'ul' );
        this.pagesParent.classList.add( 'pagination-plugin__wrapper' );

        this.parent.append( this.pagesParent );

        const makePagination = ( counter = 1 ) => {
            const page = document.createElement( 'li' );
            const pages = this._getPages();
            const isFirstPage = counter === 1;
            const isLastPage = counter === pages;
            let appendStatus = false;

            page.classList.add( 'pagination-plugin__wrapper-btn' );
            page.innerText = counter.toString();
            page.setAttribute( 'data-page', counter.toString() );

            page.addEventListener( 'click', ( e ) => {
                this.pageHandle( counter, e, page );
            } );

            if ( isFirstPage ) {
                if ( activePage < this.pagesShow - this.lastStartBtn || pages === this.pagesShow + 2 ) {
                    page.classList.add( 'selected-siblings-pages' );
                }
                page.classList.add( 'pagination-firstPage' );
                this.parent.prepend( page );
            }
            if ( isLastPage ) {
                if ( activePage > pages - this.siblingsPagesCounter - 2 || pages === this.pagesShow + 2 ) {
                    page.classList.add( 'selected-siblings-pages' );
                }
                page.classList.add( 'pagination-lastPage' );
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
                this.pagesParent.appendChild( page );
            }
            if ( counter === activePage ) {
                page.classList.add( this.activeClass );
                page.style.color = this.activeColor;
            }

            if ( counter !== pages ) {
                makePagination( counter + 1 );
            }
        };
        makePagination();
    }

    _errorCheck() {
        if ( !this.parent || !this.parent.nodeType || this.parent.nodeType !== 1 ) {
            return new Error( `${this.parent} is not Node Element` );
        }
        if ( !this.pageSize ) {
            return new Error( 'pageSize is required' );
        }
        if ( !this.elements ) {
            return new Error( 'elements is required' );
        }
        return true;
    }

    changePage( page ) {
        page = page === undefined ? 1 : page;
        this._renderPagination( page );
    }
}