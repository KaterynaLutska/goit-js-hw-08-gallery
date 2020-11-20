import galleryList from './gallery-items.js'; 

const gallery = document.querySelector('.js-gallery');
const modalImages = document.querySelector('.lightbox__image')
const modal = document.querySelector('.lightbox')
const modalBtn = document.querySelector('.lightbox__button')


function createImageItem(array) {
    const items = [];
        for (let i = 0; i < array.length; i++) {
            
            const img = document.createElement('img');
            img.classList.add('gallery__image');
            img.setAttribute('src', array[i].preview);
            img.setAttribute('data-source', array[i].original);
            img.setAttribute('alt', array[i].description);
            
            const ref = document.createElement('a');
            ref.classList.add('gallery__link');
            //ref.setAttribute('href', array[i].original);
            ref.appendChild(img);

            const item = document.createElement('li');
            item.classList.add('gallery__item');
            item.appendChild(ref);
            
            items.push(item);
        }   
return items
}

const imageItems = createImageItem(galleryList);
gallery.append(...imageItems)

const images = document.querySelectorAll('.gallery__image'); // ось цю переміну не можу підняти вгору, все ламаєтьсяж 

gallery.addEventListener('click', onClick)

function onClick(event) {
    if (event.target.nodeName !== 'IMG') {
        return
      }
    const aktive = event.target;
    const url = aktive.dataset.source;
    return  url
}


for (const image of images) {
    image.addEventListener('click', () => {
        modal.classList.add('is-open')
          modalImages.src = image.dataset.source   
    })
    modalBtn.addEventListener('click', () => {
        modal.classList.remove('is-open')
        modalImages.src = '';
    })
}







