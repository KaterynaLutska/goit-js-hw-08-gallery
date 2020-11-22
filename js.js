

import galleryList from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    activeImage: document.querySelector('.lightbox__image'),
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
            img.setAttribute('data-index', array[i].index);
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


refs.gallery.addEventListener('click', oppenModal);
refs.modalBtn.addEventListener('click', modalClose);
refs.overlay.addEventListener('click', onBeckDropCkick);

function onKeybordPress(event) {
    if (event.code === 'Escape') {
        modalClose ()
    }
    if (event.code === 'ArrowLeft') {
         switchToPrevImage ()   
    }
    if (event.code === 'ArrowRight') {
        switchToNextImage ()  
    }
}  

function oppenModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return
    }
    window.addEventListener('keydown', onKeybordPress);
    window.addEventListener('keydown', switchToNextImage)
    window.addEventListener('keydown', switchToPrevImage)
    
    refs.modal.classList.add('is-open');
    refs.activeImage.src = event.target.dataset.source;
    refs.activeImage.dataset.index = event.target.dataset.index   
}

function modalClose() {
    window.removeEventListener('keydown', onKeybordPress);

    refs.modal.classList.remove('is-open');
    refs.activeImage.src = '';  
}
    
function onBeckDropCkick(event) {
    if (event.target.nodeName === 'DIV') {
     modalClose ()
    }
}

function switchToNextImage () {
    let imageIndex = +refs.activeImage.dataset.index
    console.log(imageIndex);

    if (imageIndex === galleryList.length - 1) {
        refs.activeImage.src = galleryList[0].original;
        refs.activeImage.dataset.index = 0;
    }
    else {
        refs.activeImage.src = galleryList[imageIndex + 1].original
        console.log(refs.activeImage.src);
        refs.activeImage.dataset.index = imageIndex + 1
    }
}
function switchToPrevImage() {
    let imageIndex = +refs.activeImage.dataset.index
    console.log(imageIndex);
     if (imageIndex === 0) {
         refs.activeImage.src = galleryList[galleryList.length - 1].original;
         refs.activeImage.dataset.index = galleryList.length - 1;
    }
    else {
        refs.activeImage.src = galleryList[imageIndex - 1].original
        refs.activeImage.dataset.index = imageIndex - 1
    }
}
    
