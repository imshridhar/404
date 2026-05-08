import React from "react";
const issues=[
  {id:1,title:"Login Issue",description:"Button not working",status:"open"},
  {id:2,title:"UI Bug",description:"Alignment Problem",status:"closed"},
];

function App() {
  return(
    <div>
      <h1>Issue Tracker</h1>
      {issues.map((issue)=>(
        <div key={issue.id}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p>{issue.status}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}
export default App