import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead';

// $ = document.querySelector
autocomplete($('#address'), $('#lat'), $('#lng'));

typeAhead( $('.search'));