export const getLayouts = () => {};

export const formatter = (data, parentAuthority) => {
  if (!data) {
    return undefined;
  }

  return data.map((item) => {
    const { redirect, authority, routes } = item;
    if (redirect) {
      return item;
    }
    const formattedItem = {
      ...item,
      authority: authority || parentAuthority,
    };
    if (routes) {
      formattedItem.routes = formatter(routes, formattedItem.authority);
    }
    return formattedItem;
  });
};
