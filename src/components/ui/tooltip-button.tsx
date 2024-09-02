'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
interface IProps extends IFunction {
  mode: TMode
}

const TooltipButton: FC<IProps> = ({ title, description, example, callback, mode }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleOnMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleOnMouseLeave = () => {
    setShowTooltip(false)
  }

  const handleOnClick = () => {
    callback && callback()
  }

  const getHighlightClass = () => {
    return example ? 'highlightGreen' : 'highlightBlue'
  }

  return (
    <div className='relative inline-block'>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={variants}
            className='absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform'
          >
            <div className='w-[360px] rounded bg-gray200 p-2 text-xs'>
              <h3 className='mb-1 uppercase'>{title}</h3>
              <p className='mb-1 text-gray800'>{description}</p>
              {example && <div className='flex items-center gap-[2px] rounded-[4px] bg-white p-1'>{example}</div>}
            </div>
            <div className='mx-auto h-0 w-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray200'></div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className={`${getHighlightClass()} ${mode === 'select' && example && 'cursor-not-allowed opacity-50'}`}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onClick={handleOnClick}
        disabled={mode === 'select' && example}
      >
        {title}
      </button>
    </div>
  )
}

export default TooltipButton
