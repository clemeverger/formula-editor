import { FC, useState } from 'react'

interface IProps {
  mode: TMode
  addColumnToFormula: (column: string) => void
}

const FormulaTable: FC<IProps> = ({ mode, addColumnToFormula }) => {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)
  const handleColumnSelect = (index: number) => {
    if (mode === 'select') {
      addColumnToFormula(`$${tableHeaders[index]}`)
    }
  }

  const tableHeaders = ['productId', 'price', 'currency', 'category', 'brand', 'discount']
  const tableData = [
    { productId: 'P12345', price: 99.99, currency: 'USD', category: 'Electronics', brand: 'BrandA', discount: 10.0 },
    { productId: 'P67890', price: 59.99, currency: 'EUR', category: 'Clothing', brand: 'BrandB', discount: 15.0 },
  ]

  return (
    <div className='flex w-full max-w-[776px] flex-col gap-2 bg-backgroundSection p-6'>
      <h2 className='text-sm text-textPrimary'>Product Table</h2>
      <div className='overflow-x-auto'>
        <table className={`min-w-full rounded-md border bg-white ${mode === 'select' && 'border-blue-500 border-dashed bg-blue-50'}`}>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`px-4 py-2 text-left text-sm font-normal uppercase text-textPrimary ${
                    mode === 'select' && index === hoveredColumn && 'bg-blue-100 cursor-pointer'
                  }`}
                  onMouseEnter={() => setHoveredColumn(index)}
                  onMouseLeave={() => setHoveredColumn(null)}
                  onClick={() => handleColumnSelect(index)}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-2 text-sm ${mode === 'select' && colIndex === hoveredColumn && 'bg-blue-100 cursor-pointer'}`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FormulaTable
