class Helpers {
    static mathRoundUp( s ) {return Math.round( s ) < s ? Math.round( s + .49 ) : Math.round( s );}
}

class Pagination extends Helpers {
    constructor( s, t = {} ) {
        super(), this.parent = s, this.settings = {
            activeColor: 'red',
            activeClass: 'selected-page',
            pagesShow: 5,
            elements: null,
            pageSize: null,
            pageHandle: this.changePage, ...t,
            classes: {
                mainParent: 'pagination-plugin',
                centerParent: 'pagination-plugin__wrapper',
                page: 'pagination-plugin__wrapper-btn',
                selectedSiblings: 'selected-siblings-pages',
                lastPage: 'pagination-lastPage',
                firstPage: 'pagination-firstPage', ...t.classes
            }
        }, this.init();
    }

    _createOptions( s = {} ) {
        this.settings = {
            ...this.settings, ...s,
            classes: { ...this.settings.classes, ...s.classes }
        },
        this.elements = +this.settings.elements, this.pageSize = +this.settings.pageSize, this.pageHandle = this.settings.pageHandle, this.activeColor = this.settings.activeColor, this.activeClass = this.settings.activeClass, this.cl = this.settings.classes, this.pagesShow = +this.settings.pagesShow % 2 == 0 ? +this.settings.pagesShow + 1 : +this.settings.pagesShow, this.siblingsPagesCounter = Math.floor( this.pagesShow / 2 ), this.lastStartBtn = 2 !== this.siblingsPagesCounter ? Math.floor( this.siblingsPagesCounter / 2 ) : 0, this.pages = Helpers.mathRoundUp( this.elements / this.pageSize );
    }

    _renderPagination( s = 1 ) {
        s = +s;
        const t = this._errorCheck( s );
        if ( !1 === t ) return;
        if ( !0 !== t ) throw t;
        this.parent.innerHTML = '', this.parent.classList.add( this.cl.mainParent );
        const e = document.createElement( 'ul' );
        e.classList.add( this.cl.centerParent ), this.parent.append( e );
        const i = ( t = 1 ) => {
            const a = document.createElement( 'li' ), n = 1 === t, r = t === this.pages;
            let h = !1;
            a.classList.add( this.cl.page ), a.innerText = t.toString(), a.setAttribute( 'data-page', t.toString() ), a.addEventListener( 'click', (s => {this.pageHandle( t, s, a );}), { once: !0 } ), n && ((s < this.pagesShow - this.lastStartBtn || this.pages <= this.pagesShow + 2) && a.classList.add( this.cl.selectedSiblings ), a.classList.add( this.cl.firstPage ), this.parent.prepend( a )), r && ((s > this.pages - this.siblingsPagesCounter - 2 || this.pages <= this.pagesShow + 2) && a.classList.add( this.cl.selectedSiblings ), a.classList.add( this.cl.lastPage ), this.parent.append( a )), n || r || (s < this.pagesShow - this.lastStartBtn ? t <= this.pagesShow + 1 && (h = !0) : s >= this.pages - this.siblingsPagesCounter ? t >= this.pages - this.pagesShow && (h = !0) : (t <= s && s - t <= this.siblingsPagesCounter && (h = !0), t >= s && s - t >= -this.siblingsPagesCounter && (h = !0))), h && e.appendChild( a ), t === s && (a.classList.add( this.activeClass ), a.style.color = this.activeColor), t !== this.pages && i( t + 1 );
        };
        return i;
    }

    destroy() {this.parent.innerHTML = '', this.parent.removeAttribute( 'class' );}

    init() {this._createOptions(), this._renderPagination()();}

    _errorCheck( s ) {
        switch ( !0 ) {
            case!this.parent || !this.parent.nodeType || 1 !== this.parent.nodeType:
            case!this.pageSize:
                return new Error( `${ this.parent } is not Node Element` );
            case!this.elements && 0 !== this.elements:
                return new Error( 'pageSize is required' );
            case 0 === this.elements:
                return this.destroy(), !1;
            case s > this.pages:
                return new Error( `Page ${ s } is more than the total number of pages` );
            default:
                return !0;
        }
    }

    changePage( s ) {s = void 0 === s ? 1 : s, this._renderPagination( s )();}

    rebuild( s ) {this._createOptions( s ), this._renderPagination()();}
}