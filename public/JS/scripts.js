// code to Show the navbar
const navButton = document.querySelector('.burger')
// Targets the very first UL element
const navUl = document.querySelector('.navLinks')
// Create the function
showMe = () => {
    navUl.classList.toggle('display-flex')
}
// create event listener
navButton.addEventListener('click', showMe)