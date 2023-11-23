import '@/styles/breakdown/BreakdownInputPage.css';

import BreakdownExcelFileInput from "@/components/breakdown/BreakdownExcelFileInput";
import BreakdownInput from "@/components/breakdown/BreakdownInput";

export default function BreakdownInputPage() {
  return (
    <section className="breakdown-input_section grid-center">
      Въведи поръчка
      <BreakdownInput/>
      {/* <BreakdownExcelFileInput/> */}
    </section>
  )
}
