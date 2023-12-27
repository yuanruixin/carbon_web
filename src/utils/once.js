export function once(fn) {
  let done = false;
  
  return function() {
    if (!done) {
      done = true;
      fn.apply(this, arguments);
    }
  };
}