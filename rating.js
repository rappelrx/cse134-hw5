class RatingWidget extends HTMLElement {
    constructor() {
      super();
  
      const shadowRoot = this.attachShadow({ mode: 'open' });
  
      const css = document.createElement('style');
      css.innerHTML = `
        .star {
          color: var(--star-color, gray);
          font-size: 200%;
          cursor: pointer;
        }
        .selected {
          color: var(--selected-star-color, gold);
        }
      `;
      shadowRoot.appendChild(css);
  
      const headerElement = document.createElement('h1');
      headerElement.textContent = 'Rating Widget';
      shadowRoot.appendChild(headerElement);
  
      const maxStars = Math.max(3, this.getAttribute('max') || 5);
  
      const starContainer = document.createElement('div');
      starContainer.classList.add('star-container');
  
      let ratingInput = 0; // Variable to store the selected rating
  
      for (let starId = 0; starId < maxStars; starId++) {
        const starElement = document.createElement('span');
        starElement.classList.add('star');
        starElement.innerHTML = '&#9733';
  
        starElement.addEventListener('mouseover', () => {
          highlightStars(starId);
        });
  
        starElement.addEventListener('mouseout', () => {
          highlightStars(ratingInput - 1); // Highlight up to the selected rating
        });
  
        starElement.addEventListener('click', () => {
          ratingInput = starId + 1;
          submitRating(ratingInput);
        });
  
        starContainer.appendChild(starElement);
      }
  
      shadowRoot.appendChild(starContainer);
  
      const feedbackElement = document.createElement('p');
      shadowRoot.appendChild(feedbackElement);
  
      function highlightStars(hoveredStarId) {
        const stars = starContainer.querySelectorAll('span');
  
        stars.forEach((star, index) => {
          star.classList.toggle('selected', index <= hoveredStarId);
        });
      }
  
      function submitRating(ratingInput) {
        const feedbackMessage =
          ratingInput / maxStars >= 0.8
            ? `Thanks for ${ratingInput} star rating!`
            : `Thanks for your feedback of ${ratingInput} stars. We'll try to do better.`;
  
        feedbackElement.textContent = feedbackMessage;
  
        // Reset the selected stars after submission (optional)
        // highlightStars(-1);
      }
    }
  }
  
  customElements.define('rating-widget', RatingWidget);
  