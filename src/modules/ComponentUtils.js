export default {
    getVNodeProp(vnode, prop) {
        let props = vnode.props;
        if (props) {
            let kebapProp = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            let propName = Object.prototype.hasOwnProperty.call(props, kebapProp) ? kebapProp : prop;
            return vnode.type.props[prop].type === Boolean && props[propName] === '' ? true : props[propName];
        }

        return null;
    },
    resolveFieldData(data, field) {
        if (data && Object.keys(data).length && field) {
            if (this.isFunction(field)) {
                return field(data);
            } else if (field.indexOf('.') === -1) {
                return data[field];
            } else {
                let fields = field.split('.');
                let value = data;

                for (var i = 0, len = fields.length; i < len; ++i) {
                    if (value == null) {
                        return null;
                    }

                    value = value[fields[i]];
                }

                return value;
            }
        } else {
            return null;
        }
    },
    isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    getChildVNodeByType(children, type) {
        if (!children) {
            return null
        }
        return children.filter(child => child.type.__name === type)[0]
    },

    getVNodeChildrenBySlotName(vnodes, slotName = 'default') {
        
        if (vnodes == null) {
            return []
        }
        return Object.hasOwn(vnodes, slotName) ? vnodes[slotName]() : []
    },
    /**
     * recursively search component children (slots) for existence of a component
     * @param Array vnodes children slots
     * @param String componentName 
     */
    hasComponent(vnodes, componentName) {
        function nodeHasComponent(node) {
            if (node.type.__name === componentName) {
                foundComponent = true;
                return true;
            } else if (node.children) {
                return node.children.default().some(nodeHasComponent);
            }
            return false
        }
        let foundComponent = false
        const children = this.getVNodeChildrenBySlotName(vnodes).filter(vnode => typeof vnode.type === 'object')

        children.some(nodeHasComponent);
        return foundComponent
    }
};