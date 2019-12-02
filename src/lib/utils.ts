const RUN_ASSERTS = true;

export const isString = (s: unknown): s is string => {
  return typeof s === 'string';
};

export const isFunction = (f: unknown): f is Function => {
  return typeof f === 'function';
};

export const isInteger = (n: unknown): n is number => {
  return typeof n === 'number' && isFinite(n) && Math.floor(n) === n;
};

export const throttle = (f: Function, interval: number, scope?: unknown) => {
  let timeout = 0;
  let shouldFire = false;
  let args: unknown[] = [];

  const fire = function() {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    timeout = window.setTimeout(handleTimeout, interval);
    f.apply(scope, args);
  };

  const handleTimeout = function() {
    timeout = 0;
    if (shouldFire) {
      shouldFire = false;
      fire();
    }
  };

  return function(..._args: unknown[]) {
    args = _args;
    if (!timeout) {
      fire();
    } else {
      shouldFire = true;
    }
  };
};

// function debounce (f, interval, scope) {
//   var timeout = 0
//   return function (_args) {
//     window.clearTimeout(timeout)
//     var args = arguments
//     timeout = window.setTimeout(function () {
//       f.apply(scope, args)
//     }, interval)
//   }
// }

export const uuid = () => {
  return 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/x/g, function() {
    const r = (Math.random() * 16) | 0;
    return r.toString(16);
  });
};

export const deepCopy = (thing: unknown) => {
  return JSON.parse(JSON.stringify(thing));
};

export const interpolateTemplate = (str: string, obj: object) => {
  for (const [key, value] of Object.entries(obj)) {
    const keyTemplateStr = '{' + key + '}';
    while (str.includes(keyTemplateStr)) {
      str = str.replace(keyTemplateStr, value);
    }
  }
  return str;
};

if (RUN_ASSERTS) {
  console.assert(interpolateTemplate('abc', {a: 'x'}) === 'abc');
  console.assert(interpolateTemplate('{a}bc', {}) === '{a}bc');
  console.assert(interpolateTemplate('{a}bc', {p: 'q'}) === '{a}bc');
  console.assert(interpolateTemplate('{a}bc', {a: 'x'}) === 'xbc');
  console.assert(interpolateTemplate('{a}bc{a}bc', {a: 'x'}) === 'xbcxbc');
  console.assert(interpolateTemplate('{a}{a}{b}', {a: 'x', b: 'y'}) === 'xxy');
}