import { MenuItem, OrderItem } from "../types";

// paso 1
export type OrderActions =
  | { type: "add-item"; payload: { item: MenuItem } }
  | { type: "remove-item"; payload: { id: MenuItem["id"] } }
  | { type: "place-order" }
  | { type: "define-tip"; payload: { value: number } };

// paso 3 -> Aca se declaran tipos
export type OrderState = {
  order: OrderItem[];
  tip: number;
};

// paso 2 -> Aca se asignan valores
export const initialState: OrderState = {
  order: [],
  tip: 0,
};

// paso 4
export const orderReducer = (state: OrderState = initialState, action: OrderActions) => {
  if (action.type === "add-item") {
    let order: OrderItem[];

    const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id);
    if (itemExist) {
      order = state.order.map(orderItem =>
        orderItem.id === action.payload.item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem
      );
    } else {
      const newItem = { ...action.payload.item, quantity: 1 };
      order = [...state.order, newItem];
    }
    return {
      ...state,
      order,
    };
  }

  if (action.type === "remove-item") {
    const order = state.order.filter(item => item.id !== action.payload.id);

    return {
      ...state,
      order,
    };
  }

  if (action.type === "place-order") {
    return {
      ...state,
    };
  }

  if (action.type === "define-tip") {
    return {
      ...state,
      tip: action.payload.value
    };
  }

  return state;
};

/*
    Tomamos las funciones del hook y las pasamos al reducer.
    1.- Crear el type de acciones del reducer
    2.- Definimos el initialState- Vemos como es el state (cuantos useState usamos en el hook)

        const [order, setOrder] = useState<OrderItem[]>([])
        const [tip, setTip] = useState(0)

    cuando usamos useState, le asignamos un valor inicial, bueno eso mismo es lo que hacemos en el reducer

    3.- Cascada de tipos: en este punto ya difinimos el initialState, pero NO hemos definido el type de ese initialState, es por eso que volvemos arriba en el codigo y lo definimos. Por ello ves que initialState tiene tipo ' : ' OrderState

    4.- Creamos la funcion reducer, como parametros siempre son state: OrderState (volvemos a indicar el tipo aca) y el segundo parametro es action de tipo OrderACtions. Siempre al final va el return state (ese es por defecto)
    Cada accion tiene un retrurn{...state} por defecto.

    Asi se arma el esqueleto
    


*/
