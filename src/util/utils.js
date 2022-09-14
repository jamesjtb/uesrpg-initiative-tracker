import { v4 as uuid } from 'uuid';

export { uuid };

export const rollDice = (sides, qty=1) => {
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

export const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const openChildWindow = async (path, opts) => {
    // Figure out the best center coords to put the child window, but only if positions are not given.
    if (!opts.x && !opts.y) {
        const newChildDimensions = {
            width: opts.width || 800,
            height: opts.height || 600,
        };

        const parentMiddlePoint = {
            x: window.screenX + (window.outerWidth / 2),
            y: window.screenY + (window.outerHeight / 2),
        };

        opts.x = parentMiddlePoint.x - newChildDimensions.width / 2;
        opts.y = parentMiddlePoint.y - newChildDimensions.height / 2;
    }
    let optsString = '';
    for (const key in opts) {
        optsString += `${key}=${opts[key]},`;
    }
    window.open(path, '_blank', optsString);
};
