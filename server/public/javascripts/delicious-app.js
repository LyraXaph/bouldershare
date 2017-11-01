import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';
import typeAheadGyms from './modules/typeAheadGyms';
import ajaxHeart from './modules/heart';
import makeMap from './modules/map'

// $ = document.querySelector
autocomplete($('#address'), $('#lat'), $('#lng'));

typeAhead( $('.search'));
typeAheadGyms( $('.searchGyms2'));

const heartForms = $$('form.heart');
heartForms.on('submit', ajaxHeart);

makeMap( $('#map') );