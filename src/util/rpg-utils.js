const rollDice = (sides, qty=1) => {
  const minRoll = 1;
  const rolls = [];
  let total = 0;
  for (let i = 0; i < qty; i++) {
    const result = Math.floor(Math.random() * (sides - minRoll + 1) + minRoll)
    rolls.push(result);
    total += result;
  }
  return {rolls, total}
}

export {rollDice}