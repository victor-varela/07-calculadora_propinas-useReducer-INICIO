import { useReducer, useRef, useEffect } from "react";
import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrderTotals from "./components/OrderTotals";
import TipPercentageForm from "./components/TipPercentageForm";
import { menuItems } from "./data/db";
import { initialState, orderReducer } from "./reducers/order-reducer";

function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (state.sent && headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      dispatch({ type: "reset-sent" });
    }, 3000);
  }, [state.sent]);

  return (
    <>
      <header className=" bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de Propinas y Consumo</h1>
      </header>

      <main className=" max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="font-black text-4xl">Menú</h2>

          <div className="mt-10 space-y-3">
            {menuItems.map(item => (
              <MenuItem key={item.id} item={item} dispatch={dispatch} />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10" ref={headerRef}>
          {state.order.length ? (
            <>
              <OrderContents order={state.order} dispatch={dispatch} />
              <TipPercentageForm tip={state.tip} dispatch={dispatch} />
              <OrderTotals order={state.order} tip={state.tip} dispatch={dispatch} />
            </>
          ) : (
            <>
              {state.sent === true ? (
                <p className="text-center bg-green-500 text-xl border-2 rounded-md text-white p-4">
                  La orden se envio correctamente
                </p>
              ) : (
                <p className="text-center">La orden esta vacia</p>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;

/*
  Para pasar de un custom hook a un reducer, primero se crea el archivo use'nombreDelReducer'-reducer.ts
  Luego se hace el esqueleto del reducer: action, initialState, reducerState --> ver archivo useOrder-reducer.ts

  Despues de creado el esqueleto del reducer. Se crea el reducer aca en App.tsx
   const [state, action] = useReducer(orderReducer, initialState)



*/
