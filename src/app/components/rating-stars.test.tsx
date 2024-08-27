import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import RatingStars from "./rating-stars";

test("RatingStars should render filled and empty stars", () => {
  const { unmount } = render(<RatingStars rating={3} />);

  expect(screen.getAllByTestId("filled-star")).toHaveLength(3);
  expect(screen.getAllByTestId("empty-star")).toHaveLength(2);
  unmount();
});

test("RatingStars should render all filled stars", () => {
  const { unmount } = render(<RatingStars rating={5} />);

  expect(screen.getAllByTestId("filled-star")).toHaveLength(5);
  expect(screen.queryByTestId("empty-star")).toBeNull();
  unmount();
});

test("RatingStars should render all empty stars", () => {
  const { unmount } = render(<RatingStars rating={0} />);
  expect(screen.getAllByTestId("empty-star")).toHaveLength(5);
  expect(screen.queryByTestId("filled-star")).toBeNull();
  unmount();
});
