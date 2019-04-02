import { AsyncStorage } from 'react-native'
const FLASH_CARDS_STORAGE_KEY = "FlashCards:key"

export async function retriveDecks() {
    const decks = await AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY);
    return JSON.parse(decks);
}

export function retriveOneDeck(deck_id) {
    const decks = retriveDecks()
    return decks.find(deck => deck.id.toString() === deck_id)
}

export function addDeckToStorage(deck) {
    const newState = addItem(deck)
    AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(newState))
}

export function addCardToStorage(card) {
    const newState = addCardToDeck(card)
    AsyncStorage.setItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify(newState))
}

function addCardToDeck(card) {
    const state = retriveDecks()
    return state.map((deck) => {
        if (deck.id === card.deck_id) {
            return {
                ...deck,
                cards: [...deck.cards, card]
            }
        }
        return deck
    })
}

function addItem(item) {
    const state = retriveDecks()
    state.push(item)
    return state
}
