import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
import ChatApp from './components/ChatApp'; // Import the ChatApp component.


const cardImages = [
  { "src": "/img/coffee.png", matched: false},
  { "src": "/img/icecream.png", matched: false},
  { "src":"/img/kimchi.png", matched: false},
  { "src" :"/img/pizza.png", matched: false},
  { "src" :"/img/salad.png", matched: false},
  { "src": "/img/spinach.png", matched: false}
]


function App() {
  const [cards, setCards] = useState ([])
  const [turns,setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }
  //handling choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //Compare cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else { 
        setTimeout (() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  console.log(cards)
    
  //reset
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  } 
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory Matching Game</h1>
      <button on onClick={shuffleCards}>New Game</button>

      <div className = "card-grid">
      { cards.map(card => (
          < SingleCard
          key={card.id} 
          card={card} 
          handleChoice = {handleChoice}
          flipped={ card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
        </div>
        <p>Turns: {turns}</p>
        <div className="App">
      <header className="App-header">
        <h1>My Chat App</h1>
      </header>
      <main>
        <ChatApp /> {/* Render the ChatApp component here. */}
      </main>
    </div>
      </div>
  );
}

export default App