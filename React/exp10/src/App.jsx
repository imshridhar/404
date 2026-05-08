
import React, { Component } from "react";
class DataFetcher extends Component {
  state = { data: [], search: "", loading: false, error: null };
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) this.fetchData();
  }
  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
        );
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      this.setState({ data, loading: false });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  };
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h2>React Lifecycle Methods with API Data Fetching</h2>
        <input
          placeholder="Search user..."
          value={this.state.search}
          onChange={(e) => this.setState({ search: e.target.value })}
        />
        <button onClick={this.fetchData}>Refresh</button>
        {this.state.loading && <p>Loading...</p>}
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
        {!this.state.loading && this.state.data.length === 0 && <p>No data</p>}
        <table border="1" style={{ marginTop: 10 }}>
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
      </div>
    );
  }
}
export default function App() {
  return <DataFetcher />;
}