let income = 34000;
let quotient = 2.5; // Si seul avec un enfant, l'adulte compte pour 1.5 parts
const resultsArray = []
const slices = [{
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

const reducer = (accumulator, currentValue) => accumulator + currentValue;

function loopThroughSlices(slices, income) {
  let subResult;
  for (let i = 0; i < slices.length; i++) {
    let min = slices[i].min
    let max = slices[i].max
    let rate = slices[i].rate
    let delta = slices[i].delta

    if (income > min && income < max) {
      subResult = (income - min) * rate;
      resultsArray.push(parseInt(subResult))
    } else if (income > delta) {
      subResult = (max - min) * rate;
      resultsArray.push(parseInt(subResult))
    } else {
      subResult = 0;
      resultsArray.push(parseInt(subResult));
    }
  }

  return resultsArray;
}

function calcTaxable() {
  let resultsArray = loopThroughSlices(slices, income)
  return taxable = resultsArray.reduce(reducer)
}

function calcTaxableWithQuotient(quotient) {
  let incomeWithQuotient = parseInt(income / quotient);
  let resultsArray = loopThroughSlices(slices, incomeWithQuotient);
  let reducedArray = resultsArray.reduce(reducer)
  return reducedArray * quotient;
}

// const result = calcTaxable(income, slices);
// console.log("Pour l'année en cours, vous devez %s € aux impôts", result);

/**
 * Ne pas cumuler les deux console.log ;-)
 */

const resultWithQuotient = calcTaxableWithQuotient(quotient);
console.log(`Avec un quotient familial de ${quotient}, avec ${income} € de revenus, vous devez ${resultWithQuotient} € aux impôts`);