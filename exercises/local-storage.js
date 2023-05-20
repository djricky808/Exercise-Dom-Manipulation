/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...
const container = document.querySelector('.cardsContainer');

function redCard(elm) {
  for(elm of container.children) {
    if(localStorage.getItem('favs') && localStorage.getItem('favs').split(',').includes(elm.id)) {
      elm.style.backgroundColor = 'red';
      elm.dataset.fav = 'true';
    }  
  }
}

redCard ();

const addId = (id) => {
  let curStorage = localStorage.getItem('favs');
  let favorites = curStorage ? curStorage += `,${id}` : `${id}`;
  localStorage.setItem('favs', favorites);
}

const deleteId = (id) => {
  const idToDelete = id;
  const favoritesArr = localStorage.getItem('favs').split(',');
  favoritesArr.splice(favoritesArr.indexOf(idToDelete), 1).join(',');
  localStorage.setItem('favs', favoritesArr);
}

const updateCard = (e) => {
  const item = e.target;
  if (Array.from(item.classList).includes('card')){
    const colorArr = ['red', 'white'];
    const dataArr = ['true', 'false'];
    const params = item.dataset.fav === 'false'
    ? [colorArr, dataArr, addId(item.id)]
    : [colorArr.reverse(), dataArr.reverse(), deleteId(item.id)];
    item.style.backgroundColor = params[0][0];
    item.dataset.fav = params[1][0];
    params[2];
  }
}
container.addEventListener('click', updateCard);
