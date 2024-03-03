const isSameDomain = (styleSheet) => {
    if (!styleSheet.href) {
        return true;
    }

    return styleSheet.href.indexOf(window.location.origin) === 0;
};
  
const isStyleRule = (rule) => rule.type === 1;
  
const getCSSCustomPropIndex = () =>
    [...document.styleSheets].filter(isSameDomain).reduce(
        (finalArr, sheet) =>
        finalArr.concat(
            [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
            const props = [...rule.style]
                .map((propName) => [
                    propName.trim(),
                    rule.style.getPropertyValue(propName).trim()
                ])
                .filter(([propName]) => propName.indexOf("--") === 0);

                return [...propValArr, ...props];
            }, [])
        ),
        []
    );

const getCSSCustomPropIndexByTheme = () =>
[...document.styleSheets].filter(isSameDomain).reduce(
    (finalArr, sheet) =>
    finalArr.concat(
        [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
            const theme = window.theme || 'headless'
            const pattern = `html\\[data-mode="${theme}"\\]`
            const regex = new RegExp(pattern, "g")
            const hasTheme = regex.test(rule.selectorText)
        const props = [...rule.style]
            .map((propName) => [
                propName.trim(),
                rule.style.getPropertyValue(propName).trim()
            ])
            .filter(([propName]) => hasTheme && propName.indexOf("--") === 0);
            return [...propValArr, ...props];
        }, [])
    ),
    []
);

const getFBCustomVars = (search) => {
    const fn = useTheme() ? getCSSCustomPropIndexByTheme : getCSSCustomPropIndex
    return fn().filter(customProp => {
        const regex = search ? new RegExp(search, "g") : /--fb-./g;
        return customProp[0].match(regex)
    })
}

const getCustomVarValue = (varName, vars = []) => {
    const customVars = vars.length ? vars : getCSSCustomPropIndex();
    const customVar = customVars.filter(_var => _var[0] === varName);
    return customVar.length ? customVar[0][1] : null
}

const getColorsFromCSSVars = () => {
    const fbChartColors = getFBCustomVars("--fb-chart-color-.");
    const processedColors = [];
    return fbChartColors.filter(color => {
        if (!processedColors.includes(color[0])) {
            processedColors.push(color[0]);
            return true;
        } else {
            return false;
        }
    }).map(color => color[1]);
}

const useTheme = () => window.theme || false

export {
    getCSSCustomPropIndex,
    getFBCustomVars,
    getCustomVarValue,
    getColorsFromCSSVars
}