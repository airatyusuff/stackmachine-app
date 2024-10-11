import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ResultCard from "./resultCard";

describe("ResultCard component", () => {
  it("renders result", async() => {
    render(<ResultCard result={'Hello'} />);

    expect(screen.getByText('Result: Hello')).toBeInTheDocument

  });
});