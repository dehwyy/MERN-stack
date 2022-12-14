import React, { FC, useContext, useState } from "react"
import {Context} from "../App"
import {observer}  from "mobx-react-lite"

const AuthForm:FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {store} = useContext(Context)


  return (
    <div>
      <input
        type='text'
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='text'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={() => store.login(email, password)}>LOGIN</button>
      <button onClick={() => store.registration(email, password)}>REGISTRATION</button>
    </div>
  )
}

export default observer(AuthForm)