# ALPHAMOT

A multilingual Wordle-inspired word guessing game with persistant memory built with JavaScript.
Play the game, guess the hidden word in 6 attempts, and challenge yourself across multiple languages.

![alt text](/data/images/screenshot.png)

## Features

### Gameplay

- Wordle-style word guessing game
- 6 attempts to find the hidden word
- First letter revealed automatically
- Real-time keyboard and physical keyboard support
- Color-coded feedback:
  - 🟩 Correct letter in correct position
  - 🟨 Correct letter in wrong position
  - 🟦 Letter not present in the word
- Win and loss states
- Word definitions after each game
- One-click replay system

### Multilingual Support

- 🇬🇧 English
- 🇫🇷 French
- 🇧🇷 Brazilian Portuguese

The game automatically detects the user’s browser language on first visit.

### User Experience

- Light and Dark Mode
- Responsive design for desktop, tablet and mobile
- Glassmorphism-inspired UI
- Animated interface elements
- Interactive settings menu
- First-time user instructions

### Audio Feedback

- Sound effects for:
  - Menu interactions
  - Winning
  - Losing
  - Errors
  - Backspace
  - New rows
  - Restarting
- Sound toggle option
- User preferences saved with Local Storage

### Persistence

Game Progress is saved locally:

- current word is saved
- past guesses are recovered and displayed on refresh

User preferences are saved locally:

- Selected language
- Dark mode preference
- Sound settings
- First visit detection

## Technologies Used

Frontend

- HTML5
- CSS3
- JavaScript

Styling

- Flexbox
- CSS Gradients
- CSS Animations
- Media Queries
- Glassmorphism Effects

Libraries

- Font Awesome￼
- JS Confetti￼

Browser APIs

- Local Storage API
- Fetch API
- DOM Manipulation
- Audio API

## What I Learned

This project helped me practice:

- JavaScript modules
- State management
- DOM manipulation
- Event handling
- Local Storage
- Responsive design
- Accessibility considerations
- Multi-language application development
- Project structure and code organization

## Future Improvements

- Statistics tracking
- Daily challenge mode
- Add Difficulty / timer / hard mode forced to use correct letters
- Share results feature
- Button to reveal a letter
- Progressive Web App (PWA)
