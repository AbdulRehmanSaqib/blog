const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            const filteredResults = data.filter(item => {
                return item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query);
            });
            displayResults(filteredResults);
        });
});

function displayResults(results) {
    searchResults.innerHTML = '';
    if (results.length > 0) {
        searchResults.style.display = 'block';
        results.forEach(result => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = result.title;
            link.href = result.url;
            listItem.appendChild(link);
            searchResults.appendChild(listItem);
        });
    } else {
        searchResults.style.display = 'none';
    }
}
