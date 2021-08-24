const getType = () => {
  return document.querySelector('ul.subnav li.active').innerHTML.toLowerCase();
};