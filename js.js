import galleryList from './gallery-items.js'; 

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modalImages: document.querySelector('.lightbox__image'),
    modal: document.querySelector('.lightbox'),
    modalBtn: document.querySelector('.lightbox__button'),
    overlay: document.querySelector('.lightbox__overlay'), 
}

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
            ref.setAttribute('href', array[i].original);
            ref.appendChild(img);

            const item = document.createElement('li');
            item.classList.add('gallery__item');
            item.appendChild(ref);
            
            items.push(item);
        }   
    return items
}

const imageItems = createImageItem(galleryList);
refs.gallery.append(...imageItems);

refs.gallery.addEventListener('click', onOppenModal);
refs.modalBtn.addEventListener('click', onModalClose);
refs.overlay.addEventListener('click', onBeckDropCkick);



function onOppenModal(event) {
    window.addEventListener('keydown', onPressEscape);
    
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return
    }
    refs.modal.classList.add('is-open');
    refs.modalImages.src = event.target.dataset.source;  
} 

function onModalClose() {
    window.removeEventListener('keydown', onPressEscape);
    refs.modal.classList.remove('is-open');
    refs.modalImages.src = '';  
}
    
function onBeckDropCkick(event) {
    if (event.target.nodeName === 'DIV') {
     onModalClose ()
    }
}

function onPressEscape(event) {
    if (event.code === 'Escape') {
        onModalClose ()
    }
}  

// 

// Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво" і "вправо".