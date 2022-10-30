//Creates the header section of the page
function Header() {
    //console.log("building header...")

    const title = document.createElement('h1');
    const header = document.createElement('header');

    title.textContent = "Do the thing!";
    
    header.appendChild(title);
    
    return header;
}

export default Header;