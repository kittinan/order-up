# OrderUp Admin Dashboard - Design Guidelines

เอกสารนี้รวบรวมกฎ, หลักการ, และแนวทางปฏิบัติสำหรับการพัฒนา User Interface (UI) ของ OrderUp Admin Dashboard เพื่อให้เกิดความสม่ำเสมอ (Consistency), ง่ายต่อการบำรุงรักษา (Maintainability), และทุกคนสามารถเข้าถึงได้ (Accessibility)

---

## 1. Spacing & Layout (ระยะห่างและการจัดวาง)

### 1.1. Spacing Scale (มาตรวัดระยะห่าง)

เราใช้ระบบระยะห่างที่อิงจาก **8-point grid system** ทุกๆ ค่า `margin`, `padding`, และ `gap` ควรเป็นผลคูณของ `8px` เพื่อให้เกิดความสม่ำเสมอและสมดุลทางสายตา

- **Base Unit:** `1rem = 16px` (ในการคำนวณ)
- **Core Unit:** `0.5rem = 8px`

| Multiplier | Pixels | Rem    | Common Use Case                               |
| :---       | :---    | :---   | :-------------------------------------------- |
| 0.25x      | 2px     | 0.125rem | Fine-tuning, micro-adjustments                |
| 0.5x       | 4px     | 0.25rem  | Gaps between small elements (e.g., badge text) |
| **1x**     | **8px** | **0.5rem** | Small gaps, item spacing in a list          |
| 2x         | 16px    | 1rem     | Padding within components (e.g., inputs, buttons) |
| 3x         | 24px    | 1.5rem   | Gaps between components, card padding         |
| 4x         | 32px    | 2rem     | Page-level padding, large section spacing     |
| 6x         | 48px    | 3rem     | Very large gaps between page sections         |

**Rule of thumb:** ใช้ค่าเหล่านี้เสมอ อย่าใช้ค่าสุ่ม (e.g., `13px`, `21px`).

### 1.2. Layout
- **Flexbox & Grid:** ควรใช้ CSS Flexbox และ Grid เป็นเครื่องมือหลักในการจัดวาง Layout
- **Flexbox:** เหมาะสำหรับการจัดวางในมิติเดียว (แถวเดียวหรือคอลัมน์เดียว) เช่น การจัดวางปุ่มใน Card Footer, การจัดเรียงฟิลเตอร์
- **Grid:** เหมาะสำหรับการจัดวางในสองมิติที่ซับซ้อน เช่น โครงสร้างหน้าหลัก, Layout ของฟอร์ม

---

## 2. Responsive Breakpoints (การแสดงผลตามขนาดจอ)

เพื่อให้ Dashboard ใช้งานได้ดีในทุกอุปกรณ์ เรากำหนด Breakpoints มาตรฐานดังนี้:

| Name    | Breakpoint | Description                               |
| :------ | :---       | :---------------------------------------- |
| Mobile  | < 768px    | Single-column layout, stacked elements.   |
| Tablet  | ≥ 768px    | Two-column layouts, less stacking.        |
| Desktop | ≥ 1024px   | Full layouts, multi-column displays.      |
| Large Desktop | ≥ 1440px | Wider content area, potentially more columns. |

**Mobile-First Approach:** ควรออกแบบโดยเริ่มจากหน้าจอมือถือก่อน แล้วค่อยๆ ขยาย Layout สำหรับจอที่ใหญ่ขึ้นโดยใช้ `min-width` media queries.

---

## 3. Accessibility (a11y) (การเข้าถึง)

การออกแบบและพัฒนาต้องคำนึงถึงผู้ใช้งานทุกคน รวมถึงผู้ที่มีความบกพร่องทางร่างกาย

### 3.1. Semantic HTML
- **ใช้ HTML tags ให้ถูกความหมาย:** ใช้ `<nav>`, `<main>`, `<section>`, `<article>`, `<button>` แทนที่จะใช้ `<div>` ในทุกที่
- **Headings (`<h1>`-`<h6>`):** ต้องเรียงลำดับอย่างถูกต้อง `<h1>` ควรมีเพียงหนึ่งเดียวในหน้า และไม่ควรข้ามลำดับ (เช่น จาก `<h2>` ไป `<h4>`)

### 3.2. Keyboard Navigation
- **Focus States:** ทุกองค์ประกอบที่โต้ตอบได้ (links, buttons, inputs) จะต้องมีสถานะ `:focus` ที่ชัดเจน (เราได้กำหนดไว้ใน `04_inputs.md` และ `03_buttons.md` แล้ว)
- **Logical Order:** ลำดับการ Tab ควรเป็นไปตามลำดับการอ่านของสายตา (ซ้ายไปขวา, บนลงล่าง)

### 3.3. Color Contrast
- **WCAG AA:** อัตราส่วนความคมชัดของสีระหว่างตัวอักษรและพื้นหลังต้องผ่านมาตรฐาน WCAG AA (4.5:1 สำหรับ Normal text, 3:1 สำหรับ Large text)
- **Tool:** ใช้เครื่องมือตรวจสอบ Contrast Checker เพื่อให้แน่ใจว่าสีที่เราเลือก (จาก `01_colors.md`) ถูกนำไปใช้อย่างถูกต้อง

### 3.4. Forms
- **Labels:** ทุก `<input>` จะต้องมี `<label>` ที่เชื่อมกันด้วย `for` และ `id` attribute
- **Error Messages:** ข้อความแสดงข้อผิดพลาดต้องเชื่อมโยงกับ Input field โดยใช้ `aria-describedby` เพื่อให้ Screen Readers สามารถอ่านได้

---

เอกสารนี้ถือเป็น "Single Source of Truth" สำหรับทีมพัฒนา หากมีการเปลี่ยนแปลงใดๆ ใน Design System จะต้องมาอัปเดตที่ไฟล์นี้และไฟล์ที่เกี่ยวข้องเสมอ