# Design System: 03 - Button Styles

ปุ่ม (Buttons) เป็นส่วนประกอบหลักสำหรับการกระทำของผู้ใช้ (user actions) การออกแบบจะเน้นความชัดเจน สม่ำเสมอ และให้ Feedback ที่ดีต่อผู้ใช้

## Base Button Style (สไตล์พื้นฐาน)

ปุ่มทุกประเภทจะมีสไตล์พื้นฐานร่วมกัน เพื่อให้มีลักษณะที่สอดคล้องกัน

- **Font Size:** `1rem` (16px)
- **Font Weight:** `600` (Semi-bold)
- **Padding:** `0.75rem 1.5rem` (12px 24px) - ให้พื้นที่กดง่าย
- **Border Radius:** `0.25rem` (4px) - ขอบมนเล็กน้อย ดูทันสมัย
- **Transition:** `all 0.2s ease-in-out` - ทำให้การเปลี่ยนสถานะ (hover) ดูนุ่มนวล
- **Cursor:** `pointer`
- **Display:** `inline-block`
- **Text Align:** `center`
- **No Border:** `border: none` (ยกเว้นปุ่ม Outline)

---

## 1. Primary Button

ใช้สำหรับการกระทำหลักที่สำคัญที่สุดในหน้านั้นๆ เช่น "บันทึก", "สร้าง", "ส่ง"

- **Default:**
    - Background: `Primary (#007BFF)`
    - Text Color: `White (#FFFFFF)`
- **Hover:**
    - Background: `Primary-Dark (#0056b3)`
    - Text Color: `White (#FFFFFF)`
- **Active:**
    - Background: `Primary-Dark (#0056b3)` (เข้มขึ้นไปอีก หรือใช้เงาเพื่อบอกว่าถูกกด)
- **Disabled:**
    - Background: `Gray-200 (#E9ECEF)`
    - Text Color: `Gray-600 (#6C757D)`
    - Cursor: `not-allowed`

---

## 2. Secondary Button (Outline Style)

ใช้สำหรับการกระทำรองลงมา หรือเพื่อให้ผู้ใช้มีทางเลือกอื่นที่ไม่ใช่การกระทำหลัก เช่น "ยกเลิก", "ดูรายละเอียด"

- **Default:**
    - Background: `Transparent`
    - Text Color: `Primary (#007BFF)`
    - Border: `1px solid #007BFF`
- **Hover:**
    - Background: `Primary (#007BFF)`
    - Text Color: `White (#FFFFFF)`
- **Active:**
    - Background: `Primary-Dark (#0056b3)`
    - Text Color: `White (#FFFFFF)`
- **Disabled:**
    - Background: `Transparent`
    - Text Color: `Gray-600 (#6C757D)`
    - Border: `1px solid #CED4DA`
    - Cursor: `not-allowed`

---

## 3. Danger Button

ใช้สำหรับการกระทำที่ต้องระวังและอาจมีผลกระทบรุนแรง เช่น "ลบ", "ยืนยันการลบ"

- **Default:**
    - Background: `Danger (#DC3545)`
    - Text Color: `White (#FFFFFF)`
- **Hover:**
    - Background: `#c82333` (a darker red)
    - Text Color: `White (#FFFFFF)`
- **Active:**
    - Background: `#c82333`
- **Disabled:**
    - Background: `Gray-200 (#E9ECEF)`
    - Text Color: `Gray-600 (#6C757D)`
    - Cursor: `not-allowed`

---

ขั้นตอนต่อไป ผมจะออกแบบ `Input Components` ครับ