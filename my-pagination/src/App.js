import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    try {
      const resp = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await resp.json();
      setDetails(data);
    } catch (err) {
      alert("failed to fetch data");
    }
  };

  const handleDecrement = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
  };

  const handleIncrement = () => {
    if (page === Math.ceil(details.length / 10)) return;
    setPage((page) => page + 1);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="App">
        <h3>Employee Data Table</h3>
        <table className="table">
          <thead className="flex-container">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          {details.slice((page - 1) * 10, page * 10).map((detail, index) => (
            <tbody key={index}>
              <tr>
                <td>{detail.id}</td>
                <td>{detail.name}</td>
                <td>{detail.email}</td>
                <td>{detail.role}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="buttons">
        <button type="button" onClick={handleDecrement}>
          Previous
        </button>
        <div>{page}</div>
        <button type="button" onClick={handleIncrement}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;