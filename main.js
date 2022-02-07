// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate(dna) {
      let randIndex = Math.floor(Math.random() * this.dna.length); 
      while (this.dna[randIndex] === returnRandBase()) {
        returnRandBase();
      }
      this.dna.splice(this.dna[randIndex], 1, returnRandBase());
      return this.dna;      
    },
    compareDNA(pAequor) {
      let matchs = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          matchs ++;
        }
      }
      let percent = Math.floor((matchs / this.dna.length) * 100);
      console.log(`Specimen ${this.speimenNum} and specimen ${pAequor.specimenNum} have ${percent}% in common`);
    },
    willLikelySurvive(dna) {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          count ++;
        }
      }
      let totalPercent = count / this.dna.length;
      if (totalPercent > 0.6) {
        return true;
      } else {
        return false;
      }
    },

  }
}

const pAequorSpecimens = [];
let count = 1;

while (pAequorSpecimens.length < 30) {
  let newSpecimen = pAequorFactory(count, mockUpStrand());
  if (newSpecimen.willLikelySurvive()) {
    pAequorSpecimens.push(newSpecimen);
  }
  count++;
}

console.log(pAequorSpecimens)


