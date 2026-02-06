# Design System: 04 - Input Components

Input Components เป็นองค์ประกอบพื้นฐานสำหรับการรับข้อมูลจากผู้ใช้ในฟอร์มต่างๆ การออกแบบจะเน้นความเรียบง่าย, ใช้งานสะดวก และแสดงผลตอบรับ (feedback) ของแต่ละสถานะอย่างชัดเจน

## Form Structure (โครงสร้างฟอร์ม)

องค์ประกอบของฟอร์มโดยทั่วไปจะประกอบด้วย:
1.  **Label:** ป้ายกำกับที่อธิบายว่า Input นั้นคืออะไร
2.  **Input Field:** ช่องสำหรับกรอกข้อมูล
3.  **Help Text:** (Optional) ข้อความช่วยเหลือหรืออธิบายเพิ่มเติม
4.  **Error Message:** ข้อความแจ้งเตือนเมื่อกรอกข้อมูลผิดพลาด

## 1. Text Input

สไตล์สำหรับช่องกรอกข้อความทั่วไป (`<input type="text">`, `<input type="email">`, `<textarea>`, etc.)

- **Base Style:**
    - **Font Size:** `1rem` (16px)
    - **Padding:** `0.75rem 1rem` (12px 16px)
    - **Border:** `1px solid #CED4DA` (Gray-400)
    - **Border Radius:** `0.25rem` (4px)
    - **Background Color:** `White (#FFFFFF)`
    - **Width:** `100%` (เพื่อให้เต็มความกว้างของ container)
    - **Transition:** `border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out`

- **States:**
    - **Focus:** เมื่อผู้ใช้กำลังพิมพ์
        - **Border Color:** `Primary (#007BFF)`
        - **Box Shadow:** `0 0 0 0.2rem rgba(0, 123, 255, 0.25)` (เงาจางๆ สีฟ้า)
    - **Disabled:** เมื่อไม่สามารถใช้งานได้
        - **Background Color:** `Gray-200 (#E9ECEF)`
        - **Text Color:** `Gray-600 (#6C757D)`
        - **Cursor:** `not-allowed`
    - **Error / Invalid:** เมื่อข้อมูลไม่ถูกต้อง
        - **Border Color:** `Danger (#DC3545)`
        - **Text Color:** `Danger (#DC3545)`
        - **Box Shadow (on focus):** `0 0 0 0.2rem rgba(220, 53, 69, 0.25)` (เงาจางๆ สีแดง)

## 2. Label

ป้ายกำกับสำหรับ Input Field, ใช้ tag `<label>`.

- **Font Size:** `1rem` (16px) (ตาม Typography)
- **Font Weight:** `600` (Semi-bold) (ตาม Typography)
- **Margin Bottom:** `0.5rem` (8px) - เพื่อให้มีระยะห่างจาก Input field

## 3. Help & Error Text

ข้อความอธิบายเพิ่มเติม หรือข้อความแจ้งเตือนข้อผิดพลาดที่แสดงใต้ Input field.

- **Element:** `<small>`
- **Font Size:** `0.875rem` (14px)
- **Margin Top:** `0.25rem` (4px)
- **Color (Help Text):** `Gray-600 (#6C757D)`
- **Color (Error Text):** `Danger (#DC3545)`

---

ขั้นตอนถัดไป จะเป็นการออกแบบ `Card/Panel Components` ครับ