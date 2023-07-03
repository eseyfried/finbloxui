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
};