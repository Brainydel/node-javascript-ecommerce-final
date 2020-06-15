import { getUserInfo } from './localStorage.js';

export const parseRequestURL = () => {
  const url = document.location.hash.slice(1).toLowerCase() || '/';
  const r = url.split('/');

  return {
    resource: r[1],
    id: r[2],
    verb: r[3],
  };
};
export const rerender = async (component, areaName = 'content') => {
  const area = document.getElementById(`${areaName}_container`);
  area.innerHTML = await component.render();
  await component.after_render();
  console.log('render');
};

export const redirectUser = () => {
  if (localStorage.getItem('cartItems')) {
    document.location.hash = '/shipping';
  } else {
    document.location.hash = '/';
  }
};
export const isLoggedIn = () => {
  return !!getUserInfo().email;
};
