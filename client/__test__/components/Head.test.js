import Head from "@/components/Head/Head";
import { render, screen } from "@testing-library/react";

describe.skip("Head Component", () => {
  it("Test Title", () => {
    render(<Head />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });

  it("Empty Title", () => {
    render(<Head title={""} />);
    const title = screen.getByTestId("title_paragraph");
    expect(title.innerHTML).toBe("");
  });

  it("Small Title", () => {
    render(<Head title={"Hello"} />);
    const title = screen.getByText("Hello");
    expect(title).toBeInTheDocument();
  });

  it("Large Title", () => {
    render(
      <Head
        title={
          "Hello World , my name's Mahmoud Salama and My Nickname is webGhoul"
        }
      />
    );
    const title = screen.getByText(
      "Hello World , my nam..."
    );
    expect(title).toBeInTheDocument();
  });
});
