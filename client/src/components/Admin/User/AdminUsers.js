import React from "react";
import UserSearchBar from "./UserSearchBar";
import UserModal from "./UserModal";

const AdminUsers = props => {
  if (props.data.loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="admin-page">
      <p>Users</p>
      <div className="search_bar_wrapper">
        <button className="add_button" type="button" onClick={props.openModal}>
          + user
        </button>
        <UserSearchBar
          searchTerm={props.searchTerm}
          updateSearchTerm={props.updateSearchTerm}
          users={props.data.users}
          updateUser={props.updateUser}
          delete={props.delete}
        />
      </div>
      <br />
      <br />
      <div className={props.showModal ? "openModal" : "closeModal"}>
        <span id="x" onClick={props.closeModal}>
          &times;
        </span>
        <UserModal
          firstName={props.firstName}
          lastName={props.lastName}
          email={props.email}
          neighborhood={props.neighborhood}
          password={props.password}
          verifyPassword={props.verifyPassword}
          closeModal={props.closeModal}
          updateFieldValue={props.updateFieldValue}
          resetFields={props.resetFields}
          addUser={props.addUser}
        />
      </div>
    </div>
  );
};
export default AdminUsers;
