import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CHRISTMAS_JAZZ_EVENT, withChristmasJazz } from "./christmas-jazz";
import { isChristmasThemeActive } from "../lib/christmas-theme";

describe("Christmas agenda addition", () => {
  const existing = [{ id: "existing-jazz", image: "/jazz.jpg", date: "2027-01-17" }, { id: "quiz", image: "/quiz.webp" }];

  test("the special takes place on 20 December 2026", () => {
    assert.equal(CHRISTMAS_JAZZ_EVENT.date, "2026-12-20");
  });

  test("the special sits in second place, after the first regular event", () => {
    assert.deepEqual(withChristmasJazz(existing, true), [existing[0], CHRISTMAS_JAZZ_EVENT, existing[1]]);
  });

  test("all existing events and their dates remain unchanged", () => {
    assert.equal(existing[0].date, "2027-01-17");
    assert.deepEqual(withChristmasJazz(existing, true).filter((event) => event.id !== CHRISTMAS_JAZZ_EVENT.id), existing);
  });

  test("with no regular events the special is shown on its own", () => {
    assert.deepEqual(withChristmasJazz([], true), [CHRISTMAS_JAZZ_EVENT]);
  });

  test("the normal agenda is restored at Amsterdam midnight on 1 January", () => {
    assert.equal(isChristmasThemeActive(Date.parse("2026-12-31T23:59:59+01:00")), true);
    const active = isChristmasThemeActive(Date.parse("2027-01-01T00:00:00+01:00"));
    assert.equal(active, false);
    assert.deepEqual(withChristmasJazz(existing, active), existing);
  });
});