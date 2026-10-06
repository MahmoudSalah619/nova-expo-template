import { useState } from "react";
import { DropDown } from "@/components/shared/ui";
import type { DropDownValue } from "@/components/shared/ui/DropDown/types";
import { CITY_OPTIONS } from "../../constants";
import ShowcaseItem from "../ShowcaseItem";
import ShowcaseSection from "../ShowcaseSection";

export default function DropDownShowcase() {
  const [city, setCity] = useState<DropDownValue>("");
  const [radioCity, setRadioCity] = useState<DropDownValue>(CITY_OPTIONS[1].value);
  const [cities, setCities] = useState<DropDownValue>([]);

  return (
    <ShowcaseSection
      title="DropDown"
      description="Single, radio and multi select, plus disabled and error states."
    >
      <ShowcaseItem label="Single select">
        <DropDown
          InputLabel="City"
          InputPlaceholder="Choose a city"
          data={CITY_OPTIONS}
          inputValue={city}
          onChange={(value) => setCity(value ?? "")}
        />
      </ShowcaseItem>

      <ShowcaseItem label="Radio select">
        <DropDown
          InputLabel="City"
          data={CITY_OPTIONS}
          isRadio
          inputValue={radioCity}
          onChange={(value) => setRadioCity(value ?? "")}
        />
      </ShowcaseItem>

      <ShowcaseItem label="Multi select">
        <DropDown
          InputLabel="Cities"
          InputPlaceholder="Choose cities"
          data={CITY_OPTIONS}
          isMulti
          inputValue={cities}
          onChange={(value) => setCities(value ?? [])}
        />
      </ShowcaseItem>

      <ShowcaseItem label="Disabled and error">
        <DropDown
          InputLabel="Disabled"
          data={CITY_OPTIONS}
          disabled
          inputValue={CITY_OPTIONS[0].value}
          onChange={() => {}}
        />
        <DropDown
          InputLabel="With error"
          data={CITY_OPTIONS}
          inputValue=""
          error="Please choose a city"
          onChange={() => {}}
        />
      </ShowcaseItem>
    </ShowcaseSection>
  );
}
