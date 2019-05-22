const nav = document.querySelector('nav') // element that contains the filter links
const article = document.querySelector('article'); // container for the articles this holds the [data-filterby] attribute
const articles = Array.from(article.querySelectorAll('.article')); // a cached array of all the articles

// listen for any click inside the container
// Listening to the container prevents from adding event listeners to each element
// which is not very performant
nav.addEventListener('click', e => {
    // check if the element is a <li>
    if (e.srcElement.dataset.filter) {
        const el = e.srcElement;
        // set the [data-filterby] attr
        article.setAttribute('data-filterby', el.dataset.filter);
    }
})


function renderArticles(oldFilter, newFilter) {
    // iterate over all articles and hide/show them based on the filter changes
    // NOTE: this could be optimized to only update the elements that are changing...
    articles.forEach((el) => {
        if (newFilter === 'all') {
            el.hidden = false;
            return
        }
        if (el.dataset.cat === newFilter) {
            el.hidden = false;
        } else {
            el.hidden = true
        }
    })
}


const articleObserver = new MutationObserver(function (mutations) {
    // iterating over all mutations our Mutation Observer catches on the element we are listening on
    mutations.forEach((mutation) => {
        const newValue = mutation.target.dataset.filterby
        const oldValue = mutation.oldValue
        // we only call render if the values have changed
        if (newValue !== oldValue) {
            renderArticles(oldValue, newValue);
        }
    })
});


// configuring and listening to our observer
// we only want to listen for attribute changes (performance will degrade depending on the types of mutations listened for)
// we also want the old value to compare
articleObserver.observe(article, {
    attributes: true,
    attributeOldValue: true,
    characterData: false,
    childList: false
});
