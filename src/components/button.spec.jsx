import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./button";

describe("Button component", () => {
  it("renders button", async() => {
    render(<Button text={'Sample'} />);

    const btn = screen.getByRole('button', {name: 'Sample'})
    expect(btn).toBeInTheDocument

  });
});