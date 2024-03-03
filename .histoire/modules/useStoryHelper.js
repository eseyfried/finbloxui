export const defaultValue = (component, prop, override = null) => {
    if (!propExists(component, prop)) {
        return null
    }
    const defaultValue = override ? override : component.props[prop].default 
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
}

export const propDesc = (component, prop, usePrivate = false) => {
    if (!propExists(component, prop)) {
        return null
    }
    if (
        Object.hasOwn(component.props[prop], 'private') &&
        component.props[prop].private &&
        usePrivate === false
    ) {
        return null
    }
    const description = component.props[prop]?.desc
    return description;
}

export const propOptions = (component, prop) => {
    if (!propExists(component, prop)) {
        return null
    }
    if (!Object.hasOwn(component.props[prop], 'options')) {
        return null
    }
    return component.props[prop].options
}

const propExists = (component, prop) => {
    if (!Object.hasOwn(component.props, prop)) {
        return false
    }
    return true
}


export const generateArgs = (props) => () => ({...props})
        