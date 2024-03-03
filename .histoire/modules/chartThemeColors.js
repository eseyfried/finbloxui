const themeColors = {
    "headless": [
        'rgb(229 231 235)',
        'rgb(209 213 219)',
        'rgb(156 163 175)',
        'rgb(107 114 128)',
        'rgb(75 85 99)',
        'rgb(55 65 81)',
        'rgb(31 41 55)'
    ],
    "theme 1": [
        '#37A3EB',
        '#FD6384',
        '#4BC1C1',
        '#FD9F3F',
        '#9965FE',
        '#FECD57',
        '#C9CBD0',
    ],
    "theme 2": [
        'rgb(224 231 255)',
        'rgb(199 210 254)',
        'rgb(165 180 252)',
        'rgb(129 140 248)',
        'rgb(99 102 241)',
        'rgb(79 70 229)',
        'rgb(67 56 202)',
    ]
}

const geChartColorsByTheme = (theme) => {
    return themeColors[theme] || [];
}

export {
    geChartColorsByTheme
}