type CaloriesDisplayProps ={
    calories: number,
    titulo: string
}

export default function CaloriesDisplay({calories, titulo}:CaloriesDisplayProps) {
  return (
    <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
        <span className={`font-black text-6xl ${titulo ==="Consumidas" ? "text-orange-500" : titulo ==="Quemadas" ? "text-green-500" :'text-white' } `}>{calories}</span>
        {titulo}
    </p>
  )
}
