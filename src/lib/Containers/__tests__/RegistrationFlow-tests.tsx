import React from "react"
import "react-native"
import * as renderer from "react-test-renderer"

import Moment from "moment-timezone"
import RegistrationFlow from "../RegistrationFlow"

jest.mock("tipsi-stripe", () => ({ setOptions: jest.fn() }))
Moment.prototype.format = jest.fn(() => "03d  14h  01m  59s")
Date.now = jest.fn(() => 1528243200)

const Sale = {
  id: "david-lynch-foundation-benefit-auction-2018",
  end_at: "2018-06-26T19:30:00+00:00",
  is_preview: false,
  live_start_at: null,
  name: "David Lynch Foundation: Benefit Auction 2018",
  start_at: "2018-06-12T08:10:00+00:00",
  __id: "U2FsZTpkYXZpZC1seW5jaC1mb3VuZGF0aW9uLWJlbmVmaXQtYXVjdGlvbi0yMDE4",
}

// beforeEach(() => jest.useFakeTimers())
it("renders properly with credit card", () => {
  const bg = renderer.create(<RegistrationFlow me={{ has_credit_cards: true }} sale={Sale} />).toJSON()
  expect(bg).toMatchSnapshot()
})
it("renders properly without credit card", () => {
  const bg = renderer.create(<RegistrationFlow me={{ has_credit_cards: false }} sale={Sale} />).toJSON()
  expect(bg).toMatchSnapshot()
})
