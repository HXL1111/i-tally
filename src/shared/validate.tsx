type FDate = {
  [k: string]: JSONValue
}
type Rule<T> = {
  key: keyof T
  message: string
} & (
  | { type: 'required' }
  | { type: 'pattern'; regex: RegExp }
  | { type: 'notEqual'; value: JSONValue }
  | { type: 'repeat'; data: JSONValue[] }
)
type Rules<T> = Rule<T>[]
export type { FDate, Rule, Rules }
export const validate = <T extends FDate>(formDate: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[]
  }
  const errors: Errors = {}
  rules.map((rule) => {
    const { key, type, message } = rule
    const value = formDate[key]
    switch (type) {
      case 'required':
        if (value === null || value === undefined || value === '') {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'pattern':
        if (value && !rule.regex.test(value.toString())) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      default:
        return
      case 'notEqual':
        if (value && value === rule.value) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'repeat':
        if (value && rule.data.indexOf(value) >= 0) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
    }
  })
  return errors
}

export function hasError(errors: Record<string, string[]>) {
  let result = false
  for (let key in errors) {
    if (errors[key]?.length > 0) {
      result = true
      break
    }
  }
  return result
}
