import { render, screen, userEvent } from "@testing-library/react-native";
import { Text } from "react-native";

import Button from "@/components/shared/ui/Button";

describe("Button", () => {
  it("renders its title", async () => {
    await render(<Button title="LOGIN" onPress={jest.fn()} />);

    expect(screen.getByText("LOGIN")).toBeOnTheScreen();
  });

  it("calls onPress when pressed", async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    await render(<Button title="LOGIN" onPress={onPress} />);

    await user.press(screen.getByText("LOGIN"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("is disabled and ignores presses when `disabled`", async () => {
    const user = userEvent.setup();
    const onPress = jest.fn();
    await render(<Button title="LOGIN" onPress={onPress} disabled />);

    await user.press(screen.getByText("LOGIN"));

    expect(screen.getByText("LOGIN")).toBeDisabled();
    expect(onPress).not.toHaveBeenCalled();
  });

  it("hides the title while loading", async () => {
    await render(<Button title="LOGIN" onPress={jest.fn()} isLoading />);

    expect(screen.queryByText("LOGIN")).not.toBeOnTheScreen();
  });

  it("renders prefix and suffix content around the title", async () => {
    await render(
      <Button
        title="LOGIN"
        onPress={jest.fn()}
        prefix={<Text>PREFIX</Text>}
        suffix={<Text>SUFFIX</Text>}
      />,
    );

    expect(screen.getByText("PREFIX")).toBeOnTheScreen();
    expect(screen.getByText("SUFFIX")).toBeOnTheScreen();
  });
});
