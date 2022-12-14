import { IUser } from "./auth"
import $api from "../http/config"
import { AxiosResponse } from "axios"

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    const resp = await $api.get("/")
    return resp
  }
}