export const actionTypes = {
  SEARCH: 'SEARCH',
  DATA: 'DATA',
  CART: 'CART',
}

export function search(data) {
  return {
    type: actionTypes.SEARCH,
    payload:data,
  }
}

export function data(data) {
  return {
    type: actionTypes.DATA,
    payload:data,
  }
}
export function cart(data) {
  return {
    type: actionTypes.CART,
    payload:data,
  }
}
