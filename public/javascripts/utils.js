const locateNode = (currentElement, id) => {
  const currentId = currentElement.getAttribute('class');
  if (id === currentId) return currentElement;
  return locateNode(currentElement.parentNode, id);
};

const debounce = (fn, delay) => {
  let timer;
  return function(...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(_ => fn.apply(context, args), delay);
  };
};
