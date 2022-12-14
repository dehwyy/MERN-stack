import { AxiosResponse } from "axios"
import $api from "../http/config"

export interface IUser {
  email: string
  isActivated: boolean
  id: string
}

interface authResponse{
  refreshToken: string
  accessToken: string
  data: IUser
}

export default class Auth {
  static async login(email: string, password: string): Promise<AxiosResponse<authResponse>> {
    return $api.post<authResponse>("/login", {email, password})
  }
  static async registration(email: string, password: string): Promise<AxiosResponse<authResponse>> {
    return $api.post<authResponse>("/registration", {email, password})
  }
  static async logout(): Promise<void> {
    return $api.post("/logout")
  }
}