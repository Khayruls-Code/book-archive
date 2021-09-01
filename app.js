//global variabls
const error = document.getElementById('error');
const booksContainer = document.getElementById('books');

//search function implementation
const getBooks = async () => {
    const inputField = document.getElementById('inputField');
    const inputValue = inputField.value;
    if(!inputField.value){
        error.innerText = 'Please search By books name';
        booksContainer.innerHTML = '';
        return;
    }
    //getting data by fetch
    const url = `https://openlibrary.org/search.json?q=${inputValue}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data))
        .finally(() => {
            inputField.value = '';
        })
}

document.getElementById('searchBtn').addEventListener('click', getBooks);

//showing data on website
const displayBook = (data) => {
    const books = data.docs;
    error.innerText = `${books.length} matching results`;
    if(books.length === 0){
        error.innerText = 'No matching result found';
        booksContainer.innerHTML = '';
    }
    let html = '';
    books.slice(0, 30).forEach(book => {
        html += `
            <div class="book">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i || '8194481'}-M.jpg" alt="cover image">
                <h2>${book.title}</h2>
                <h3>${book.author_name?.[0] || ''}</h3>
                <p>Published in ${book?.first_publish_year || ''}</p>
                <p>Published by ${book.publisher?.[0] || ''}</p>
            </div>
        `
        booksContainer.innerHTML = html;
    });
}
