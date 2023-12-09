import { computed } from "vue";
import { getFBCustomVars } from "@/modules/useCSSVars";

const areaColor = (areaColor, primaryVarName) => computed(() => {

    const cssVar1 = getFBCustomVars(primaryVarName);
    const cssVar2 = getFBCustomVars("--fb-chart-area-color");

    if (cssVar1[0]) {
        return cssVar1[0][1];
    } else  if (cssVar2[0]) {
        return cssVar2[0][1];
    } else {
        return areaColor
    }
});

const barColor = (barColor, primaryVarName) => computed(() => {

    const cssVar1 = getFBCustomVars(primaryVarName);
    const cssVar2 = getFBCustomVars("--fb-chart-bar-color");

    if (cssVar1[0]) {
        return cssVar1[0][1];
    } else  if (cssVar2[0]) {
        return cssVar2[0][1];
    } else {
        return barColor
    }
});

const lineColor = (lineColor, primaryVarName) =>computed(() => {
    const cssVar1 = getFBCustomVars(primaryVarName);
    const cssVar2 = getFBCustomVars("--fb-chart-line-color");
     if (cssVar1[0]) {
        return cssVar1[0][1];
    } else  if (cssVar2[0]) {
        return cssVar2[0][1];
    } else {
        return lineColor
    }
});

export {
    areaColor,
    barColor,
    lineColor
}