import { helpers_auctionResultHelpers } from "__generated__/helpers_auctionResultHelpers.graphql"
import moment from "moment"
import { auctionResultHasPrice, auctionResultText } from "../helpers"

describe("auction result helpers", () => {
  it("works for existing price", () => {
    const auctionResultWithPrice: helpers_auctionResultHelpers = {
      " $refType": "helpers_auctionResultHelpers",
      currency: "USD",
      saleDate: moment().toISOString(),
      priceRealized: { display: "one dollar", cents: 100 },
      boughtIn: false,
    }

    expect(auctionResultHasPrice(auctionResultWithPrice)).toBe(true)
    expect(auctionResultText(auctionResultWithPrice)).toBe(undefined)
  })

  it("works for awaiting results", () => {
    const auctionResultAwaitingResults: helpers_auctionResultHelpers = {
      " $refType": "helpers_auctionResultHelpers",
      currency: "USD",
      saleDate: moment().subtract(2, "days").toISOString(),
      priceRealized: { display: "zero", cents: 0 },
      boughtIn: false,
    }

    expect(auctionResultHasPrice(auctionResultAwaitingResults)).toBe(false)
    expect(auctionResultText(auctionResultAwaitingResults)).toBe("Awaiting results")
  })

  it("works for bought in", () => {
    const auctionResultBoughtIn: helpers_auctionResultHelpers = {
      " $refType": "helpers_auctionResultHelpers",
      currency: "USD",
      saleDate: moment().toISOString(),
      priceRealized: { display: "zero", cents: 0 },
      boughtIn: true,
    }

    expect(auctionResultHasPrice(auctionResultBoughtIn)).toBe(false)
    expect(auctionResultText(auctionResultBoughtIn)).toBe("Bought in")
  })

  it("works for not available", () => {
    const auctionResultNotAvailable: helpers_auctionResultHelpers = {
      " $refType": "helpers_auctionResultHelpers",
      currency: "USD",
      saleDate: moment().subtract(3, "months").toISOString(),
      priceRealized: { display: "zero", cents: 0 },
      boughtIn: false,
    }

    expect(auctionResultHasPrice(auctionResultNotAvailable)).toBe(false)
    expect(auctionResultText(auctionResultNotAvailable)).toBe("Not available")
  })
})
