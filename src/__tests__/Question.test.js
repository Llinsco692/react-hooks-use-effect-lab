import React from "react";
import { render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom'; // ✅ Make sure this is imported
import Question from "../Question";

jest.useFakeTimers();

const testQuestion = {
  prompt: "What is 2 + 2?",
  answers: ["3", "4", "5", "6"],
};

const noop = () => {};

test("creates an interval with setTimeout", () => {
  jest.spyOn(global, "setTimeout");
  render(<Question question={testQuestion} onAnswered={noop} />);
  expect(setTimeout).toHaveBeenCalled();
});

test("decrements the timer by 1 every second", () => {
  render(<Question question={testQuestion} onAnswered={noop} />);
  expect(screen.getByText(/10 seconds remaining/i)).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByText(/9 seconds remaining/i)).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByText(/8 seconds remaining/i)).toBeInTheDocument();
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn();
  render(<Question question={testQuestion} onAnswered={onAnswered} />);

  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(onAnswered).toHaveBeenCalledWith(false);
});

test("clears the timeout after unmount", () => {
  jest.spyOn(global, "clearInterval"); // ✅ Use clearInterval if you're using setInterval
  const { unmount } = render(<Question question={testQuestion} onAnswered={noop} />);
  unmount();
  expect(clearInterval).toHaveBeenCalled();
});
