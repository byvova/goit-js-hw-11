import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = "41828858-bc9e123a5e007e4f9a3f52776";
const form = document.querySelector('.container');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader')

const options = {
    captionsData: 'alt',
    captionDelay: 250,
};

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const searchQuery = encodeURIComponent(input.value.trim());
        
        if (!searchQuery) {
            iziToast.error({
                title: 'Invalid Input',
                message: 'Please enter a search term.',
            });
            return;
        }
        loader.style.display = 'block';

        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch images. Please try again later.');
        }

        const json = await response.json();
        const hits = json.hits;

        loader.style.display = 'none';

        gallery.innerHTML = '';

        if (hits.length === 0) {
            iziToast.error({
                title: 'No Results',
                message: 'No images found. Please try a different search term.',
            });
            return;
        }
        gallery.innerHTML = hits.reduce((html, hit) => html + `
            <li class="gallery-item">
                <a class="gallery-link" href="${hit.webformatURL}">
                    <img class="gallery-image" src="${hit.previewURL}" alt="${hit.tags}" />
                </a>
                <div class="content">
                    <h4 class="titles">Likes</h4>
                    <h4 class="titles">Views</h4>
                    <h4 class="titles">Comments</h4>
                    <h4 class="titles">Downloads</h4>
                    <p class="text">${hit.likes}</p>
                    <p class="text">${hit.views}</p>
                    <p class="text">${hit.comments}</p>
                    <p class="text">${hit.downloads}</p>
                </div>
            </li>`, "");

        const lightbox = new SimpleLightbox('.gallery a', options);
    } catch (error) {
        console.error('Error fetching data:', error);

        if (error instanceof TypeError) {
            iziToast.error({
                title: 'Network Error',
                message: 'Please check your internet connection and try again.',
            });
        } else {
            iziToast.error({
                title: 'Error',
                message: error.message,
            });
        }
    }
});





// це ще один спосіб але він трошки не дороблений

// const API_KEY = "41828858-bc9e123a5e007e4f9a3f52776" 

// const form = document.querySelector('.container')
// const button = document.querySelector('button')
// const input = document.querySelector('input')
// const gallery = document.querySelector('.gallery')

// const options = {
//     captionsData: 'alt', 
//     captionDelay: 250,  
// };

// form.addEventListener('submit', event => {
//     event.preventDefault();

//     const url = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(input.value);
//     console.log(url);
//     fetch(url, { method: "GET" })
//         .then((res) => res.json())
//         .then((json) => json.hits) // Return the hits array directly
//         .then((hits) => {
//             console.log(hits);

//             gallery.innerHTML = hits.reduce((html, hit) => html + `
//                 <li class="gallery-item">
//                     <a class="gallery-link" href="${hit.webformatURL}">
//                         <img class="gallery-image" src="${hit.previewURL}" alt="${hit.tags}" /></a>
//                     <div class="content">
//                         <h4 class="titles">Likes</h4>
//                         <h4 class="titles">Views</h4>
//                         <h4 class="titles">Comments</h4>
//                         <h4 class="titles">Downloads</h4>
//                         <p class="text">${hit.likes}</p>
//                         <p class="text">${hit.views}</p>
//                         <p class="text">${hit.comments}</p>
//                         <p class="text">${hit.downloads}</p>
//                     </div>
//                 </li>`, "");
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// });

// const lightbox = new SimpleLightbox('.gallery a', options);