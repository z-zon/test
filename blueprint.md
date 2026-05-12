# Lotto 6/45 Automatic Generator Blueprint

## Overview
A web-based Lotto 6/45 automatic generator that allows users to generate 5 games of lotto numbers (1-45) with a single click. The application is built with vanilla HTML, CSS, and JavaScript, focusing on a modern, responsive, and visually appealing UI.

## Features
- **One-click Generation:** Generates 5 sets of 6 unique numbers between 1 and 45.
- **Sorted Results:** Each game's numbers are displayed in ascending order.
- **Visual Representation:** Numbers are displayed as stylized balls with colors typical of lotto balls.
- **Responsive Design:** Fully functional and aesthetic on both mobile and desktop.
- **Reset Mechanism:** Subsequent clicks replace existing numbers with new ones.

## Design Specifications
- **Theme:** Vibrant and energetic using modern color spaces (OKLCH).
- **Typography:** Expressive and readable font choices.
- **Components:**
  - Header with the title "로또 자동추첨기".
  - "Generate" button with glow effects and hover animations.
  - Results container to hold 5 rows of lotto balls.
- **Modern CSS:** Utilizing Flexbox for layout, logical properties, and CSS variables for consistency.

## Implementation Plan
1. **HTML Structure (`index.html`):** Define the skeleton including the header, button, and a container for the lotto results.
2. **Styling (`style.css`):** 
   - Implement responsive layout.
   - Design the lotto balls with multi-layered shadows and gradients.
   - Style the button with interactivity and visual effects.
3. **Logic (`main.js`):**
   - Function to generate unique random numbers.
   - Logic to sort and display the numbers as DOM elements.
   - Event listener for the "Generate" button.

## Progress Tracking
- [x] Create `index.html`
- [x] Create `style.css`
- [x] Create `main.js`
- [x] Verify functionality and responsiveness
