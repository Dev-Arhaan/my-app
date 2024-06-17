'use client'

import React, { useRef, useState } from "react";
const Autocomplete = (props: any) => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  const selectRef = useRef(null);

  function setChange() {
    const selected = selectRef?.current?.querySelector(".active");
    if (selected) {
      selected?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  const onChange = (e: any) => {
    const { suggestions } = props;
    const input = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      (suggestion: any) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value);
  };
  const onClick = (e: any) => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
  };
  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(0);
      setIsShow(false);
      setInput(filtered[active]);
    } else if (e.keyCode === 38) {
      // up arrow
      return active === 0 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1);
    }
  };
  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <div className="flex justify-center">
          <ul className="border border-[#999] border-t-0 mt-0 max-h-[143px] overflow-y-auto pl-0 w-[320px]" ref={selectRef}>
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              setTimeout(() => {
                setChange();
              }, 100);
              return (
                <div className="p-2 hover:bg-slate-600 cursor-pointer font-[700]"><li className={className}  key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
                </div>
              );
            })}
          </ul>
          </div>
        );
      } else {
        return (
          <div className="color-[#999] p-2">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };
  return (
    <div className="m-10 mx-[50rem] grid grid-flow-row auto-rows-max">
      <input
      className="border border-[#999] rounded-md p-2 w-800"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
        
      />
      {renderAutocomplete()}
    </div>
  );
};
export default Autocomplete;
