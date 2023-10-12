const arraySum = (array) => array.reduce((partialSum, a) => partialSum + parseFloat(a), 0)

export {
    arraySum
}