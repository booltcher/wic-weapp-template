export const deepClone = (obj) => {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port2.onmessage = (ev) => resolve(ev.data);
    port1.postMessage(obj);
  });
};

export const treelization = (items, id = null, link = "parent_id") =>
  items
    .filter((item) => item[link] === id)
    .map((item) => ({ ...item, children: treelization(items, item.id) }));

export const flatten = (source) => {
  const result = [];
  const iterator = (source) => {
    return source.forEach((item) => {
      result.push(item);
      if (!item.children) return false;
      iterator(item.children);
    });
  };
  iterator(source);
  return result;
};
