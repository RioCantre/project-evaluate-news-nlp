
import { handleSubmit } from './js/formHandler'
import { checkForURL } from './js/urlChecker'


import './styles/resets.scss'
import './styles/base.scss';
import './styles/footer.scss';
import './styles/form.scss';
import './styles/header.scss';

import search from './assets/search.png';
const searching = document.querySelector('#search-url');
searching.src = search;


export {
    handleSubmit,
    checkForURL,
    search
}
