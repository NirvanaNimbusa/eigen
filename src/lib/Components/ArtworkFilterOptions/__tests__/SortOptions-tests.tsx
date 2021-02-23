import { extractText } from "lib/tests/extractText"
import { renderWithWrappers } from "lib/tests/renderWithWrappers"
import { FilterParamName } from "lib/utils/ArtworkFilter/FilterArtworksHelpers"
import { Box, CheckIcon, Theme } from "palette"
import React from "react"
import { ReactTestRenderer } from "react-test-renderer"
import {
  __filterArtworksStoreTestUtils__,
  ArtworkFiltersState,
  ArtworkFiltersStoreProvider,
  ArtworksFiltersStore,
} from "../../../utils/ArtworkFilter/ArtworkFiltersStore"
import { InnerOptionListItem, OptionListItem } from "../SingleSelectOption"
import { SortOptionsScreen } from "../SortOptions"
import { getEssentialProps } from "./helper"

describe("Sort Options Screen", () => {
  let initialState: ArtworkFiltersState

  beforeEach(() => {
    initialState = {
      selectedFilters: [],
      appliedFilters: [],
      previouslyAppliedFilters: [],
      applyFilters: false,
      aggregations: [],
      filterType: "artwork",
      counts: {
        total: null,
        followedArtists: null,
      },
    }

    // __filterArtworksStoreTestUtils__?.injectState(initialState)
  })

  const MockSortScreen = () => {
    return (
      <Theme>
        <ArtworkFiltersStoreProvider>
          <SortOptionsScreen {...getEssentialProps()} />
        </ArtworkFiltersStoreProvider>
      </Theme>
    )
  }

  const selectedSortOption = (componentTree: ReactTestRenderer) => {
    const innerOptions = componentTree.root.findAllByType(InnerOptionListItem)
    const selectedOption = innerOptions.filter((item) => item.findAllByType(Box).length > 0)[0]
    return selectedOption
  }

  it("renders the correct number of sort options", () => {
    const tree = renderWithWrappers(<MockSortScreen />)
    expect(tree.root.findAllByType(OptionListItem)).toHaveLength(7)
  })

  describe("selectedSortOption", () => {
    it("returns the default option if there are no selected or applied filters", () => {
      const tree = renderWithWrappers(<MockSortScreen />)
      const selectedOption = selectedSortOption(tree)
      expect(extractText(selectedOption)).toContain("Default")
    })

    it.only("prefers an applied filter over the default filter", () => {
      const injectedState: ArtworkFiltersState = {
        selectedFilters: [],
        appliedFilters: [
          {
            displayText: "Recently added",

            paramName: FilterParamName.sort,
            paramValue: "Recently added",
          },
        ],
        previouslyAppliedFilters: [
          {
            displayText: "Recently added",

            paramName: FilterParamName.sort,
            paramValue: "Recently added",
          },
        ],
        applyFilters: false,
        aggregations: [],
        filterType: "artwork",
        counts: {
          total: null,
          followedArtists: null,
        },
      }

      const tree = renderWithWrappers(<MockSortScreen />)
      const selectedOption = selectedSortOption(tree)
      expect(extractText(selectedOption)).toContain("Recently added")
    })

    it("prefers the selected filter over the default filter", () => {
      const injectedState: ArtworkFiltersState = {
        selectedFilters: [
          {
            displayText: "Recently added",

            paramName: FilterParamName.sort,
            paramValue: "Recently added",
          },
        ],
        appliedFilters: [],
        previouslyAppliedFilters: [],
        applyFilters: false,
        aggregations: [],
        filterType: "artwork",
        counts: {
          total: null,
          followedArtists: null,
        },
      }

      __filterArtworksStoreTestUtils__?.injectState(injectedState)

      const tree = renderWithWrappers(<MockSortScreen />)
      const selectedOption = selectedSortOption(tree)
      expect(extractText(selectedOption)).toContain("Recently added")
    })

    it("prefers the selected filter over an applied filter", () => {
      const injectedState: ArtworkFiltersState = {
        selectedFilters: [
          {
            displayText: "Recently added",

            paramName: FilterParamName.sort,
            paramValue: "Recently added",
          },
        ],
        appliedFilters: [
          {
            displayText: "Recently updated",

            paramName: FilterParamName.sort,
            paramValue: "Recently updated",
          },
        ],
        previouslyAppliedFilters: [
          {
            displayText: "Recently updated",

            paramName: FilterParamName.sort,
            paramValue: "Recently updated",
          },
        ],
        applyFilters: false,
        aggregations: [],
        filterType: "artwork",
        counts: {
          total: null,
          followedArtists: null,
        },
      }

      __filterArtworksStoreTestUtils__?.injectState(injectedState)

      const tree = renderWithWrappers(<MockSortScreen />)
      const selectedOption = selectedSortOption(tree)
      expect(extractText(selectedOption)).toContain("Recently added")
    })
  })

  it("allows only one sort filter to be selected at a time", () => {
    const injectedState: ArtworkFiltersState = {
      selectedFilters: [
        {
          displayText: "Price (high to low)",

          paramName: FilterParamName.sort,
          paramValue: "Price (high to low)",
        },
        {
          displayText: "Price (low to high)",

          paramName: FilterParamName.sort,
          paramValue: "Price (low to high)",
        },
      ],
      appliedFilters: [],
      previouslyAppliedFilters: [],
      applyFilters: false,
      aggregations: [],
      filterType: "artwork",
      counts: {
        total: null,
        followedArtists: null,
      },
    }
    __filterArtworksStoreTestUtils__?.injectState(injectedState)

    const tree = renderWithWrappers(<MockSortScreen />)
    const selectedRow = selectedSortOption(tree)
    expect(extractText(selectedRow)).toEqual("Price (high to low)")
    expect(selectedRow.findAllByType(CheckIcon)).toHaveLength(1)
  })

  describe("filterType of showArtwork", () => {
    it("has the correct options", () => {
      const injectedState: ArtworkFiltersState = {
        selectedFilters: [],
        appliedFilters: [],
        previouslyAppliedFilters: [],
        applyFilters: false,
        aggregations: [],
        filterType: "showArtwork",
        counts: {
          total: null,
          followedArtists: null,
        },
      }

      __filterArtworksStoreTestUtils__?.injectState(injectedState)

      const tree = renderWithWrappers(<MockSortScreen />)
      const selectedRow = selectedSortOption(tree)

      expect(extractText(selectedRow)).toEqual("Gallery Curated")
      expect(selectedRow.findAllByType(CheckIcon)).toHaveLength(1)
    })
  })

  describe("filterType of auctionResults", () => {
    it("has the correct options", () => {
      const injectedState: ArtworkFiltersState = {
        selectedFilters: [],
        appliedFilters: [],
        previouslyAppliedFilters: [],
        applyFilters: false,
        aggregations: [],
        filterType: "auctionResult",
        counts: {
          total: null,
          followedArtists: null,
        },
      }

      __filterArtworksStoreTestUtils__?.injectState(injectedState)

      const tree = renderWithWrappers(<MockSortScreen />)
      const selectedRow = selectedSortOption(tree)

      expect(extractText(selectedRow)).toEqual("Most recent sale date")
      expect(selectedRow.findAllByType(CheckIcon)).toHaveLength(1)
    })
  })
})
