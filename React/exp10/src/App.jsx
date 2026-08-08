import React, { Component } from "react";
class DataFetcher extends Component {
  state = {
    data: [],
    loading: false
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    this.setState({ loading: true });
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = await res.json();
    this.setState({ data, loading: false });
  };
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h2>API Data Fetching</h2>
        <button onClick={this.fetchData}>
          Refresh
        </button>
        {this.state.loading ? (
          <p>Loading...</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
export default function App() {
  return <DataFetcher />;
}