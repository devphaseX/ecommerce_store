import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type ProductData } from '../../components/ProductList/type';

type CartState = {
  items: Partial<Record<CartItem['id'], ItemCartInfo>>;
  totalCost: number;
  totalItemUnits: number;
};

interface ItemCartInfo extends CartItem {
  quantity: number;
  totalPrice: number;
}

type CartItem = Pick<ProductData, 'id' | 'price' | 'imgUrl' | 'productName'>;

interface NewItemPayload extends PayloadAction<CartItem> {}

interface RemoveItemPayload
  extends PayloadAction<{ id: string; mode: 'all' | number }> {}

const getInitialState = (): CartState => ({
  items: {},
  totalCost: 0,
  totalItemUnits: 0,
});

type CartResultInfo = Omit<CartState, 'items'>;
const computeCartItemInfo = (items: CartState['items']) => {
  const cartInfo: CartResultInfo = {
    totalCost: 0,
    totalItemUnits: 0,
  };

  (Object.values(items) as Array<ItemCartInfo>).forEach(
    ({ totalPrice, quantity }) => {
      cartInfo.totalCost += totalPrice;
      cartInfo.totalItemUnits += quantity;
    }
  );

  return cartInfo;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(),
  reducers: {
    addItem: (draftState, { payload }: NewItemPayload) => {
      let itemInfo = draftState.items[payload.id];

      if (!itemInfo) itemInfo = { ...payload, quantity: 0, totalPrice: 0 };

      const { price: itemPrice } = payload;
      itemInfo.quantity += 1;

      itemInfo.price += itemPrice;

      ({
        totalCost: draftState.totalCost,
        totalItemUnits: draftState.totalItemUnits,
      } = computeCartItemInfo(draftState.items));

      draftState.items[payload.id] = itemInfo;
    },

    removeItem: (draftState, { payload }: RemoveItemPayload) => {
      let itemInfo = draftState.items[payload.id];
      if (!itemInfo) return;

      let mode =
        payload.mode !== 'all'
          ? itemInfo.quantity - payload.mode < 1
            ? 'all'
            : null
          : payload.mode;

      if (mode === 'all') {
        delete draftState.items[payload.id];

        if (Object.keys(draftState.items).length === 0) {
          return getInitialState();
        }
      } else {
        itemInfo.quantity -= payload.mode as number;
        itemInfo.totalPrice -= itemInfo.price;
      }
      ({
        totalCost: draftState.totalCost,
        totalItemUnits: draftState.totalItemUnits,
      } = computeCartItemInfo(draftState.items));
    },

    clear: () => getInitialState(),
  },
});

export const { actions: cartActions, reducer: cartReducer } = cartSlice;
