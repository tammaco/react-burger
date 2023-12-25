export const getConstructorItems = store => store.bconstructor.items;
export const getBun = store => store.bconstructor.bun;
export const getTotalCost = store => store.bconstructor.orderDetails.reduce(function (a, b) { return a + parseInt(b.price) * b.quantity }, 0);
export const getOrderDetails = store => store.bconstructor.orderDetails;
export const getUser = store => store.bconstructor.user;
export const getIsAuthChecked = store => store.bconstructor.isAuthChecked;