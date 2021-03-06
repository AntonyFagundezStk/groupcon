import React from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading";
const CreateGroupForm = ({ group, onChange, onSubmit, create, loading }) => {
  let buttonTitle = create ? "CREATE" : "UPDATE";

  const renderPasswordUpdate = () => {
    console.log(group);
    if (create) {
      return (
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            name="password"
            placeholder="password"
            value={group ? group.password : ""}
            disabled={loading}
          />
        </div>
      );
    } else {
      return (
        <>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              name="oldPassword"
              placeholder="Old password"
              value={group ? group.oldPassword : ""}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              name="password"
              placeholder="new password"
              value={group ? group.password : ""}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              name="newPassword"
              placeholder="Confirm new password"
              value={group ? group.newPassword : ""}
              disabled={loading}
            />
          </div>
        </>
      );
    }
  };
  return (
    <div className="row mb-5">
      <div className="col-md-8 ml-auto mr-auto w-100">
        <Link to="/dashboard" className="btn btn-primary mb-2">
          {" "}
          <i className="fa fa-chevron-left"></i> Back to Dashboard
        </Link>

        <form onSubmit={onSubmit}>
          <div className="card">
            <div className="card-header bg-primary">
              <h3 className="text-white text-center">
                {create ? "Create a new group!" : "Update the group!"}
              </h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChange}
                  name="name"
                  placeholder="Group Name"
                  value={group ? group.name : ""}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={onChange}
                  name="url"
                  placeholder="Group URL"
                  value={group ? group.url : ""}
                  disabled={loading}
                />
              </div>
              {renderPasswordUpdate()}
            </div>
            <div className="card-footer">
              <div className="form-group">
                <button
                  type="submit"
                  className="form-control btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? <Loading /> : buttonTitle}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupForm;
