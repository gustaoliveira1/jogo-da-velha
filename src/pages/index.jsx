import { useState } from "react"

import Head from "next/head"
import Box from "../components/Box"

export default function Home() {
  const [moves, setMoves] = useState([null, null, null, null, null, null, null, null, null])
  const [currentPlayer, setCurrentPlayer] = useState(1)

  const handleClick = (index) => {
    if (moves[index] === null) {
      let moveList = [...moves]
      moveList[index] = currentPlayer
      setMoves(moveList)
  
      setCurrentPlayer(currentPlayer == 1 ? 2 : 1)
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

  const noAvaliableMoves = (moves) => {
    return moves.every((move) => {
      return move !== null 
    })
  }

  return (
    <div>
      <Head>
        <title>Jogo da velha</title>
      </Head>

      <main className="h-screen bg-zinc-900 flex justify-center items-center p-6">
        <div className="text-white flex grid grid-cols-3 gap-4 w-full max-w-md h-full max-h-96 text-3xl">
            
          {moves.map((move, index) => {
            return <Box key={index} boxValue={move} onClick={() => handleClick(index)}/>
          })}

        </div>
      </main>
    </div>
  )
}