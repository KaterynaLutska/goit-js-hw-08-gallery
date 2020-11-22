import galleryList from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    activeImage: document.querySelector('.lightbox__image'),
    modal: document.querySelector('.lightbox'),
    modalBtn: document.querySelector('.lightbox__button'),
    overlay: document.querySelector('.lightbox__overlay'),
    buttonRight: document.querySelector('.right'),
    buttonLeft: document.querySelector('.left')
}

const items = ((element) => {
    const img = document.createElement('img');
    img.setAttribute('src', element.preview);
    img.setAttribute('data-source', element.original);
    img.setAttribute('data-index', element.index);
    img.setAttribute('alt', element.description);
    img.classList.add('gallery__image')

    const ref = document.createElement('a');
    ref.classList.add('gallery__link');
    ref.setAttribute('href', element.original);
    ref.appendChild(img);  

    const item = document.createElement('li');
    item.classList.add('gallery__item');
    item.appendChild(ref);
    return item
})

const imageItems = galleryList.map((element) => items(element))

refs.gallery.append(...imageItems)


refs.gallery.addEventListener('click', oppenModal);
refs.modalBtn.addEventListener('click', modalClose);
refs.overlay.addEventListener('click', onBeckDropCkick);
refs.buttonLeft.addEventListener('click', switchToNextImage)
refs.buttonRight.addEventListener('click', switchToPrevImage)

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
    window.addEventListener('keydown', switchToNextImage);
    window.addEventListener('keydown', switchToPrevImage);

    refs.modal.classList.add('is-open');
    refs.activeImage.src = event.target.dataset.source;
    refs.activeImage.dataset.index = event.target.dataset.index;   
}

function modalClose() {
    window.removeEventListener('keydown', onKeybordPress);
    window.removeEventListener('keydown', switchToNextImage);
    window.removeEventListener('keydown', switchToPrevImage);


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
   
    if (imageIndex === galleryList.length - 1) {
        refs.activeImage.src = galleryList[0].original;
        refs.activeImage.dataset.index = 0;
    }
    else {
        refs.activeImage.src = galleryList[imageIndex + 1].original
        refs.activeImage.dataset.index = imageIndex + 1
    }
}

function switchToPrevImage() {
    let imageIndex = +refs.activeImage.dataset.index
  
     if (imageIndex === 0) {
         refs.activeImage.src = galleryList[galleryList.length - 1].original;
         refs.activeImage.dataset.index = galleryList.length - 1;
    }
    else {
        refs.activeImage.src = galleryList[imageIndex - 1].original
        refs.activeImage.dataset.index = imageIndex - 1
    }
}





