

const ul = document.querySelector("#ul");

const workerPagination = new Pagination(ul, {
    activeColor: "blue",
    elements: 200,
    pageHandle: (pageNumber, event, target) => {
        workerPagination.changePage(pageNumber);
        // console.log(pageNumber, event, target);
    }
});


