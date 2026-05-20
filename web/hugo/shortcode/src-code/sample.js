document.addEventListener('DOMContentLoaded', function() {
    const tag = document.querySelector('.tag');
    tag.addEventListener('click', function() {
        if (tag.classList.contains('blue')) {
            tag.classList.remove('blue');
            tag.classList.add('red');
        } else {
            tag.classList.remove('red');
            tag.classList.add('blue');
        }
    });
});
