


const addZeros = (data: unknown) => {
  return String(data || '').padStart(2, '0');
};


export {
  addZeros
};
