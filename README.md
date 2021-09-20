# Pagination-js-plugin
VanillaJS Pagination Plugin with custom handler

[GitHub Repository](https://github.com/melrose13-69/plugin-pagination)


# Install
```js
npm install poltoratchi-pagination-js-plugin
```

> or use `pagination.js` file from `dist` folder. `Pagination` will be available on `window`.

# Use
```html
<ul id="pagination"></ul>
```

```js
import Pagination from 'poltoratchi-pagination-js-plugin';


const paginationWrapper = document.querySelector('#pagination');
const pagination = new Pagination(paginationWrapper, { options });
```
# Options
> `activeColor: string ( hex / rgb )` Color of active page button  `optional | default: 'red'`.

> `activeClass: string (className without ".")` Class of active page button `optional | default: 'selected-page'`.

> `elements: number` Total elements data, from server `required`.

> `pageSize: number` Page size `required`.

> `pagesShow: number` Number of central pages `optional | default: 5`.

> `pageHandle: function` Custom function for click the page buttons -

> `optional | default: `
```js
    function handlePage(pageNumber, event, target) {
        pagination.changePage(pageNumber)
    }
```

# Methods
> `pagination.changePage(pageNumber)` Change the page `pageNumber: string|number`

> `pagination.destroy()` Destroy the pagination and remove elements;

> `pagination.init()` Initialize the pagination (you can make this before destroy);

> `pagination.rebuild(options)` Rebuild pagination with new options ( default | {} );

# CSS classes
You can override style using these classes

- .pagination-plugin
- .pagination-plugin__wrapper
- .pagination-plugin__wrapper-btn
- .pagination-lastPage
- .pagination-firstPage
- .selected-siblings-pages

# Outcome

This is my first plugin, I will gradually add new methods and functionality.

I would be grateful for your help and corrections in my code.

Good luck, happy hacking!!!
