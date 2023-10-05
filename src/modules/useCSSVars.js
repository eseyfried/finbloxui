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

const getFBCustomVars = (search) => getCSSCustomPropIndex().filter(customProp => {
    const regex = search ? new RegExp(search, "g") : /--fb-./g;
    return customProp[0].match(regex)
})

const getCustomVarValue = (varName, vars = []) => {
    const customVars = vars.length ? vars : getCSSCustomPropIndex();
    const customVar = customVars.filter(_var => _var[0] === varName);
    return customVar.length ? customVar[0][1] : null
}

export {
    getCSSCustomPropIndex,
    getFBCustomVars,
    getCustomVarValue
}