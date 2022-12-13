

import React from 'react'
import PropTypes from 'prop-types'
import './Game.css'


const Canvas = ({draw,canvasHeight,canvasWidth}) => {
    let y = 100
    const canvas = React.useRef()

    React.useEffect(() => {
        const context = canvas.current.getContext('2d')
        draw(context)
    })

    
    



return (
    <div className='game-container'>
        <canvas className='canvas' ref={canvas} draw={draw} canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
    </div>  
    )
}


Canvas.propTypes = {
    draw: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
}


export default Canvas;