import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'

export default function Die(props) {
    const styles = {
        color: props.isHeld ? "#5035FF" : "white"
    }

    function dieFace()  {
        if (props.value === 1) {
            return <FontAwesomeIcon icon={faDiceOne} />
        } else if (props.value === 2) {
            return <FontAwesomeIcon icon={faDiceTwo} />
        } else if (props.value === 3) {
            return <FontAwesomeIcon icon={faDiceThree} />
        } else if (props.value === 4) {
            return <FontAwesomeIcon icon={faDiceFour} />
        } else if (props.value === 5) {
            return <FontAwesomeIcon icon={faDiceFive} />
        } else {
            return <FontAwesomeIcon icon={faDiceSix} />
        }
    }

    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {dieFace()}
            {/* <h2 className="die-num">{props.value}</h2> */}
        </div>
    )
}