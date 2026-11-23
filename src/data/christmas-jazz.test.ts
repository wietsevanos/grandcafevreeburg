import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CHRISTMAS_JAZZ_EVENT, withChristmasJazz } from "./christmas-jazz";
import { isChristmasThemeActive } from "../lib/christmas-theme";

describe("Christmas agenda addition", () => {
  const existing = [{ id: "existing-jazz", image: "/jazz.jpg", date: "2027-01-17" }, { id: "quiz", image: "/quiz.webp" }];

  test("the special takes place on 20 December 2026", () => {
    assert.equal(CHRISTMAS_JAZZ_EVENT.date, "2026-12-20");
  });

  test("all existing events and their dates remain unchanged", () => {
    assert.deepEqual(withChristmasJazz(existing, true).slice(1), existing);
    assert.equal(existing[0].date, "2027-01-17");
  });

  test("the normal agenda is restored at Amsterdam midnight on 1 January", () => {
    assert.equal(isChristmasThemeActive(Date.parse("2026-12-31T23:59:59+01:00")), true);
    const active = isChristmasThemeActive(Date.parse("2027-01-01T00:00:00+01:00"));
    assert.equal(active, false);
    assert.deepEqual(withChristmasJazz(existing, active), existing);
  });
});