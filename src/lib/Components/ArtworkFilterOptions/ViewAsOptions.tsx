import { StackScreenProps } from "@react-navigation/stack"
import {
  AggregateOption,
  FilterDisplayName,
  FilterParamName,
  ViewAsValues,
} from "lib/utils/ArtworkFilter/FilterArtworksHelpers"
import { ArtworkFiltersStoreContext } from "lib/utils/ArtworkFilter2/ArtworkFiltersContext"
import { useSelectedOptionsDisplay } from "lib/utils/ArtworkFilter2/ArtworkFiltersStore"
import { FilterData } from "lib/utils/ArtworkFilter2/FilterArtworksHelpers"
import React from "react"
import { FilterModalNavigationStack } from "../FilterModal"
import { SingleSelectOptionScreen } from "./SingleSelectOption"

interface ViewAsOptionsScreenProps extends StackScreenProps<FilterModalNavigationStack, "WaysToBuyOptionsScreen"> {}

export const ViewAsOptionsScreen: React.FC<ViewAsOptionsScreenProps> = ({ navigation }) => {
  const selectFiltersAction = ArtworkFiltersStoreContext.useStoreActions((action) => action.selectFiltersAction)

  const paramName = FilterParamName.viewAs

  const gridOption: FilterData = { displayText: "Grid", paramName, paramValue: ViewAsValues.Grid }
  const listOption: FilterData = { displayText: "List", paramName, paramValue: ViewAsValues.List }

  const viewAsOptions = [gridOption, listOption]

  const selectedOptions = useSelectedOptionsDisplay()
  const selectedOption = selectedOptions.find((option) => option.paramName === paramName)!

  const selectOption = (option: AggregateOption) => {
    selectFiltersAction({
      displayText: option.displayText,
      paramValue: option.paramValue,
      paramName,
    })
  }

  return (
    <SingleSelectOptionScreen
      onSelect={selectOption}
      filterHeaderText={FilterDisplayName.viewAs}
      filterOptions={viewAsOptions}
      selectedOption={selectedOption}
      navigation={navigation}
    />
  )
}
