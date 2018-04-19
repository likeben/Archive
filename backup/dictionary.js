export class Dictionary {
  constructor(rawData = [], treeData = []) {
    this.rawData = rawData;
    this.treeData = treeData;
    this.cache = new Map();
  }

  getIn(...path) {
    const { cache, treeData } = this;
    if (cache.size === 10) {
      cache.clear();
    }
    const p = path[0];
    const pathArr = typeof p === 'string' ? path : Array.isArray(p) ? p : [];
    const key = JSON.stringify(pathArr);
    if (!cache.has(key)) {
      const result = pathArr.reduce(
        (arr, value) => {
          const item = arr.find(it => it.value === value);
          if (!item) {
            return item;
          }
          const { children } = item;
          if (!children) {
            return item.name;
          }
          return children;
        },
        treeData,
      );
      cache.set(key, result);
    }
    return cache.get(key);
  }

  searchByName(keywords = null) {
    const { rawData, treeData } = this;
    if (!keywords) return treeData;
    return rawData.filter(it => it.name.includes(keywords.name));
  }
}