import React, { useState, useEffect } from "react";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); 

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const headingStyles = {
    background: "green",
    color: "white",
    fontSize: "18px",
  };

  const tableStyles = {
    borderCollapse: "collapse",
    width: "100%",
  };

  const tdStyles = {
    border: "1px solid #dddddd",
    padding: "8px",
    textAlign: "left",
  };

  const thStyles = {
    border: "1px solid #dddddd",
    padding: "8px",
    textAlign: "left",
  };

  const paginationStyles = {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const buttonStyles = {
    background: "green",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    margin: "0 10px",
  };

  return (
    <div>
      <table style={tableStyles}>
        <thead style={headingStyles}>
          <tr>
            <th style={thStyles}>ID</th>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>Email</th>
            <th style={thStyles}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td style={tdStyles}>{user.id}</td>
              <td style={tdStyles}>{user.name}</td>
              <td style={tdStyles}>{user.email}</td>
              <td style={tdStyles}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={paginationStyles}>
        <button
          style={buttonStyles}
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
        >
          Previous
        </button>
        <span
          style={{
            background: "green",
            padding: "5px 10px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          {currentPage}
        </span>
        <button
          style={buttonStyles}
          onClick={() =>
            paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
