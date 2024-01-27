export const defaultValue = (component, prop) => {
    const defaultValue = component.props[prop].default
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
}

export const generateArgs = (props) => () => ({...props})
        