import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import Head from "next/head"
import Box from "../components/Box"


export default function Home() {
  const voidGame = [null, null, null, null, null, null, null, null, null]

  const [moves, setMoves] = useState(voidGame)
  const [winner, setWinner] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [displayWinnerScreen, setDisplayWinnerScreen] = useState(false)
  const [displayDrawScreen, setDisplayDrawScreen] = useState(false)

  useEffect(() => {
    const isWinner = checkWinner(moves)
    const draw = checkDraw(moves)

    if (isWinner !== false) {
      setDisplayWinnerScreen(true)
      setWinner(isWinner)
    } 
    else if (draw === true) {
      setDisplayDrawScreen(true)
    }
  }, [moves])

  const handleClick = (index) => {
    if (moves[index] === null) {

      const movesList = [...moves]
      movesList[index] = currentPlayer  

      setMoves(movesList)
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    }
  }

  const checkWinner = (moves) => {
    const winningSequences = [
      [0, 1, 2],
      [3, 4, 5], 
      [6, 7, 8], 
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8], 
      [0, 4, 8], 
      [2, 4, 6]  
    ]
    
    for (const index in winningSequences) {
      const [firstMove, secondMove, thirdMove] = winningSequences[index]

      if (moves[firstMove] === 1 && moves[secondMove] === 1 && moves[thirdMove] === 1) {
        return 1
      } 
      else if (moves[firstMove] === 2 && moves[secondMove] === 2 && moves[thirdMove] === 2) {
        return 2
      }
    }
    return false
  }

  const checkDraw = (moves) => {
    return moves.every(move => move !== null)
  }

  const createNewGame = () => {
    setDisplayWinnerScreen(false)
    setDisplayDrawScreen(false)
    setMoves(voidGame)
    setCurrentPlayer(1)
  }

  return (
    <div>
      <Head>
        <title>Jogo da velha</title>
      </Head>
      <main className="relative h-screen bg-zinc-900 flex flex-col justify-center items-center p-6">
        <div className="text-white flex grid grid-cols-3 gap-4 w-full max-w-md h-full max-h-96 text-3xl">
        
          {moves.map((move, index) => {
            return <Box key={index} boxValue={move} onClick={() => handleClick(index)}/>
          })}

        </div>
        <button
          className="text-white bg-purple-700 active:bg-purple-800 px-6 py-2 rounded-md mt-6"
          onClick={createNewGame}>
          Recomeçar jogo
        </button>

        { (displayDrawScreen || displayWinnerScreen) && <motion.div
          className="absolute h-full w-full flex justify-center items-center bg-zinc-700/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          { (displayDrawScreen || displayWinnerScreen) && <motion.div 
          className="bg-zinc-900 p-10 text-center rounded-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type:"spring", stiffness: 150, duration: 0.5 }}
          >
            <div className={`${displayWinnerScreen ? "block" : "hidden"}`}>
              <h1 className="font-bold text-white text-2xl">
                Vitória do <span className="text-purple-700">jogador {winner}</span>
              </h1>
            </div>
            <div className={`${displayDrawScreen ? "block" : "hidden"}`}>
              <h1 className="font-bold text-white text-2xl">
                Deu <span className="text-purple-700">velha!</span>
              </h1>
            </div>
            <button
              className="text-white text-sm mt-4 bg-purple-700 active:bg-purple-800 px-4 py-1 rounded-md"
              onClick={createNewGame}>
              Começar outra partida
            </button>
          </motion.div>}

        </motion.div>}

      </main>
    </div>
  )
}