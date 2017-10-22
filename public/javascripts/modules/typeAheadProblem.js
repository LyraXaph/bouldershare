import axios from 'axios';
import dompurify from 'dompurify'

function searchResultsHTML(gyms) {
    return gyms.map(gym => {
        return `<div class="search__result">${gym.name}</div>`;
    }).join('');
}

function typeAhead(search) {
    if (!search) return;

    const searchInput = search.querySelector('input[name="gyms__search"]');
    const searchResults = search.querySelector('.gyms__search__results');
    // on = add event listener
    searchInput.on('input', function () {
        if (!this.value) {
            searchResults.style.display = 'none';
            return;
        }
        searchResults.style.display = 'block';
        axios
            .get(`/api/search?q=${this.value}`)
            .then(res => {
                if (res.data.length) {
                    const html = searchResultsHTML(res.data);
                    searchResults.innerHTML = dompurify.sanitize(html);
                    return;
                }
                searchResults.innerHTML = dompurify.sanitize(`<div class="gym__search__result">No results for ${this.value} found!</div>`);
            })
            .catch(err => {
                console.error(err);
            });
    });

    // handle keyboard up down and enter on results
    searchInput.on('keyup', (e) => {
        if(![38, 40, 13].includes(e.keyCode)){
            return;
        }
        const activeClass = 'search__result--active';
        const current = search.querySelector(`.${activeClass}`);
        const items = search.querySelectorAll('.search__result');
        let next;
        if(e.keyCode === 40 && current){
            next = current.nextElementSibling || items[0];
        } else if (e.keyCode === 40){
            next = items[0];
        } else if (e.keyCode === 38 && current) {
            next = current.previousElementSibling || items[items.length-1];
        } else if (e.keyCode === 38) {
            next = items[items.length-1];
        } else if (e.keyCode === 13){
            searchInput.value = current.innerHTML;
            searchResults.style.display = 'none';
            console.log()
            searchResults.nextSibling.focus();
            return;
        }
        if(current){
            current.classList.remove(activeClass);
        }
        next.classList.add(activeClass);
    }); 

    // if someone hits enter on the address field don't submit the form
    searchInput.on('keydown', (e) => {
        if(e.keyCode === 13) e.preventDefault();
    });

}

export default typeAhead;