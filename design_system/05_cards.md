# Design System: 05 - Card/Panel Components

Cards (หรือ Panels) เป็น UI container ที่ยืดหยุ่นและนิยมใช้มากที่สุดใน Dashboard เพื่อจัดกลุ่มข้อมูลที่เกี่ยวข้องกันให้เป็นสัดส่วนและเข้าใจง่าย

## Base Card Style (สไตล์พื้นฐาน)

สไตล์หลักของ Card ที่จะใช้เป็นพื้นฐานสำหรับทุกส่วน

- **Background Color:** `White (#FFFFFF)`
- **Border:** `1px solid #E9ECEF` (Gray-200) - เส้นขอบบางๆ เพื่อให้เห็นขอบเขตชัดเจน
- **Border Radius:** `0.5rem` (8px) - ขอบมนที่ดูนุ่มนวลและทันสมัย
- **Box Shadow:** `0 2px 4px rgba(0,0,0,0.05)` - เงาจางๆ เพื่อให้ Card ลอยขึ้นจากพื้นหลังเล็กน้อย
- **Margin Bottom:** `1.5rem` (24px) - เพื่อสร้างระยะห่างระหว่าง Card ที่วางต่อกันในแนวตั้ง

## Card Structure (โครงสร้าง)

Card ประกอบด้วย 3 ส่วนหลัก (เป็น optional ทั้งหมด)

1.  **`.card-header`**: ส่วนหัวเรื่อง
2.  **`.card-body`**: ส่วนเนื้อหาหลัก
3.  **`.card-footer`**: ส่วนท้าย (มักใช้ใส่ปุ่ม Action)

### 1. Card Header

ส่วนหัวของ Card ใช้สำหรับแสดงชื่อหรือหัวข้อของข้อมูลใน Card นั้นๆ

- **Padding:** `1rem 1.25rem` (16px 20px)
- **Background Color:** `Gray-100 (#F8F9FA)` - สีพื้นหลังที่เข้มกว่าส่วน Body เล็กน้อย
- **Border Bottom:** `1px solid #E9ECEF` (Gray-200) - เส้นคั่นระหว่าง Header และ Body
- **Font Size (Title):** `1.25rem` (20px) - เทียบเท่า `<h4>`
- **Font Weight (Title):** `700` (Bold)

### 2. Card Body

ส่วนเนื้อหาหลักของ Card สามารถใส่ได้ทั้งข้อความ, กราฟ, ตาราง หรือฟอร์ม

- **Padding:** `1.25rem` (20px) - ให้มีพื้นที่ว่างรอบเนื้อหา

### 3. Card Footer

ส่วนท้ายของ Card มักใช้เป็นที่วางปุ่ม Actions เช่น "Save Changes", "View Details"

- **Padding:** `1rem 1.25rem` (16px 20px)
- **Background Color:** `Gray-100 (#F8F9FA)`
- **Border Top:** `1px solid #E9ECEF` (Gray-200)
- **Text Align:** `right` - โดยทั่วไปจะวางปุ่มไว้ทางขวา

## Example Usage

```html
<div class="card">
  <div class="card-header">
    <h4>Recent Orders</h4>
  </div>
  <div class="card-body">
    <p>This is where the list of recent orders will be displayed.</p>
    <!-- Table or other content goes here -->
  </div>
  <div class="card-footer">
    <button class="btn btn-secondary">View All Orders</button>
  </div>
</div>
```

---

ขั้นตอนถัดไป จะเป็นการออกแบบ `Table Components` ครับ