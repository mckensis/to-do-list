import Header from './Header.js';
import Sidebar from './Sidebar.js';
import Section from './Section.js';

//Will be imported and called from index.js
//Creates templates for all necessary DOM elements
function CreateDOM() {
    const page = document.querySelector('.mainPage');
    page.appendChild(Header());
    page.appendChild(Sidebar());
    page.appendChild(Section());
}

export default CreateDOM;