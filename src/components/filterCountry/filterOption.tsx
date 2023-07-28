import { useEffect, useState } from "react";
import styles from "./filterOption.module.css";
import { FilterOptionProps, FilterOptionState } from "../../types/types";

export function FilterOption({
  name,
  clean,
  code,
  image,
  onFilters,
}: FilterOptionProps) {
  const state: FilterOptionState | null = JSON.parse(
    localStorage.getItem("filters") || "{}"
  );
  const [selected, setSelected] = useState(
    (state && state[`${code}`]) || false
  );

  function onSelected() {
    setSelected(!selected);
    localStorage.setItem(
      "filters",
      JSON.stringify({ ...state, [code]: !selected })
    );
    onFilters(code, selected, false);
  }

  useEffect(() => {
    if (clean) setSelected(false);
  }, [clean]);

  return (
    <div
      className={`${styles.containerContinent} ${
        selected ? styles.checked : ""
      }`}
      onClick={onSelected}
    >
      <img src={image || ""} alt="continent" />
      <p>{name}</p>
    </div>
  );
}
