import { fireEvent, getAllByRole, render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom"

test("renders the App", () => {
  render(<App />);
  expect(screen.getByText("Table")).toBeInTheDocument();
  expect(screen.getByText("Filters")).toBeInTheDocument();
  expect(screen.queryByRole('form')).not.toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Add')).toBeInTheDocument();
});

test("testing functionality for Add",()=>{
  render(<App />);
  const add=screen.getByText("Add");

  fireEvent.click(add);
  expect(screen.getByText('name')).toBeInTheDocument();
  expect(screen.getByText('age')).toBeInTheDocument();
  expect(screen.getByText('role')).toBeInTheDocument();
  expect(screen.getByText(0)).toBeInTheDocument();

})
test("testing functionality for Edit and Save",()=>{
  
  render(<App />);
  const add=screen.getByText("Add");
  
  fireEvent.click(add);
  const edit=screen.getAllByText("Edit");
  
  fireEvent.click(edit[edit.length - 1]);
  expect(screen.queryByText('name')).not.toBeInTheDocument();
  expect(screen.queryByText('age')).not.toBeInTheDocument();
  expect(screen.queryByText('role')).not.toBeInTheDocument();
  expect(screen.queryByText(0)).not.toBeInTheDocument();
  
  expect(screen.getByDisplayValue('name')).toBeInTheDocument();
  expect(screen.getByDisplayValue('age')).toBeInTheDocument();
  expect(screen.getByDisplayValue('role')).toBeInTheDocument();
  expect(screen.getByDisplayValue(0)).toBeInTheDocument();

  const nameInput = screen.getByDisplayValue('name');
  fireEvent.change(nameInput,{target:{value:"shravan"}})
  expect(screen.queryByDisplayValue('name')).not.toBeInTheDocument();
  expect(screen.getByDisplayValue('shravan')).toBeInTheDocument();

  const save=screen.getAllByText("Save");
  
  fireEvent.click(save[save.length-1]);
  expect(screen.queryByText('name')).not.toBeInTheDocument();
  expect(screen.getByText('shravan')).toBeInTheDocument();
  expect(screen.getByText('age')).toBeInTheDocument();
  expect(screen.getByText('role')).toBeInTheDocument();
  expect(screen.getByText(0)).toBeInTheDocument();

})
