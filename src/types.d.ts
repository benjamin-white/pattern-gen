declare namespace CSS {
  interface PropertyDefinition {
    name: string
    syntax?: string
    inherits: boolean
    initialValue?: string | number
  }
  function registerProperty (propertyDefinition: PropertyDefinition): undefined
}
