
const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
    header.addEventListener('click', () => {
        // Close all first
        headers.forEach(h => {
            h.classList.remove('active');
            h.nextElementSibling.style.display = 'none';
        });

        // Then open the clicked one
        header.classList.add('active');
        header.nextElementSibling.style.display = 'block';
    });
});
