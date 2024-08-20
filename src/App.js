import React ,{ useState } from "react";
import "./App.css";

function App() {
  const [table, setTable] = useState([
    { id:1 ,name: "shravan", age: "21", role: "SDE", score: 10 },
    { id:2 ,name: "guru", age: "22", role: "Full stack developer", score: 8 },
  ]);
  const [editable, setEditable] = useState(false);
  const [editableRow, setEditableRow] = useState("");
  const [Row, setRow] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState([]);
  const [applyFilters, setApplyFilters] = useState(false);
  const [filteredTable, setFilteredTable] = useState([]);
  const [addDisabled, setAddDisabled] = useState(false);

  const handleAddClick = () => {
    setTable([
      ...table,
      { id: table.length, name: "name", age: "age", role: "role", score: 0 },
    ]);
  };

  const handleInputChange = (field, value) => {
    setRow({ ...Row, [field]: value });
  };
  const handleSaveClick = () => {
    console.log(Row);
    setTable([
      ...table.map((row) => (row.id === Row.id ? { ...Row } : { ...row })),
    ]);

    setEditable(false);
    setEditableRow("");
  };

  return (
    <div className="App">
      <header>
        <div>Table</div>
        <div className="filter">
          <button onClick={() => setOpenFilters(!openFilters)}>Filters</button>
          {openFilters && (
            <div className="filters">
              <div>Filters</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFilteredTable(
                    table.filter((row) => {
                      return (
                        (filters.name ? row.name === filters.name : true) &&
                        (filters.age ? row.age === filters.age : true) &&
                        (filters.role ? row.role === filters.role : true) &&
                        (filters.score ? row.score === filters.score : true)
                      );
                    })
                  );
                  setApplyFilters(true);
                  setOpenFilters(false);
                  setAddDisabled(true);
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
                  <label htmlFor="age">Age</label>
                  <input
                    type="text"
                    value={filters.age}
                    onChange={(e) =>
                      setFilters({ ...filters, age: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    value={filters.role}
                    onChange={(e) =>
                      setFilters({ ...filters, role: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="score">Score</label>
                  <input
                    type="text"
                    value={filters.score}
                    onChange={(e) =>
                      setFilters({ ...filters, score: e.target.value })
                    }
                  />
                </div>
                <div className="apply_button">
                  <button
                    type="clear"
                    onClick={() => {
                      setFilters([]);
                      setApplyFilters(false);
                      setAddDisabled(false);
                    }}
                  >
                    Clear Filters
                  </button>
                  <button type="submit">Apply</button>
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
            {applyFilters
              ? filteredTable.map(
                  (row) =>
                    // <div key={row.id}>
                    editable && editableRow === row.id ? (
                      <tr key={row.id}>
                        <td >
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
                            <button>Save</button>
                            <button
                              onClick={() => {
                                console.log(...table);
                                setEditable(true);
                                setEditableRow(row.id);
                                setRow(row);
                                console.log(row.id);
                                console.log(editableRow);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  // </div>
                )
              : table.map(
                  (row) =>
                    // <div key={row.id}>
                    editable && editableRow === row.id ? (
                      <tr key={row.id}>
                        <td className="hi">
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
                            <button>Save</button>
                            <button
                              onClick={() => {
                                console.log(...table);
                                setEditable(true);
                                setEditableRow(row.id);
                                setRow(row);
                                console.log(row.id);
                                console.log(editableRow);
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
