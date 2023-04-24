import React from "react";
import { Dropdown } from "@nextui-org/react";
import { useEffect } from "react";

export default function DropdownTS({items, defaultValue, onChange, label}) {
  const [menuItems, setMenuItems] = React.useState([]);
  const [selected, setSelected] = React.useState(new Set([defaultValue]));

  useEffect(() => {
    let newItems  = [];
    items.forEach((i) => newItems.push({ key: i, name: i }));
    setMenuItems(newItems);
  }, [items]);

  

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  useEffect(() => {
    onChange(selectedValue);
  }, [selected]);

  return (
    <Dropdown>
      <Dropdown.Button css={{ margin: "10px", width: "100%" }} flat>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        aria-label={label}
        items={menuItems}
      >
        {(item) => (
          <Dropdown.Item
            key={item.key}
            color={item.key === "delete" ? "error" : "default"}
          >
            {item.name}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
