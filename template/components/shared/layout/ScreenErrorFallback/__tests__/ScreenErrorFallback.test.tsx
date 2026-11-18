import { render, screen, userEvent } from "@testing-library/react-native";

import ScreenErrorFallback from "@/components/shared/layout/ScreenErrorFallback";
import reloadApp from "@/utils/reloadApp";

jest.mock("@/utils/reloadApp", () => jest.fn());

const renderFallback = () =>
  render(
    <ScreenErrorFallback
      error={new Error("Boom")}
      retry={jest.fn(() => Promise.resolve())}
    />,
  );

describe("ScreenErrorFallback", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders the error message and a single restart button", async () => {
    await renderFallback();

    expect(screen.getByText("SCREEN_ERROR_TITLE")).toBeOnTheScreen();
    expect(screen.getByText("RELOAD_APP")).toBeOnTheScreen();
    expect(screen.queryByText("TRY_AGAIN")).not.toBeOnTheScreen();
  });

  it("shows the underlying error in development", async () => {
    await renderFallback();

    expect(screen.getByText("Boom")).toBeOnTheScreen();
  });

  it("restarts the app when the button is pressed", async () => {
    const user = userEvent.setup();
    await renderFallback();

    await user.press(screen.getByText("RELOAD_APP"));

    expect(reloadApp).toHaveBeenCalledTimes(1);
  });
});
