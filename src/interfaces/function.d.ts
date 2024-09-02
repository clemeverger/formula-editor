interface IFunction {
  id: number
  title: string
  description: string
  example?: ReactNode | undefined
  callback?: () => void
}
