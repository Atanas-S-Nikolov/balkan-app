import styles from '@/styles/breakdown/BreakdownInput.module.css';

import BreakdownInput from "@/components/breakdown/BreakdownInput";

export default function BreakdownInputPage() {
  return (
    <section className={`${styles.breakdown_input_section} grid_center`}>
      Въведи поръчка
      <BreakdownInput/>
    </section>
  )
}
