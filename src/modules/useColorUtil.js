import colorLib from '@kurkle/color';
const rgbToHex = (r, g, b) => {
    return "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
}

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const valueToHex = (v) => {
    const hex = v.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const transparentize = (value, opacity) => {
    const alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
}

export {
    rgbToHex,
    hexToRgb,
    transparentize
}