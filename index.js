let income = 18000;
let quotient = 2.5; // Si seul avec un enfant, l'adulte compte pour 1.5 parts
const resultsArray = []
const slices = [
    {
        min: 0,
        max: 10064,
        rate: 0,
        delta: 10064
    },
    {
        min: 10065,
        max: 25659,
        rate: 0.11,
        delta: 15594
    },
    {
        min: 25670,
        max: 73369,
        rate: 0.3,
        delta: 47699
    },
    {
        min: 73370,
        max: 157806,
        rate: 0.41,
        delta: 84436
    },
    {
        min: 157807,
        max: income >= 157808 ? income : null,
        rate: 0.45,
        delta: income >= 157808 ? (income - 157807) : 157807
    }
]

const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue.result
};

function loopThroughSlices(slices, income) {
    let subResult;
    for (let i = 0; i < slices.length; i++) {
        let min = slices[i].min
        let max = slices[i].max
        let rate = slices[i].rate
        let delta = slices[i].delta

        if (income > min && income < max) {
            subResult = (income - min) * rate;
            resultsArray[i] = {
                slice: i,
                result: parseInt(subResult)
            }
        } else if (income > delta) {
            subResult = (max - min) * rate;
            resultsArray[i] = {
                slice: i,
                result: parseInt(subResult)
            }
        } else {
            subResult = 0;
            resultsArray[i] = {
                slice: i,
                result: parseInt(subResult)
            }
        }
    }

    return resultsArray;
}

function calcTaxable() {
    let resultsArray = loopThroughSlices(slices, income)
    return taxable = resultsArray.reduce(reducer, 0)
}

function calcTaxableWithQuotient(quotient) {
    let incomeWithQuotient = income / quotient;
    let resultsArray = loopThroughSlices(slices, incomeWithQuotient);
    let reducedArray = resultsArray.reduce(reducer, 0)
    return reducedArray * quotient;
}

function displayPerSlice() {
    let resultsArray = loopThroughSlices(slices, income);
    let detailedSlices = []
    for (let i = 0; i < resultsArray.length; i++) {
        detailedSlices[i] = {
            slice: i,
            result: resultsArray[i]
        }
    }
    return detailedSlices
}

function displayPerSliceWithQuotient(quotient) {
    let incomeWithQuotient = income / quotient;
    let resultsArray = loopThroughSlices(slices, incomeWithQuotient);
    let detailedSlices = []
    for (let i = 0; i < resultsArray.length; i++) {
        detailedSlices[i] = {
            slice: i,
            result: resultsArray[i]
        }
    }
    return detailedSlices
}

/**
 * Exercice 1 : Calcul simple
 */
// const result = calcTaxable(income, slices);
// console.log("Pour l'année en cours, vous devez %s € aux impôts", result);

/**
 * Exercice 2 : Calcul avec quotient familial
 */

const resultWithQuotient = calcTaxableWithQuotient(quotient);
console.log(`Avec un quotient familial de ${quotient}, avec ${income} € de revenus, vous devez ${resultWithQuotient} € aux impôts`);

/**
 * Exercice 3 : Détail sans quotient de chaque tranche
 */

// const displaySlicesDetails = displayPerSlice();
// console.log(displaySlicesDetails);

/*
 * Exercice 3b : Détail avec quotient de chaque tranche
 */

// const displaySliceWithQuotientDetails = displayPerSliceWithQuotient(quotient);
// console.log(displaySliceWithQuotientDetails);