import './style.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';
import createDOM from './createDOM.js';

//import data from './data.json';

window.addEventListener("load", buildMainPage());

function buildMainPage() {
    createDOM();
}