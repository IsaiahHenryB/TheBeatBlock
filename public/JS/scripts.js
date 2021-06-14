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

// Form file validation
fileValidation = () => {
    var fileInput = 
        document.getElementById('mp3song');
      
    var filePath = fileInput.value;
  
    // Allowing file type
    var allowedExtensions = 
            /(\.mp3)$/i;
      
    if (!allowedExtensions.exec(filePath)) {
        alert('Sorry, This Site Only Supports Mp3 Files.');
        fileInput.value = '';
        return false;
    }
};
// adding a Url generator for search bar

urlCreate = () =>{
    let action_src = "/songs/" + document.getElementsByName("genre")[0].value;
    let your_form = document.getElementById('genre');
    your_form.action = action_src ;
}