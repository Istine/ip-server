const flattenObj = (obj = {}) => {
  const keys = Object.keys(obj);
  let flat = {};
  for (let key of keys) {
    if (typeof obj[key] === "object" && obj[key] !== null && !!obj[key]) {
      let nestedObj = flattenObj(obj[key]);
      flat = { ...flat, ...nestedObj };
    } else {
      if (Array.isArray(obj[key])) {
        const curr = obj[key];
        for (let val of curr) {
          if (typeof val[key] === "object" && val[key] !== null && !!val[key]) {
            let nestedObj = flattenObj(obj[key]);
            flat = { ...flat, ...nestedObj };
          } else flat[key] = obj[key];
        }
      } else flat[key] = obj[key];
    }
  }

  return flat;
};
module.exports = { flattenObj };
