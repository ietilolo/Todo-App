const addForm = document.querySelector('.add');
const search = document.querySelector('.search input');
const list = document.querySelector('.todos');

const generateTemplate = (todo, uid) => {

    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center" uid=${uid}>
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    list.innerHTML += html;
};

const filterTodods = function(term) {

    Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));

};

addForm.addEventListener('submit', e => {

    e.preventDefault();
    const todo = addForm.add.value.trim();
    if ( todo.length ) {

        // Local storage
        let time = Date.now();
        let uid = todo + time;
        uid = uid.replace(/\s/g, '-space-');

        window.localStorage.setItem( uid, todo );

        generateTemplate(todo, uid);
        addForm.reset();

    }

});

list.addEventListener('click', e => {

    if ( e.target.classList.contains('delete') ) {

        // Remove from localStorage
        let todoUid = e.target.parentElement.getAttribute('uid');
        console.log(e.target.parentElement);
        window.localStorage.removeItem(todoUid);
        e.target.parentElement.remove();

    }

});

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodods(term);
});

// Retrieve lists from localStorage
(function startUp(){

    if ( typeof(Storage) !== "undefined" ) {

        // Loop through local todos
        for ( let i = 0; i < window.localStorage.length; i++ ) {
    
            let todoKey = window.localStorage.key(i);
            let todo = window.localStorage.getItem(todoKey);
            let uid = todoKey;
            generateTemplate(todo, uid);
    
        }
    
    }

})();