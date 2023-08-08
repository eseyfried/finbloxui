export default {
    columns: (slots, groupRowsBy) => {
        let children;
        // handles getting slotted Column components from wrapped Component
        if (slots.default()[0].children && slots.default()[0].children.length > 0) {
            children = slots.default()[0].children.filter(child => child.type.__name === "Column" && child.props.field !== groupRowsBy);
        } else {
            children = slots.default().filter(child => child.type.__name === "Column" && child.props.field !== groupRowsBy);
        }
        return children;
    },

    defaultDataTableOptions: (options = {}) => {
        return {
            ...options,
            ...{
             columnSelector: true
            }
        }
    }
}