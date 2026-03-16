import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders recipe library interface", () => {
  render(<App />);
  expect(screen.getAllByText(/recipe library/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/search recipes/i)).toBeInTheDocument();
});
