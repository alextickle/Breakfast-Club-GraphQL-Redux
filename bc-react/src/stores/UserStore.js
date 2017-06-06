import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher';

class UserStore extends EventEmitter{
  constructor(){
    super()
    this.user = null
    this.message = ""
  }

  getUser(){
    return this.user
  }

  updateUser(attributes){
    this.user = attributes
  }

  handleActions(action){
    switch(action.type){
      case("SIGNUP"):{
        this.updateUser(action.user)
        this.message = "User Created"
        this.emit('message')
        break
      }
      default:{}
    }
  }
}
const store = new UserStore()
Dispatcher.register(store.handleActions.bind(store))
window.user_store = store
export default store
