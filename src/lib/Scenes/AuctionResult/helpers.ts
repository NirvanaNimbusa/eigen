import { helpers_auctionResultHelpers } from "__generated__/helpers_auctionResultHelpers.graphql"
import moment from "moment"
import { graphql } from "react-relay"

export const auctionResultHasPrice = (auctionResult: helpers_auctionResultHelpers): boolean => {
  if (
    auctionResult.priceRealized === null ||
    auctionResult.priceRealized.cents === null ||
    auctionResult.priceRealized.display === null ||
    auctionResult.currency === null
  ) {
    return false
  }

  if (auctionResult.priceRealized.cents === 0) {
    return false
  }

  return true
}

export const auctionResultText = (auctionResult: helpers_auctionResultHelpers) => {
  if (auctionResult.boughtIn === true) {
    return "Bought in"
  }

  if (auctionResultHasPrice(auctionResult)) {
    return undefined
  }

  const now = moment()
  const isFromPastMonth = auctionResult.saleDate
    ? moment(auctionResult.saleDate).isAfter(now.subtract(1, "month"))
    : false
  return isFromPastMonth ? "Awaiting results" : "Not available"
}

// @ts-ignore
const _fragment = graphql`
  fragment helpers_auctionResultHelpers on AuctionResult {
    currency
    boughtIn
    priceRealized {
      display
      cents
    }
    saleDate
  }
`
