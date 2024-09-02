import { FC } from 'react'
import TooltipButton from './ui/tooltip-button'

interface IProps {
  functions: IFunction[]
  mode: TMode
}

const Functions: FC<IProps> = ({ functions, mode }) => {
  return (
    <div className='flex gap-2'>
      {functions.map((fx) => (
        <TooltipButton
          key={fx.id}
          {...fx}
          mode={mode}
        />
      ))}
    </div>
  )
}

export default Functions
