import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e){
    e.preventDefault();
    console.log('Heart it!!');
    axios
        .post(this.action)
        .then(res => {
            const isHearted = this.heart.classList.toggle('heart__button--hearted'); //button
            $ ('.heart-count').textContent = res.data.hearts.length;
            if(isHearted){
                this.heart.classList.add('heart__button--float');
                setTimeout(() => this.heart.classList.remove('heart__bubbon--float'), 2500);
            }
        })
        .catch(console.error);
}

export default ajaxHeart;