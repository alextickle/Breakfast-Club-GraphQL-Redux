import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher';

class UserStore extends EventEmitter{
  constructor(){
    super()
    this.fields = {}
  }

  getFields(){
    return this.fields
  }

  // Updates the VM after a user action
  updateUser(attributes){
    this.user = attributes
    // console.log('this is the user info entered into updateUser from editUser: ', this.user)
    // localStorage.setItem('authToken', this.user.authToken);
    // localStorage.setItem('authTokenExpiration', this.user.authTokenExpiration);
    // localStorage.setItem('firstName', this.user.firstName);
    // localStorage.setItem('lastName', this.user.lastName);
    // localStorage.setItem('email', this.user.email);
    // localStorage.setItem('neighborhood', this.user.neighborhood);
    // localStorage.setItem('voted', this.user.voted);
    // localStorage.setItem('rsvp', this.user.rsvp);
    // localStorage.setItem('id', this.user.id);
    // localStorage.setItem('active', this.user.active);
    // store user credentials 'authToken, expire and email' locally in user browser.
    this.emit('change')
  }

  // setUserFromLocal(){
  //   console.log("UserStore - setUserFromLocal...");
  //   let token = localStorage.getItem('authToken');
  //   let expire = new Date(localStorage.getItem('authTokenExpiration'));
  //     if(token && expire >= new Date()){
  //       this.user ={
  //         authToken: token,
  //         authTokenExpiration: expire,
  //         firstName: localStorage.getItem('firstName'),
  //         lastName: localStorage.getItem('lastName'),
  //         email: localStorage.getItem('email'),
  //         neighborhood: localStorage.getItem('neighborhood'),
  //         voted: localStorage.getItem('voted'),
  //         rsvp: localStorage.getItem('rsvp'),
  //         id: localStorage.getItem('id'),
  //         active: localStorage.getItem('active')
  //       }
  //       this.emit('logged-in')
  //
  //     console.log("UserStore - setUserFromLocal - this.user: ", this.user);
  //   }
  // }

  // logout(){
  //    this.user = null
  //    localStorage.setItem('authToken', null);
  //    localStorage.setItem('authTokenExpiration', null);
  //    localStorage.setItem('firstName', "");
  //    localStorage.setItem('lastName', "");
  //    localStorage.setItem('email', "");
  //    localStorage.setItem('neighborhood', "")
  //    localStorage.setItem('voted', false)
  //    this.emit('logged-out')
  //  }
  //

  checkLogin(){
    return this.fields.authToken !== null
  }

  clearAuthToken(){
    this.fields.authToken = null
    this.emit('change')
  }

  handleActions(action){
    switch(action.type){
      // case("EDIT_USER"):{
      //   this.updateUser(action.user)
      //   break
      // }
      // case("UPDATE_USER"):{
      //   // this.updateUser(action.user)
      //   this.message = action.message;
      //   this.emit("User Updated")
      //   break
      // }
      case("UPDATE_USER"):{
        this.updateUser(action.attributes)
        // this.message = "User Created"
        // this.emit("User Created")
        break
      }
      // case("VOTE-REGISTERED"):{
      //   this.updateUser(action.data.user);
      //   break;
      // }
      // case("LOGIN"):{
      //   this.updateUser(action.user)
      //   this.message = "User Logged In"
      //   this.emit('login-success')
      //   break
      // }
      // case("ADMIN-LOGIN"):{
      //   this.updateUser(action.user)
      //   this.message = "Admin Logged In"
      //   this.emit('admin-login')
      //   break
      // }
      // case("CHECK_LOGIN"):{
      //   this.setUserFromLocal()
      //   break
      // }
      // case("LOGIN_FAIL"):{
      //   this.emit('login-fail')
      //   break
      // }
      case("LOGOUT"):{
        this.clearAuthToken()
        break
      }
      // case("EVENT-CREATED"):{
      //   this.updateUser(action.data.user)
      //   this.emit('voted set to false')
      //   break
      // }

      default:{}
    }
  }
}

const userStore = new UserStore()
dispatcher.register(userStore.handleActions.bind(userStore))
window.userStore = userStore
export default userStore
