class UserDTO {
  constructor(user) {
    this.email = user.email
    this.isActivated = user.isActivated
    this.id = user._id
  }
}

export default UserDTO