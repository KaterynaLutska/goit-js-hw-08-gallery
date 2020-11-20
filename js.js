import galleryList from './gallery-items.js'; 
// console.log(galleryList);
const gallery = document.querySelector('.js-gallery');
const modalImages = document.querySelector('.lightbox__image')


function createImageItem(array) {
    const items = [];
        for (let i = 0; i < array.length; i++) {
            
            const img = document.createElement('img');
            img.classList.add('gallery__image')
            img.setAttribute('src', array[i].preview)
            img.setAttribute('data-source', array[i].original)
            img.setAttribute('alt', array[i].description)
            // console.dir(img);
            
            const ref = document.createElement('a');
            ref.classList.add('gallery__link')
            //ref.setAttribute('href', array[i].original)
            ref.appendChild(img)
            // console.log(ref);

            const item = document.createElement('li');
            item.classList.add('gallery__item')
            item.appendChild(ref)
            // console.log(item); 
            
            items.push(item)
        }   
return items
}


const imageItems = createImageItem(galleryList);
gallery.append(...imageItems)
console.log(gallery); // вся вкладеність з ul 


const images = document.querySelectorAll('.gallery__image');
console.dir(images);


gallery.addEventListener('click', onClick)

function onClick(event) {
    if (event.target.nodeName !== 'IMG') {
        return
      }
    const aktive = event.target;
    const url = aktive.dataset.source
    console.log(url);
    return  url
}

//Відкриття модального вікна при натисканні на елементі галереї.

const modal = document.querySelector('.lightbox')
const modalBtn = document.querySelector('.lightbox__button')

for (const image of images) {

    image.addEventListener('click', () => {
        console.log('click');
        modal.classList.add('is-open')
          modalImages.src = image.dataset.source   
    })

    modalBtn.addEventListener('click', () => {
        modal.classList.remove('is-open')
        modalImages.src = '';
    }) 
}

