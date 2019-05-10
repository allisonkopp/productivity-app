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

// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ('withCredentials' in xhr) {
//     // Check if the XMLHttpRequest object has a "withCredentials" property.
//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != 'undefined') {
//     // Otherwise, check if XDomainRequest.
//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     // Otherwise, CORS is not supported by the browser.
//     xhr = null;
//   }
//   return xhr;
// }
