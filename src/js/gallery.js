import imgService from './services/apiService'
import galleryItemTemplate from '../templates/img-template.hbs'
import { error } from '@pnotify/core';
const basicLightbox = require('basiclightbox')


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('#gallery'),
    loadMoreBtn: document.querySelector('#loadMore')
};

refs.searchForm.addEventListener('submit', searchFormHandler )
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler)


function searchFormHandler (e){
    e.preventDefault()
    //clear gallery before a new search
    clearListItems()
    // set page = 1 before searching a new page
    imgService.resetPage()
    //listen to the form event and take a value of input
    const inputValue = e.currentTarget.elements.query.value
    // set the search query to the object to fetch
    imgService.searchQuery = inputValue
    //get array of objects and put each of them to the handlebars template
    imgService.fetchImages().then(images => buildListItems(images))
}

function loadMoreBtnHandler (e){
    imgService.fetchImages().then(images => buildListItems(images))
}

function buildListItems(data){
    const markup = galleryItemTemplate(data)
    refs.gallery.insertAdjacentHTML('beforeend', markup)
}

function clearListItems (){
    // clear gallery HTML
    refs.gallery.innerHTML = ''
}


