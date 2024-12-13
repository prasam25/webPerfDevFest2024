document.addEventListener('DOMContentLoaded', () => {
    // Change Main Image on Thumbnail Click
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const mainImage = document.querySelector('.main-image');

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const largeImageSrc = thumbnail.getAttribute('data-large');
        mainImage.setAttribute('src', largeImageSrc);
      });
    });

    // Toggle Visibility of Sections (e.g., Most Viewed, Recommended Products)
    const sectionHeaders = document.querySelectorAll('section h2');

    sectionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const section = header.parentElement;
        const content = section.querySelector('.gallery-container') || section.querySelector('p');
        if (content) {
          content.classList.toggle('hidden');
        }
      });
    });


  const slowButton = document.getElementById('slowButton');
   const output = document.getElementById('output');

    // Simulate slow interaction
    slowButton.addEventListener('click', () => {
      const start = Date.now();
      // Simulate blocking task
      let dummy = 0;
      let progress = 0;
      for (let i = 0; i < 1e9; i++) {
          // Perform some computational work to make the task heavier
      dummy += Math.sqrt(i);

      }
      const end = Date.now();
      output.textContent = `Task completed in ${end - start}ms (Simulated Slow Interaction).`;
    });

    // Use scheduler.yield() to fix the slow interaction
    async function fixedTask() {
      const start = Date.now();
      let progress = 0;
      for (let i = 0; i < 1e8; i++) {
        progress++;
        // Yield control back to the browser periodically
        if (progress % 1e6 === 0) {
          await scheduler.yield();
        }
      }
      const end = Date.now();
      output.textContent = `Task completed in ${end - start}ms (Fixed with scheduler.yield).`;
    }

  });


  //code to check support
  if ("scheduler" in window && "yield" in scheduler) {
    console.log("We can use scheduler.yield!");
  } else {
    console.log("Oops, scheduler.yield isn't available.");
  }



