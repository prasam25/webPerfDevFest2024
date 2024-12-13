document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.gallery-container img');
  images.forEach((img) => {
    img.addEventListener('click', () => {
      alert(`You clicked on: ${img.alt}`);
    });
  });
});
