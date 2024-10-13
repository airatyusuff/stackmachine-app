import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import App from "./App";
import { BASE_API_URL } from "./config";


const stubQuoteApiRoutes = [
  http.post(`${BASE_API_URL}/execute`, () => {
    return HttpResponse.json({
      status: 200,
      data: "54",
    });
  })
];

const stubQuoteApi = setupServer(...stubQuoteApiRoutes);


describe("App", () => {
  stubQuoteApi.listen();

  it("renders app", () => {
    render(<App />);

    expect(screen.getByRole('heading', {name: 'Stack Machine'})).toBeTruthy()
    expect(screen.getByRole('button', {name: 'Execute'})).toBeInTheDocument
    expect(screen.queryByText('Result:')).toBeFalsy()
  });

  it("should execute command successfully on button click and clear input field", async () => {
    render(<App />)

    await setupActions('34 20 +')

    expect(await screen.findByText('Result: 54')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it("should show error message on invalid command", async () => {
    stubQuoteApi.use(
      http.post(`${BASE_API_URL}/execute`, () => {
        return HttpResponse.json({ status: 400, error_msg: 'some error' }, { status: 400 })
      }),
    )

    render(<App />)

    await setupActions('+')

    expect(screen.getByText('Error:')).toBeInTheDocument()
    expect(screen.getByText('some error')).toBeInTheDocument()
  })
});

const setupActions = async (command) => {
  const user = userEvent.setup()
  const btn = screen.getByRole('button', {name: 'Execute'})
  const inputBox = screen.getByRole('textbox')

  await user.type(inputBox, command)
  await user.click(btn)
}