# Design System: 06 - Table Components

ตาราง (Tables) เป็นสิ่งจำเป็นสำหรับ Admin Dashboard ในการแสดงผลข้อมูลที่มีโครงสร้าง เช่น รายการผู้ใช้, คำสั่งซื้อ, หรือสินค้า การออกแบบจะเน้นความสามารถในการอ่าน (Readability) และความสะอาดตา

## Base Table Style (สไตล์พื้นฐาน)

- **Width:** `100%` - ให้ตารางเต็มความกว้างของ container
- **Border Collapse:** `collapse` - เพื่อให้เส้นขอบรวมเป็นเส้นเดียว
- **Background Color:** `White (#FFFFFF)`
- **Contained within:** ควรอยู่ใน `.card` หรือ container ที่มี `overflow-x: auto;` เพื่อรองรับตารางที่มีคอลัมน์เยอะบนจอขนาดเล็ก

## Table Header (`<thead>`)

ส่วนหัวของตาราง ควรมีความโดดเด่นเพื่อแยกจากข้อมูลส่วนเนื้อหา

- **Background Color:** `Gray-100 (#F8F9FA)`
- **Font Weight:** `600` (Semi-bold)
- **Text Align:** `left`
- **Border Bottom:** `2px solid #CED4DA` (Gray-400) - เส้นขอบล่างที่หนาขึ้นเพื่อแบ่งโซนชัดเจน

## Table Body (`<tbody>`)

ส่วนเนื้อหาของตาราง ประกอบด้วยแถวของข้อมูล

- **Row Border:** แต่ละแถว (`<tr>`) จะมีเส้นขอบล่างบางๆ คั่น
    - `border-bottom: 1px solid #E9ECEF` (Gray-200)

- **Striped Rows (แถวลายทาง):** สำหรับตารางที่มีข้อมูลจำนวนมาก การสลับสีพื้นหลังจะช่วยให้อ่านง่ายขึ้น
    - `tbody tr:nth-of-type(odd)`
    - **Background Color:** `Gray-100 (#F8F9FA)`

- **Hover State:** เมื่อผู้ใช้นำเมาส์ไปวางเหนือแถว ควรมีการเน้นสีเพื่อบ่งบอกว่ากำลังจะเลือกแถวไหน
    - `tbody tr:hover`
    - **Background Color:** `#cce5ff` (Primary-Light) - หรือสีอื่นที่ไม่รบกวนการอ่านเกินไป

## Table Cells (`<th>`, `<td>`)

สไตล์สำหรับแต่ละเซลล์ในตาราง

- **Padding:** `1rem 1.25rem` (16px 20px) - ให้มีพื้นที่ว่างที่เหมาะสม
- **Vertical Align:** `middle` - จัดให้เนื้อหาอยู่กึ่งกลางแนวตั้ง

## Example Usage

```html
<div class="card">
    <div class="card-body" style="overflow-x: auto;">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>#1234</td>
                    <td>John Doe</td>
                    <td>Shipped</td>
                    <td>$49.99</td>
                    <td>2024-10-26</td>
                </tr>
                <tr>
                    <td>#1235</td>
                    <td>Jane Smith</td>
                    <td>Processing</td>
                    <td>$102.50</td>
                    <td>2024-10-26</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

---

ขั้นตอนถัดไป ซึ่งเป็นส่วนสุดท้ายของ Design System พื้นฐาน คือ `Status Badges` ครับ