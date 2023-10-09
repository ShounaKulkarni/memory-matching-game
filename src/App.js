import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/pickachu.png" , matched: false },
  { "src": "/img/charlizard.png" , matched: false },
  { "src": "/img/bulbasaur.png" , matched: false },
  { "src": "/img/eevee.png" , matched: false },
  { "src": "/img/jigglypuff.png" , matched: false },
  { "src": "/img/dragonite.png" , matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState (null)
  const [choiceTwo, setChoiceTwo] = useState (null)
  const [disabled, setDisabled] = useState (false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card)=> ({ ...card, id: Math.random() }))
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  //handle a choice
  const handleChoice =(card)=> {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect( () => {
    if (choiceOne && choiceTwo){
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            } else{
              return card
            }
          })
        })
        resetTurn()
      } else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  //reset choices & increase turn
  const resetTurn = () =>{
    setChoiceOne (null) 
    setChoiceTwo (null)
    setTurns (prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  //
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory Matching Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}  
            card={card}
            handleChoice={handleChoice}
            flipped={card ===  choiceOne || card === choiceTwo || card.matched }
            disabled={disabled}
          />
        ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    //</div>
  );
}

export default App