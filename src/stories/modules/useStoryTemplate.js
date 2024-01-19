
const parseAttributes = (tag) => {
    // get everything between tagName and tag end
    const tagAttrs = /[^<\w][^/>]+/gim.exec(tag)
    // split tag on spaces
    const attrs = tagAttrs[0] ? tagAttrs[0].trim().split(/\s+/g) : []
    // const filteredAttrs = attrs.filter(attr => attr != 'v-bind="args"')
    const filteredAttrs = attrs.filter(attr => true)
    return filteredAttrs
}

const propsToAttrs = (props) => {
    if (!props) {
        return
    }
    const attrs = Object.entries(props).map((prop) => {
        const [key, value] = prop;
        const formattedValue = (typeof value === 'object' || Array.isArray(value)) ? JSON.stringify(value) : value
        return `${key}='${formattedValue}'`
    })
    return attrs
}

const formatAttrs = (attrs) => {
    return attrs.map(attr => " ".repeat(4) + attr).join("\n")
}

export const useStoryTemplate = (tmpl, props = null) => {
    // find tag that has v-bind
    const vbindRegex = /(<\w+\s)([^>]*)v-bind="args"([^/>]*)(\/?>)/gim
    const matchedTag = vbindRegex.exec(tmpl)

    const foundAttrs = parseAttributes(matchedTag[0])
    const propAttrs = propsToAttrs(props) || []
    const finalAttrs = [...foundAttrs, ...propAttrs]


    return tmpl.replace(vbindRegex, (match, tagStart, group2, group3, tagEnd) => {
        return `${tagStart.trim()}\n${formatAttrs(finalAttrs)}\n${tagEnd}`
    })
}