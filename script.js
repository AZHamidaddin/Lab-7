document.getElementById('xhr-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        fetchImagesXHR(searchTerm);
    }
});

document.getElementById('fetch-promise-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        fetchImagesPromise(searchTerm);
    }
});

document.getElementById('fetch-async-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        fetchImagesAsync(searchTerm);
    }
});

const accessKey = 'szJCc8mWL-Jf4iMPV3S8iNd0wJPsPfEtMI8Xyht5Lkg';

// Method 1: Using XHR
function fetchImagesXHR(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            displayImages(data.results);
        }
    };
    xhr.send();
}

// Method 2: Using Fetch with Promises
function fetchImagesPromise(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayImages(data.results))
        .catch(error => console.error('Error fetching images:', error));
}

// Method 3: Using Fetch with Async/Await
async function fetchImagesAsync(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    const imageGallery = document.getElementById('image-gallery');
    imageGallery.innerHTML = '';  // Clear previous results
    images.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.classList.add('image-item');
        imgElement.innerHTML = `<img src="${image.urls.small}" alt="${image.alt_description}">`;
        imageGallery.appendChild(imgElement);
    });
}
