# ALPHAMOT

A multilingual Wordle-inspired word guessing game built with vanilla JavaScript. The application features persistent game sessions, statistics tracking, multilingual support, dark mode, sound effects, and automatic state restoration using Local Storage.

Play the game, guess the hidden word in 6 attempts, and challenge yourself across multiple languages.

Designed to behave like a real production game with persistent sessions, state restoration, and clean separation between UI and game logic.

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
- Detailed player statistics :
  - Win percentage tracking
  - Current and maximum streak tracking
  - Guess distribution chart
- Challenge friends by sharing same word after game ends
- Shareable game links with encoded words
- On mobile anEmoji result grid in message.

### Multilingual Support

- 🇬🇧 English
- 🇫🇷 French
- 🇧🇷 Brazilian Portuguese

The game automatically detects the user’s browser language on first visit.
Shared challenges preserve selected language

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

Game state is fully saved locally, allowing seamless continuation after refresh:

- Current word is saved
- Past guesses are restored on reload
- Game progress persists between sessions
- Automatically resumes active games on launch
- Completed games do not restore into playable state

User preferences are also saved:

- Selected language
- Dark mode preference
- Sound settings
- First visit detection

Game Statistics are also saved:

- Total games played
- Games won
- Win percentage
- Current streak
- Maximum streak
- Guess distribution history

Shared challenge links can also:

- Load a custom word from a URL
- Override the game language from URL parameters
- Start a fresh challenge by clearing previous saved progress

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
- Chart.js

Browser APIs

- Local Storage API
- Fetch API
- DOM Manipulation
- Audio API
- Web Share API
- Clipboard API

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
- Data visualization with Chart.js
- Statistics tracking and persistence
- URL parameter handling
- Web Share API integration
- Clipboard API usage
- Encoding and decoding data for URLs

## Future Improvements

- Daily challenge mode
- Add Difficulty / timer / hard mode forced to use correct letters
- Button to reveal a letter
- Progressive Web App (PWA)
