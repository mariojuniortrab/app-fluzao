import React, {useState, useEffect} from 'react'
const NUM_CLIQUES  = 5
const SPEEDS = [0, 3000, 1000, 500, 250, 100]

var elem = document.documentElement;

const openFullscreen = () => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}


const Sinalizador = () => {
    const [classe, setClasse] = useState('fundo-branco')
    const [click, setClick] = useState(0)

    const handleClick = () => {
        let valor = click

        if(click === NUM_CLIQUES){
            valor = 0
            closeFullscreen()
        }else{
            valor = valor + 1
            openFullscreen()
        }

        setClick(valor)
    }

    const changeColor = () => {
        setClasse(classe => {
            let cor = classe === 'fundo-verde' ?  'fundo-vermelho' : 'fundo-verde'
            return cor
        })
    }

    useEffect(() => {
        let interval = '';
        if (click > 0){
            changeColor()
            interval = setInterval(()=>{   
                changeColor()
            }, SPEEDS[click])
        }else{
            setClasse('fundo-branco')
        }
        return () => clearInterval(interval)
    }, [click])

    return (
        <div className={`${classe}`} onClick={() => handleClick()}>
            Clique na tela para alterar a velocidade!
        </div>
    )
}

export default Sinalizador
