# Design System: 07 - Status Badges

Badges (หรือ Tags) เป็นองค์ประกอบขนาดเล็กที่ใช้สำหรับแสดงสถานะ, หมวดหมู่, หรือข้อมูลสั้นๆ ที่ต้องการเน้นให้เห็นชัดเจน มักใช้ร่วมกับตาราง, รายการ (lists), หรือการ์ดข้อมูล

## Base Badge Style (สไตล์พื้นฐาน)

- **Display:** `inline-block`
- **Padding:** `0.3em 0.65em` - ใช้หน่วย `em` เพื่อให้ขนาดของ padding สัมพันธ์กับขนาดตัวอักษร
- **Font Size:** `0.875em` (จะเล็กลงตาม font ของ parent)
- **Font Weight:** `600` (Semi-bold)
- **Line Height:** `1`
- **Text Align:** `center`
- **Vertical Align:** `baseline`
- **Border Radius:** `10rem` - ทำให้เป็นทรงแคปซูล (pill-shaped)

## Badge Variants (รูปแบบตามสี)

เราจะสร้าง Badges ให้สอดคล้องกับ Semantic Colors ที่ได้กำหนดไว้ เพื่อการสื่อสารความหมายที่ชัดเจน โดยจะใช้สีโทนอ่อนเป็นพื้นหลังและสีโทนเข้มเป็นตัวอักษรเพื่อความสบายตาในการอ่าน

### 1. Default/Neutral Badge
ใช้สำหรับสถานะทั่วไป หรือหมวดหมู่ที่ไม่ได้มีความหมายพิเศษ

- **Background Color:** `Gray-200 (#E9ECEF)`
- **Text Color:** `Gray-800 (#343A40)`

### 2. Success Badge
ใช้สำหรับสถานะที่สำเร็จ, ผ่าน, หรือออนไลน์

- **Background Color:** `Secondary-Light (#d4edda)`
- **Text Color:** `Secondary (#28A745)`

### 3. Warning Badge
ใช้สำหรับสถานะที่ต้องให้ความสนใจ, การแจ้งเตือน, หรือ "กำลังดำเนินการ"

- **Background Color:** `#fff3cd` (light yellow)
- **Text Color:** `#856404` (dark yellow)

### 4. Danger Badge
ใช้สำหรับสถานะที่เป็นอันตราย, ถูกปฏิเสธ, ล้มเหลว

- **Background Color:** `#f8d7da` (light red)
- **Text Color:** `Danger (#DC3545)`

### 5. Info Badge
ใช้สำหรับสถานะที่เป็นข้อมูล, หรือสถานะ "ใหม่"

- **Background Color:** `#d1ecf1` (light cyan)
- **Text Color:** `Info (#17A2B8)`

### 6. Primary Badge
ใช้สำหรับเน้นข้อมูลบางอย่างเป็นพิเศษด้วยสีหลักของแบรนด์

- **Background Color:** `Primary-Light (#cce5ff)`
- **Text Color:** `Primary (#007BFF)`

## Example Usage

```html
<span class="badge badge-success">Shipped</span>
<span class="badge badge-warning">Processing</span>
<span class="badge badge-danger">Cancelled</span>
```

---

ตอนนี้ผมได้ออกแบบ Design System พื้นฐานครบทั้ง 7 ส่วนตามที่ระบุใน Task 1 แล้วครับ ประกอบด้วย:
1.  Color Palette
2.  Typography
3.  Button Styles
4.  Input Components
5.  Card/Panel Components
6.  Table Components
7.  Status Badges

ขั้นตอนต่อไป ผมจะเริ่มดำเนินการใน **Task 2: สร้าง Mockups/Wireframes** สำหรับหน้าต่างๆ โดยใช้ Design System ที่เราเพิ่งสร้างขึ้นมานี้ครับ