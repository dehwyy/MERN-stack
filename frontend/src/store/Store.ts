import Auth, { IUser } from "../services/auth"
import { makeAutoObservable } from "mobx"
import axios from "axios"
import {api_url} from "../http/config"
import UserService from "../services/userService"

export default class Store {
  user = {} as IUser
  users = [] as IUser[]
  isAuth = false

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(auth: boolean) {
    this.isAuth = auth
  }
  setUser(user: IUser) {
    this.user = user
  }
  setUsers(users: IUser[]) {
    this.users = users
  }
  async login(email: string, password: string) {
    try {
      const response = await Auth.login(email, password)
      console.log(response)
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.data)
      console.log(this.user, this.isAuth)
    } catch (e) {
      console.log(e)
    }
  }
  async registration(email: string, password: string) {
    try {
      const response = await Auth.registration(email, password)
      console.log(response)
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  async logout() {
    try {
      const response = await Auth.logout()
      localStorage.removeItem("token")
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e) {
      console.log(e)
    }
  }
  async checkAuth() {
    try {
      const response = await axios.get(`${api_url}/refresh`, {withCredentials: true})
      console.log(response)
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e)
    }
  }
  async getUsers() {
    try {
      const response = await UserService.getUsers()
      console.log(response)
      this.setUsers(response.data)
    } catch (e) {

    }
  }
}