import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://react-eshop-redux-default-rtdb.firebaseio.com/cart.json');
      if(!response.ok){
        throw new Error('Something went wrong..');
      }
      const data = await response.json();
      return data;
    }
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items:cartData.items || [],
        totalAmount:cartData.totalAmount,
        totalQuantity:cartData.totalQuantity,
      }));

    } catch(error) {
      dispatch(uiActions.showNotification({
        status:"error",
        message:"fetching Cart Data failed!",
        title:"Error"
      }))
    }
  }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status:"pending",
            message:"Sending Cart Data!",
            title:"Sending..."
          }))          
          const sendRequest = async () => {
              const response = await fetch('https://react-eshop-redux-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                body:JSON.stringify({
                  items:cart.items,
                  totalAmount:cart.totalAmount,
                  totalQuantity:cart.totalQuantity
                })
              });
              if(!response.ok){
                throw new Error('Something went wrong..');
              }
          }
          try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status:"success",
                message:"Sending Cart Data successfully!",
                title:"Success..."
             }))
          } catch(error) {
            dispatch(uiActions.showNotification({
                status:"error",
                message:"Sending Cart Data failed!",
                title:"Error"
              }))
          }           
    }
}