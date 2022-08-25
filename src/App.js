import Die from "./Die"
import { nanoid } from 'nanoid'
import React from "react"

export default function App(){
    const[dice,setDice] = React.useState(allNewDice())
    const[tenzies,setTenzies] = React.useState(false)

    React.useEffect(()=>{
        const allHeld = dice.every(dice => dice.isHeld)
        const firstDie = dice[0].value
        const allSame = dice.every(die => die.value === firstDie)
        if(allHeld && allSame){
            setTenzies(true)
        }
    }, dice)


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

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
            {...die, isHeld : !die.isHeld}:
            die
        }
        ))
    }

    function roll(){
        if(!tenzies){
               setDice(oldDice => oldDice.map(die => {
            return die.isHeld ?
            die:
            generateNewDie()
            })) 
        }else{
            setTenzies(false)
            setDice(allNewDice())
        }
        
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            handleClick = {() => holdDice(die.id)}
        />
    ))
    

    return(
        <div>
            <h2 >{diceElements}</h2>
            <button onClick={roll}>{tenzies ? "New Game" : "Roll 'em"}</button>
        </div>
    )
}