import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const captionDelayTime = 250;
const captionsDataSource = 'alt';

const galleryEl = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: captionDelayTime,
  captionsData: captionsDataSource,
});

function createGalleryMarkup(gallery) {
  return gallery.map(item => createItemMarkup(item)).join('');
}

function createItemMarkup({ preview, original, description }) {
  return `
    <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
  `;
}
