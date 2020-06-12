export const parseRequestURL = () => {
  let url = location.hash.slice(1).toLowerCase() || '/';
  let r = url.split('/');
  let request = {
    resource: null,
    id: null,
    verb: null,
  };
  request.resource = r[1];
  request.id = r[2];
  request.verb = r[3];

  return request;
};
export const rerender = async (component, areaName = 'content') => {
  const area = null || document.getElementById(`${areaName}_container`);
  area.innerHTML = await component.render();
  await component.after_render();
  console.log('render');
};
