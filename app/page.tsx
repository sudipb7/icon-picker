import { IconPicker } from "@/components/icon-picker";

export default function Home() {
  return (
    <main className="p-6 py-8 flex flex-col justify-center min-h-screen gap-3 sm:gap-4">
      <h1 className="text-center font-bold tracking-tight text-gray-900 text-5xl md:text-6xl text-pretty">
        Pick your favourite icon
      </h1>
      <IconPicker
        columnsInOnePage={7}
        rowsInOnePage={6}
        iconHeight={24}
        iconWidth={24}
        pickerHeight={500}
        pickerWidth={500}
      />
    </main>
  );
}
