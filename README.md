# Udacity FlashCards
Udacity FlashCards is the third project of the React Udacity Nanodegree program
# Documentation

## How to use

### Install expo on your smartphone

* You can install expo using the link `https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR`

### Run the application server

* Clone the repository from `https://github.com/Ymbere/Udacity-FlashCards.git`
* Go to the main folde `cd Udacity-FlashCards/`
* Install the dependencies `npm install`
* Run the server `npm start`
* Go to `http://localhost:19002/` on your browser
* Open the expo APP on your smartphone and scan the QR code

## What You're Getting
```bash
├── .expo
│
├── assets
│
├── components
│   ├── DeckCard.js #Render a deck
│   ├── DeckList.js # Render the list of decks
│   ├── DeckMainPage.js # Render the main page os specific deck
│   ├── HomeScreen.js # Render the list of decks and the button to create a new deck
│   ├── NewCard.js # Render the view to create a new card ('Question')
│   ├── NewDeck.js # Render the view to create a new deck
│   └── Quiz.js # Render the quiz screen
│
├── node_modules
│
├── redux
│   │
│   ├── actions
│   │   ├── DeckActions.js
│   │   └── Shared.js
│   │
│   ├── middleware
│   │   ├── index.js
│   │   └── logger.js
│   │
│   └── reducers
│       ├── DeckReducer.js
│       └── index.js
│
├── utils
│   ├── API.js
│   ├── colors.js
│   └── Notification.js
│
├── .watchmanconfig
├── App.js
├── app.json
├── babel.config.js
├── package-lock.json
└── package.json
```

## Tested platform
* This app was tested only on Android
