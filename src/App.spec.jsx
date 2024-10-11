import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import App from "./App";
import { BASE_API_URL } from "./config";


const stubQuoteApiRoutes = [
  http.post(`${BASE_API_URL}/execute`, () => {
    return HttpResponse.text('34')
  }),
];

const stubQuoteApi = setupServer(...stubQuoteApiRoutes);


describe("App", () => {
  stubQuoteApi.listen();

  it("renders app", () => {
    render(<App />);

    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('heading', {name: 'Stack Machine'})).toBeTruthy()
    expect(screen.getByRole('button', {name: 'Execute'})).toBeInTheDocument
    expect(screen.queryByText('Result:')).toBeFalsy()
  });

  it("should execute command successfully on button click and clear input field", async () => {
    render(<App />)

    const user = userEvent.setup()

    const btn = screen.getByRole('button', {name: 'Execute'})
    const inputBox = screen.getByRole('textbox')

    await user.type(inputBox, '34 24')
    await user.click(btn)

    screen.logTestingPlaygroundURL()
    expect(screen.getByText('Result: 34')).toBeInTheDocument()
    expect(inputBox).toHaveValue('')
  })

  it("should show error message on invalid command", async () => {
    render(<App />)

    const user = userEvent.setup()

    const btn = screen.getByRole('button', {name: 'Execute'})
    const inputBox = screen.getByRole('textbox')

    await user.type(inputBox, '+')
    await user.click(btn)

    screen.logTestingPlaygroundURL()
    expect(screen.getByText('Error:')).toBeInTheDocument()
  })
});