import React from "react";
import { Handle } from "reactflow";
import { shallow } from "zustand/shallow";
import { tw } from "twind";
import { useStore } from "../../store";
import CustomHandle from "./parts/CustomHandle";
import Shader from "../../Shader/Shader";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import Dropdown from "../../Components/Dropdown";

const width = "200px";

const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
});

export default function CustomNode({
  id,
  data,
  nInputs,
  title,
  dropdownOptions,
  onChangeDropdownOption,
  mainColor = "blue-500",
  darkColor = "blue-800",
  accentColor = "blue-900",
}) {
  const { setGain } = useStore(selector(id), shallow);

  const [showMore, setShowMore] = React.useState(true);

  return (
    <div
      className={tw(`rounded-lg bg-white shadow-xl border-${mainColor} border`)}
      style={{ width }}
    >
      <p
        className={tw(
          `rounded-t-md px-2 py-1 bg-${mainColor} text-white text-sm`
        )}
      >
        {title}
      </p>
      {showMore && (
        <div className={tw("flex flex-col w-full items-center px-2 pt-1 pb-4")}>
          {dropdownOptions && (
            <Dropdown
              defaultValue={dropdownOptions[0]}
              onChange={onChangeDropdownOption}
              items={dropdownOptions}
              label={title}
            />
          ) }
          <Shader />
        </div>
      )}

      <button
        className={tw(
          "w-full rounded-b-md px-2 py-1 text-white text-sm flex items-center justify-center",
          `bg-${mainColor} hover:bg-${darkColor} active:bg-${accentColor} focus:outline-none`,
          "transition-colors duration-200"
        )}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? (
          <FiChevronUp className={tw("w-full")} />
        ) : (
          <FiChevronDown className={tw("w-full")} />
        )}
      </button>

      {/* <Handle className={tw("w-2 h-2")} type="source" position="bottom" /> */}

      {[...Array(nInputs)].map(function (e, i) {
        return (
          <div key={`${id}_targetHandleContainer_${i}`}>
            <CustomHandle
              nodeId={id}
              inputNumber={`${i}`}
              type="target"
              style={{ top: `${50 - ((nInputs - 1) / 2) * 5 + i * 5}%` }}
            />
          </div>
        );
      })}

      <CustomHandle
        nodeId={id}
        inputNumber="0"
        type="source"
        style={{ top: "50%" }}
      />
    </div>
  );
}
