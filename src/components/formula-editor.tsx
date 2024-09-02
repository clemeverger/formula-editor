'use client'
import { postFormulaToBackend } from '@/app/action'
import { forwardRef, useTransition } from 'react'
import Functions from './functions'

interface IProps {
  mode: TMode
  value: string
  setValue: (value: string) => void
  functions: IFunction[]
}

const FormulaEditor = forwardRef<HTMLTextAreaElement, IProps>(function FormulaEditor({ mode, functions, value, setValue }, fieldRef) {
  const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const [isPending, startTransition] = useTransition()

  const handleValidate = () => {
    startTransition(async () => {
      if (!isFormulaValid()) return
      await postFormulaToBackend()
    })
  }

  const isFormulaValid = (): boolean => {
    // Validate the formula
    return true
  }

  const isDisabled = mode === 'select' || isPending

  return (
    <div className='flex h-[225px] w-[776px] flex-col gap-2 bg-backgroundSection p-6'>
      <h2 className='text-sm text-textPrimary'>Flag value</h2>
      <Functions
        functions={functions}
        mode={mode}
      />
      <textarea
        ref={fieldRef}
        value={value}
        onChange={handleValueChange}
        className={`flex w-full resize-none gap-2 rounded-md border bg-white p-4 outline-mimbiGreenBas ${
          isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:border-mimbiGreenBase'
        }`}
        disabled={mode === 'select'}
      />
      <div className='text-right'>
        <button
          className={`w-fit rounded bg-mimbiGreenBase px-2 py-1 text-sm text-textPrimary ${isDisabled && 'cursor-not-allowed opacity-50'}`}
          disabled={isDisabled}
          onClick={handleValidate}
        >
          Validate
        </button>
      </div>
    </div>
  )
})
export default FormulaEditor
