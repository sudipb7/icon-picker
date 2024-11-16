"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface IconPickerProps {
  rowsInOnePage: number;
  columnsInOnePage: number;
  iconHeight: number;
  iconWidth: number;
  pickerHeight?: number;
  pickerWidth?: number;
}

export const IconPicker = ({
  columnsInOnePage,
  iconHeight,
  iconWidth,
  rowsInOnePage,
  pickerHeight = 500,
  pickerWidth = 500,
}: IconPickerProps) => {
  const [icons, setIcons] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [perPage] = useState(rowsInOnePage * columnsInOnePage);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  const onIconClick = (icon: string) => {
    setSelectedIcon(icon);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchIconsCount = async () => {
      await fetch(`/api/icons/count`)
        .then(res => res.json())
        .then(data => setCount(data.count));
    };
    fetchIconsCount();
  }, []);

  useEffect(() => {
    const fetchIcons = async () => {
      setIsLoading(true);
      await fetch(`/api/icons?page=${page}&perPage=${perPage}`)
        .then(res => res.json())
        .then(data => {
          setIcons(data.icons);
          setIsLoading(false);
        });
    };
    fetchIcons();
  }, [page, perPage, isOpen]);

  const handleNextPage = () => {
    if (page < Math.ceil(count / perPage)) {
      setPage(p => p + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(p => p - 1);
    }
  };

  return isOpen ? (
    <div className="fixed fade-in inset-0 z-40 bg-gray-900/30 flex items-center justify-center">
      <div
        style={{ height: pickerHeight, width: pickerWidth }}
        className="zoom-in custom-scrollbar relative overflow-y-scroll z-50 p-6 rounded-md border shadow-lg bg-gray-50 flex flex-col"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900 font-semibold">Pick an icon</h2>
          <button onClick={toggle} className="text-gray-900 font-semibold">
            <Image src="/icons/x.svg" width={16} height={16} alt="Close" />
          </button>
        </div>
        <div
          style={{
            gridTemplateColumns: `repeat(${columnsInOnePage}, 1fr)`,
            gridTemplateRows: `repeat(${rowsInOnePage}, 1fr)`,
          }}
          className="w-full mt-3 sm:mt-4 grid gap-2 place-items-center flex-1"
        >
          {!isLoading && icons.length ? (
            icons.map((icon, i) => (
              <button
                onClick={() => onIconClick(icon)}
                key={i}
                className="rounded-md border border-gray-900 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center shadow-sm p-3"
              >
                <Image
                  src={`/icons/${icon}`}
                  alt={icon}
                  width={iconWidth}
                  height={iconHeight}
                  className="rounded-md fade-in"
                />
              </button>
            ))
          ) : (
            <>
              {Array.from({ length: perPage }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-md border border-gray-900 bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center shadow-sm p-3 animate-pulse"
                >
                  <div
                    style={{ width: iconWidth, height: iconHeight }}
                    className="rounded-md"
                  ></div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="flex items-center justify-center mt-4">
          <div className="flex-1 text-xs text-gray-600">
            Page {page} of {Math.ceil(count / perPage)} ({count} icons)
            <span className="text-gray-500"> | Showing {perPage} icons per page</span>
          </div>
          <div className="flex justify-end items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePreviousPage}
              className="mx-auto text-xs flex items-center gap-x-2 rounded-md border border-gray-900 bg-gradient-to-b from-gray-600 to-gray-900 px-3 py-1.5 font-medium text-gray-50 shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-all"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="mx-auto text-xs flex items-center gap-x-2 rounded-md border border-gray-900 bg-gradient-to-b from-gray-600 to-gray-900 px-3 py-1.5 font-medium text-gray-50 shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <button
      onClick={toggle}
      className="h-[100px] aspect-square border border-dashed rounded-md bg-gradient-to-b from-gray-50 to-gray-100 mx-auto flex items-center justify-center px-4 py-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 transition-all"
    >
      {selectedIcon ? (
        <Image
          src={`/icons/${selectedIcon}`}
          width={40}
          height={40}
          alt={selectedIcon.replace(".svg", "")}
        />
      ) : (
        <span className="text-lg text-gray-900 leading-tight font-semibold text-center">
          Pick an icon
        </span>
      )}
    </button>
  );
};
