var dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('is-active');
});
