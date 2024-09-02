'use client'
import FormulaEditor from '@/components/formula-editor'
import FormulaTable from '@/components/formula-table'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const functions: IFunction[] = [
    {
      id: 0,
      title: 'column',
      description: 'Select a specific column from the table',
      callback: () => {
        setMode((prev) => (prev === 'select' ? 'normal' : 'select'))
      },
    },
    {
      id: 1,
      title: 'calculate',
      description: 'Calculate a value based on a formula',
      example: (
        <>
          <div className='highlightGreen'>calculate(</div>
          <div>a</div>
          <div className='highlightGreen'>;</div>
          <div>operator</div>
          <div className='highlightGreen'>;</div>
          <div>b</div>
          <div className='highlightGreen'>)</div>
        </>
      ),
      callback: () => {
        const position = valueRef?.current?.selectionStart || 0
        setValue((prev) => {
          return prev.substring(0, position) + 'calculate(;;)' + prev.substring(position)
        })
        setCursorPosition(position + 10)
      },
    },
    {
      id: 2,
      title: 'currency',
      description: 'Convert a currency, applying current trading rate',
      example: (
        <>
          <div className='highlightGreen'>currency(</div>
          <div>value</div>
          <div className='highlightGreen'>;</div>
          <div>input_currency</div>
          <div className='highlightGreen'>;</div>
          <div>output_currency</div>
          <div className='highlightGreen'>)</div>
        </>
      ),
      callback: () => {
        const position = valueRef?.current?.selectionStart || 0
        setValue((prev) => {
          return prev.substring(0, position) + 'currency(;;)' + prev.substring(position)
        })
        setCursorPosition(position + 10)
      },
    },
  ]

  const [value, setValue] = useState<string>('')
  const valueRef = useRef<HTMLTextAreaElement>(null)
  const [cursorPosition, setCursorPosition] = useState<number>(0)

  const [mode, setMode] = useState<TMode>('normal')

  const addColumnToFormula = (column: string) => {
    const position = valueRef?.current?.selectionStart || 0
    setValue((prev) => {
      return prev.substring(0, position) + column + prev.substring(position)
    })
    setCursorPosition(position + column.length)
    setMode('normal')
  }

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current.focus()
      valueRef.current.setSelectionRange(cursorPosition, cursorPosition)
    }
  }, [cursorPosition])

  return (
    <main className='grid min-h-screen place-items-center bg-gradient-to-r from-gradientLeft to-gradientRight'>
      <FormulaEditor
        ref={valueRef}
        mode={mode}
        value={value}
        setValue={setValue}
        functions={functions}
      />
      <FormulaTable
        mode={mode}
        addColumnToFormula={addColumnToFormula}
      />
    </main>
  )
}
