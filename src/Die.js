import React from "react"

export default function Die(props){
    const styles ={
        backgroundColor : props.isHeld ? "green" : "white"
    }
    return(
        <div>
            <h2 style={styles} onClick={props.handleClick}>{props.value}</h2>
        </div>
    )
}