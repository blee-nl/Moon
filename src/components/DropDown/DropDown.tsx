import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import DropDownWrapper from "./DropDownWrapper";

type DropDownItem = {
  id: string | null;
  name: string | null;
};

type DropDownProps = {
  items: DropDownItem[];
  onSelect: (value: number | string | null) => void;
  defaultLabel: string;
};

export function DropDown({ items, onSelect, defaultLabel }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropDownItem>();
  const [currentLabel, setLabel] = useState(defaultLabel);

  const dropdownToggleRef = useRef<any>();
  const dropdownMenuRef = useRef<any>();

  useEffect(() => {
    const handleClick = (event: { target: any }) => {
      const target = event.target;
      if (
        !dropdownToggleRef.current?.contains(target) &&
        !dropdownMenuRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (!selectedItem) {
      setLabel(defaultLabel);
    } else {
      const currentItem = items.find(
        (item: DropDownItem) => item.id === selectedItem.id
      );
      if (currentItem?.name) {
        setLabel(currentItem.name);
      }
    }
  }, [selectedItem, items, defaultLabel]);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const renderedItems = useMemo(() => {
    if (!isOpen) {
      return;
    }

    let dropdownItems = items || [];

    return dropdownItems.map((item) => {
      const { id, name } = item;

      const isActive = name === currentLabel;
      let itemLabel = name;

      const handleItemClick = () => {
        setIsOpen(false);
        setSelectedItem(item);
        if (item?.id) {
          onSelect(item.id);
        }
      };

      return (
        <button
          key={id}
          id={id ? id : "default-value-drop-down"}
          type="button"
          tabIndex={0}
          className={isActive ? "active" : ""}
          onClick={handleItemClick}
        >
          {itemLabel}
        </button>
      );
    });
  }, [currentLabel, isOpen, items, onSelect]);

  return (
    <DropDownWrapper>
      <button
        ref={dropdownToggleRef}
        className="dropdown-box"
        onClick={handleToggle}
      >
        {currentLabel}
      </button>

      {isOpen && (
        <div
          ref={dropdownMenuRef}
          className="dropdown-menu show"
          role="menu"
          aria-hidden="false"
        >
          {renderedItems}
        </div>
      )}
    </DropDownWrapper>
  );
}

export default DropDown;
