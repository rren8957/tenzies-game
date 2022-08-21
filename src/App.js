import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import './style.css'
import Confetti from "react-confetti"
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollsToWin, setRollsToWin] = React.useState({currCount: 0, LeastRolls: null})
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRollsToWin(prev => {
                return {
                    ...prev,
                    currCount : prev.currCount += 1
                }
            })
        } else {
            setTenzies(false)
            setRollsToWin(prev => {
                return {
                    LeastRolls : 
                    prev.currCount < prev.LeastRolls || prev.LeastRolls === null ? prev.currCount : prev.LeastRolls,
                    currCount: 0
                }
            })
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <Popup open={tenzies}>
              <div className="popup-words"> You Won!</div>
            </Popup>
            <div className="title">
                <FontAwesomeIcon icon={faDice} size="lg" />
                <h2>Tenzies</h2>
                <FontAwesomeIcon icon={faDice} size="lg" />
            </div>    
            <p className="instructions">Goal: roll until all dice are the same. <br></br>
            Directions: click a die to freeze it at its current value between rolls.</p>
            <h3 className="num-rolls"># of rolls: {rollsToWin.currCount} || best record: {rollsToWin.LeastRolls} </h3>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <div className="github-icon" 
            onClick={(e) => {
                e.preventDefault();
                window.location.href='https://github.com/rren8957/tenzies-game/tree/main';
                }}>
                <FontAwesomeIcon icon={faGithub} size="lg" border/>
            </div>
        </main>
    )
}