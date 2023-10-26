import React from "react";
import {  render, screen} from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import Logo from "@/components/Logo/Logo";
const theme = createTheme();

describe.skip("Logo Component", () => {
  it("Logo Button", () => {
    render(
      <ThemeProvider theme={theme}>
        <Logo title={true} />
      </ThemeProvider>
    );
    const logoButton = screen.getByRole("button",{
      name:/BrainStorming/i
    });
    expect(logoButton).toBeInTheDocument();
  });

  it("Logo Icon", () => {
    render(
      <ThemeProvider theme={theme}>
        <Logo />
      </ThemeProvider>
    );
    const logoIcon = screen.getByTestId("logo_icon");
    expect(logoIcon).toBeInTheDocument();
  });

  it("Logo Title", () => {
    render(
      <ThemeProvider theme={theme}>
        <Logo title={true} />
      </ThemeProvider>
    );
    const logoTitle = screen.getByText("BrainStorming");
    expect(logoTitle).toBeInTheDocument();
  });
});
