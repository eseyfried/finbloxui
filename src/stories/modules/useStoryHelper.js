export const defaultValue = (component, prop) => component.props[prop].default

export const generateArgs = (props) => () => ({...props})
        