export class Pagination {
    constructor( parent, settings = {} ) {
        this.settings = {
            activeColor: 'red',
            activeClass: 'selected-page',
            pageSize: 10,
            pagesShow: 5,
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
        return Math.round( this.elements / this.pageSize );
    }

    _renderPagination( activePage ) {
        activePage = +activePage;

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
            let status = false;

            page.classList.add( 'pagination-plugin__wrapper-btn' );
            page.innerText = counter.toString();
            page.setAttribute( 'data-page', counter.toString() );

            page.addEventListener( 'click', ( e ) => {
                this.pageHandle( counter, e, page );
            } );

            if ( isFirstPage ) {
                if ( activePage < this.pagesShow - this.lastStartBtn ) {
                    page.classList.add( 'selected-siblings-pages' );
                }
                page.classList.add( 'pagination-firstPage' );
                this.parent.prepend( page );
            }
            if ( isLastPage ) {
                if ( activePage > pages - this.siblingsPagesCounter - 2 ) {
                    page.classList.add( 'selected-siblings-pages' );
                }
                page.classList.add( 'pagination-lastPage' );
                this.parent.append( page );
            }

            if ( !isFirstPage && !isLastPage ) {
                if ( activePage < this.pagesShow - this.lastStartBtn ) {
                    if ( counter <= this.pagesShow + 1 ) {
                        status = true;
                    }
                } else if ( activePage >= pages - this.siblingsPagesCounter ) {
                    if ( counter >= pages - this.pagesShow ) {
                        status = true;
                    }
                } else {
                    if (
                        counter <= activePage &&
                        activePage - counter <= this.siblingsPagesCounter
                    ) {
                        status = true;
                    }
                    if (
                        counter >= activePage &&
                        activePage - counter >= -this.siblingsPagesCounter
                    ) {
                        status = true;
                    }
                }
            }

            if ( status ) {
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

    changePage( page ) {
        page = page === undefined ? 1 : page;
        this._renderPagination( page );
    }
}
