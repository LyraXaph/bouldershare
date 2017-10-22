import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import typeAheadProblem from './modules/typeAheadProblem';
import ajaxHeart from './modules/heart';
import makeMap from './modules/map'

// $ = document.querySelector
autocomplete($('#address'), $('#lat'), $('#lng'));

typeAhead( $('.search'));
typeAheadProblem( $('.search__gyms'));

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);

makeMap( $('#map') );