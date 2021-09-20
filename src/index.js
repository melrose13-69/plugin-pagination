// import `.scss` files
import './scss/styles.scss';
// import UserList class
// import { Pagination as defaultExport } from './lib/pagination';
// export default Pagination class
// I used `defaultExport` to state that variable name doesn't matter

import { Pagination } from './lib/pagination';

const ul1 = document.querySelector( '#ul1' );
const pagination1 = new Pagination( ul1, {
    pageSize: 15,
    elements: 897
} );


setTimeout(function (  ) {
    pagination1.rebuild({
        pageSize: 3
    })
}, 5000);

// export default defaultExport;
