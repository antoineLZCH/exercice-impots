let income = 70000;
let quotient;
let subResult;
const results = []
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

function calcTaxable(income, slices) {
  for (let i = 0; i < slices.length; i++) {
    let min = slices[i].min
    let max = slices[i].max
    let rate = slices[i].rate
    let delta = slices[i].delta

    if (income > min && income < max) {
      subResult = (income - min) * rate;
      results.push(parseInt(subResult))
    } else if (income > delta) {
      subResult = (max - min) * rate;
      results.push(parseInt(subResult))
    } else {
      subResult = 0;
      results.push(parseInt(subResult));
    }
  }
  return taxable = results.reduce((acc, curr) => {
    return acc + curr;
  })
}

const result = calcTaxable(income, slices);
console.log("Pour l'année en cours, vous devez %s € aux impôts", result);