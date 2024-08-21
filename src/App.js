import React, { useState } from "react";
import "./App.css";

function App() {
  const [table, setTable] = useState([
    { id:1 ,name: "shravan", age: "21", role: "SDE", score: 10 },
    { id:2 ,name: "guru", age: "22", role: "Full stack developer", score: 8 },
  ]);
  const [editable, setEditable] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  const [Row, setRow] = useState({});
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState({ name: "", min: "", max: "" });
  const [addDisabled, setAddDisabled] = useState(false);

  const handleAddClick = () => {
    setTable([
      ...table,
      { id: Date.now(), name: "", age: "", role: "", score: null },
    ]);
  };

  const handleInputChange = (field, value) => {
    setRow({ ...Row, [field]: value });
  };
  const handleSaveClick = () => {
    setTable([
      ...table.map((row) => (row.id === Row.id ? { ...Row } : { ...row })),
    ]);

    setEditable(false);
    setEditableRow("");
  };

  let filteredtable = table.filter((row) => {
    return (
      row.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.min === "" || parseFloat(row.score) >= parseFloat(filters.min)) &&
      (filters.max === "" || parseFloat(row.score) <= parseFloat(filters.max))
    );
  });

  return (
    <div className="App">
      <header>
        <div>Table</div>
        <div className="filter">
          <button onClick={() => setOpenFilters(!openFilters)}>Filters</button>
          {openFilters && (
            <div className="filters">
              <h3>Filters</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setOpenFilters(false);
                }}
              >
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) =>
                      setFilters({ ...filters, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="min">Minimum Score</label>
                  <input
                    type="text"
                    value={filters.min}
                    onChange={(e) =>
                      setFilters({ ...filters, min: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="max">Maximum Score</label>
                  <input
                    type="text"
                    value={filters.max}
                    onChange={(e) =>
                      setFilters({ ...filters, max: e.target.value })
                    }
                  />
                </div>
                <div className="apply_button">
                  <button
                    // type="clear"
                    onClick={() => {
                      setFilters({name: "", max:"",min:""});
                      setAddDisabled(false);
                    }}
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => {
                      (filters.name || filters.max || filters.min) &&
                        setAddDisabled(true);
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </header>
      <main>
        <table border={2}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Job</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredtable.map(
                  (row) =>
                    // <div key={row.id}>
                    editable && editableRow === row.id ? (
                      <tr key={row.id}>
                        <td>
                          <input
                            type="text"
                            value={Row.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            editable
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={Row.age}
                            onChange={(e) =>
                              handleInputChange("age", e.target.value)
                            }
                            editable
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={Row.role}
                            onChange={(e) =>
                              handleInputChange("role", e.target.value)
                            }
                            editable
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={Row.score}
                            onChange={(e) =>
                              handleInputChange("score", e.target.value)
                            }
                            editable
                          />
                        </td>
                        <td>
                          <div className="action">
                            <button onClick={handleSaveClick}>Save</button>
                            <button disabled>Edit</button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.age}</td>
                        <td>{row.role}</td>
                        <td>{row.score}</td>
                        <td>
                          <div className="action">
                            <button
                              onClick={() =>setTable(table.filter((tableRow) => tableRow.id !== row.id))}>
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                setEditable(true);
                                setEditableRow(row.id);
                                setRow(row);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  // </div>
                )}
          </tbody>
        </table>
      </main>
      <footer>
        <button onClick={handleAddClick} disabled={addDisabled}>
          Add
        </button>
      </footer>
    </div>
  );
}

export default App;
