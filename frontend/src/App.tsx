import React, { createContext, FC, useEffect } from "react"
import AuthForm from "./components/AuthForm"
import Store from "./store/Store"
import { observer } from "mobx-react-lite"

interface MobxStore {
  store: Store
}
const store = new Store()
export const Context = createContext<MobxStore>({
  store
})
const App:FC = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth()
    }
  }, [])

  return (
    <div>
      <Context.Provider value={{ store }}>
        {store.isAuth ?
          <div>
            {store.user.email}
            <button onClick={() => store.logout()}>logout</button>
            <button onClick={() => store.getUsers()}>get users</button>
            {store.users.map(item => {
                return <div>{item.email}</div>
              })
            }
          </div>
          : <AuthForm />
        }
      </Context.Provider>
    </div>
  )
}

export default observer(App)