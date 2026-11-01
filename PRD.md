# PRD: AI Hub Landing Page (PRD-ID: PRD--001)

- เวอร์ชัน: 1.0
- สถานะ: Draft
- Owner: ไม่ระบุ
- อัปเดตล่าสุด: 2026-10-24

## 1. Product Context

- AI Hub เป็นแพลตฟอร์มที่รวม AI Models และ AI Agents จากหลาย Provider ให้ผู้ใช้เลือก Model เปรียบเทียบราคา ทดลองใช้งาน และเชื่อมต่อ API ผ่าน Endpoint เดียว มี Marketplace สำหรับ AI Agents และ Workflow
- PRD นี้ครอบคลุม Landing Page ที่ใช้อธิบาย Product, Features, Models, Pricing และส่วน Preview ที่เกี่ยวข้อง
- ต้องทำ Landing Page ในช่วงนี้เพราะลูกค้าส่วนใหญ่ยังไม่เข้าใจว่า Product ทำอะไร และต้องคุยกับทีมขายก่อนเริ่มใช้งาน เว็บไซต์จึงควรอธิบาย Product ได้เอง เพื่อลดการสูญเสีย Conversion และเวลา

## 2. Problem Statement

- **P-001:** ลูกค้าเข้ามาที่เว็บไซต์แล้วยังไม่เข้าใจว่า Product ทำอะไร และต้องคุยกับทีมขายก่อนจึงเริ่มใช้งานได้ ส่งผลให้เสีย Conversion และเสียเวลา
- **P-002:** Developer และ AI Engineer ต้องสมัครหลาย Platform มี API หลายชุด เปรียบเทียบ Model ยาก และพบ Documentation กระจัดกระจาย
- **P-003:** ลูกค้าอาจออกจากเว็บไซต์เร็ว ไม่เข้าใจ Value ของ Product และไม่เริ่มทดลองใช้งาน

## 3. Goals & Non-goals

- **Goals**
  - เพิ่มจำนวนผู้สมัครและการใช้งาน API
  - สร้างความน่าเชื่อถือให้ Product และลดภาระทีม Sales
  - ช่วยให้ผู้ใช้เข้าใจ Product ภายในไม่กี่วินาที ดูราคา เปรียบเทียบ Model และสมัครได้ทันที
  - เพิ่ม Conversion Rate, Sign Up, การกด CTA และเวลาที่ผู้ใช้ใช้บนเว็บไซต์
  - เป้าหมายเชิงตัวเลขและเกณฑ์ความสำเร็จ: ไม่ระบุ

- **Non-goals**
  - Blog
  - Community
  - Dashboard (ตัว Dashboard; Dashboard Preview บน Landing Page ยังอยู่ในขอบเขต)
  - Search แบบละเอียด
  - User Login
  - Live Playground

## 4. Target Users / Personas

- **Persona 1: Developer และ AI Engineer** — กลุ่มผู้ใช้หลัก ต้องการเข้าใจ Product ดูราคาและเปรียบเทียบ Models โดยไม่ต้องจัดการหลาย Platform, API หลายชุด หรือ Documentation ที่กระจัดกระจาย
- **Persona 2: Startup Founder, Product Manager และ UX Designer ที่ต้องการทดลอง AI** — กลุ่มผู้ใช้รอง ต้องการเข้าใจ Product อย่างรวดเร็ว ดูราคา เปรียบเทียบ Models และสมัครใช้งานได้ทันที

## 5. Use Cases / Jobs To Be Done

- **UC-001:** ในฐานะผู้เข้าชมเว็บไซต์ ฉันต้องการเข้าใจว่า AI Hub คืออะไรภายในไม่กี่วินาที เพื่อให้ตัดสินใจได้ว่าจะเริ่มใช้งานหรือไม่
- **UC-002:** ในฐานะ Developer หรือ AI Engineer ฉันต้องการดูและเปรียบเทียบ AI Models กับราคา เพื่อให้เลือก Model ที่เหมาะกับการใช้งาน
- **UC-003:** ในฐานะผู้ใช้ที่สนใจ AI Hub ฉันต้องการดู Features, AI Agents Marketplace Preview และ Dashboard Preview เพื่อให้เข้าใจความสามารถของ Product
- **UC-004:** ในฐานะผู้ใช้ ฉันต้องการอ่าน Documentation โดยไม่ต้องล็อกอิน เพื่อให้เข้าถึงข้อมูลการใช้งานได้สะดวก
- **UC-005:** ในฐานะผู้ใช้ที่พร้อมเริ่มต้น ฉันต้องการกด Get Started เพื่อไปหน้า Sign Up และเริ่มสมัครใช้งาน

## 6. Assumptions / Constraints / Dependencies

- **Assumptions:** ไม่ได้เพิ่มสมมติฐานด้าน Product นอกเหนือจากข้อมูลที่ระบุในการประชุม
- **Constraints:** ใช้ Next.js และ Deploy บน Vercel; ต้อง Responsive ทุก Device, SEO Friendly, รองรับ Accessibility ระดับ AA และโหลดหน้าแรกไม่เกินสองวินาที
- **Dependencies:** Pricing ต้องดึงจากระบบกลาง; ต้องมีข้อมูล AI Models ล่าสุด; แหล่งข้อมูลและเกณฑ์ Popularity ยังต้องยืนยัน

## 7. Functional Requirements

### FR--001: Hero และการอธิบาย Product

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องมี Hero พร้อมข้อความหลักที่อธิบาย AI Hub และแสดง AI Models ล่าสุด เพื่อให้ผู้ใช้เข้าใจ Product ได้อย่างรวดเร็ว
- Use cases ที่เกี่ยวข้อง: [UC-001]
- ปัญหาที่เกี่ยวข้อง: [P-001, P-003]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชมเว็บไซต์
- Triggers / inputs: ผู้ใช้เข้าชม Landing Page
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เห็นข้อความอธิบาย Product และ AI Models ล่าสุด

### FR--002: รายการ Models และองค์ประกอบเนื้อหา

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องแสดงรายการ AI Models และ Feature Overview พร้อม Feature Cards เพื่อให้ผู้ใช้สำรวจความสามารถและเปรียบเทียบ Models ได้ รวมถึงแสดง AI Agents Marketplace Preview, Dashboard Preview, FAQ และ Footer
- Use cases ที่เกี่ยวข้อง: [UC-002, UC-003]
- ปัญหาที่เกี่ยวข้อง: [P-001, P-002, P-003]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชมเว็บไซต์, โดยเฉพาะ Developer และ AI Engineer
- Triggers / inputs: ผู้ใช้ดูเนื้อหาบน Landing Page
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เห็น Models, Features และ Preview ของ Product

### FR--003: Pricing

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องแสดง Pricing โดยดึงข้อมูลจากระบบกลาง
- Use cases ที่เกี่ยวข้อง: [UC-002]
- ปัญหาที่เกี่ยวข้อง: [P-002]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชมเว็บไซต์
- Triggers / inputs: ผู้ใช้ดูส่วน Pricing; ข้อมูล Pricing จากระบบกลาง
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เห็น Pricing บน Landing Page

### FR--004: Documentation

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องให้ผู้ใช้เข้าถึง Documentation ได้โดยไม่ต้องล็อกอิน
- Use cases ที่เกี่ยวข้อง: [UC-004]
- ปัญหาที่เกี่ยวข้อง: [P-002]
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชมเว็บไซต์
- Triggers / inputs: ผู้ใช้เลือกเข้าดู Documentation
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เปิดอ่าน Documentation ได้โดยไม่ต้องล็อกอิน

### FR--005: CTA

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องมี CTA ได้แก่ Get Started, Explore Models และ View Documentation โดยกฎที่ระบุไว้กำหนดให้ CTA ทุกตัวไปหน้า Sign Up
- Use cases ที่เกี่ยวข้อง: [UC-005]
- ปัญหาที่เกี่ยวข้อง: [P-001, P-003]
- ผู้ใช้งานหลัก / actor หลัก: ผู้ใช้ที่พร้อมเริ่มต้น
- Triggers / inputs: ผู้ใช้กด CTA
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้ถูกนำไปหน้า Sign Up ตามกฎ CTA
- หมายเหตุ: พฤติกรรมของ View Documentation ยังต้องยืนยัน เพราะมีข้อกำหนดให้ Documentation เปิดได้โดยไม่ต้องล็อกอิน

### FR--006: Dark Mode และ Interaction

- คำอธิบาย (ระบุว่า WHAT ไม่ใช่ HOW): Landing Page ต้องใช้ Dark Mode เป็นค่าเริ่มต้น และมี Scroll Animation, Card Hover, Number Counter, Gradient Background Animation และ Smooth Transition
- Use cases ที่เกี่ยวข้อง: [UC-001, UC-002, UC-003]
- ปัญหาที่เกี่ยวข้อง: ไม่ได้ระบุปัญหาเฉพาะที่เชื่อมโยงกับข้อกำหนดนี้
- ผู้ใช้งานหลัก / actor หลัก: ผู้เข้าชมเว็บไซต์
- Triggers / inputs: ผู้ใช้เข้าชมและมีปฏิสัมพันธ์กับหน้าเว็บ
- ผลลัพธ์ที่คาดหวัง: ผู้ใช้เห็นหน้าเว็บใน Dark Mode และพบ Interaction ตามที่ระบุ

## 8. Non-functional Requirements

- **Performance:** หน้าแรกต้องโหลดไม่เกินสองวินาที
- **Reliability:** หากโหลด AI Models ไม่ได้ ให้ใช้ข้อมูล Cache; หาก Pricing API ล่ม ให้แสดง Default Pricing
- **Security / privacy:** ไม่ได้มีการพูดถึง
- **UX / accessibility:** ต้อง Responsive ทุก Device, SEO Friendly และรองรับ Accessibility ระดับ AA; หาก Browser ไม่รองรับ Animation ให้แสดงแบบ Static

## 9. Business Rules

- **BR--001:** Pricing ต้องดึงจากระบบกลาง
- **BR--002:** Documentation ต้องเปิดได้โดยไม่ต้องล็อกอิน
- **BR--003:** CTA ทุกตัวต้องนำไปหน้า Sign Up
- **BR--004:** Hero ต้องแสดง AI Models ล่าสุด
- **[AMBIGUOUS]:** มีช่วงถอดเสียงกล่าวถึง “Features Models ต้องจัดเรียงจาก Popularity” แต่ไม่ชัดว่าหมายถึง Models ส่วนใดหรือเป็นข้อกำหนดการจัดเรียงรายการใด จึงยังไม่กำหนดเป็น Business Rule ที่ยืนยันแล้ว

## 10. User Flows (High-level)

- **FLOW--001: เรียนรู้เกี่ยวกับ AI Hub และสมัครใช้งาน**
  1. ผู้ใช้เข้าเว็บไซต์
  2. อ่าน Hero
  3. เลื่อนดู Features
  4. ดู AI Models
  5. ดู Pricing
  6. อ่าน FAQ
  7. กด Get Started
  8. ไปหน้า Sign Up

## 11. Edge Cases & Error Scenarios

- หากโหลด AI Models ไม่ได้ ให้ใช้ข้อมูล Cache
- หาก Pricing API ล่ม ให้แสดง Default Pricing
- หากรูปภาพโหลดไม่ได้ ให้แสดง Placeholder
- หาก Browser ไม่รองรับ Animation ให้แสดงแบบ Static

## 12. Out-of-scope

- Blog
- Community
- Dashboard (ตัว Dashboard; มีเพียง Dashboard Preview บน Landing Page ที่ระบุไว้ใน Scope)
- Search แบบละเอียด
- User Login
- Live Playground
- ยังไม่ตัดสินใจว่า AI Agent Marketplace จะเปิดในเวอร์ชันแรกหรือเวอร์ชันถัดไป; ระบุเพียง Marketplace Preview บน Landing Page

## 13. Success Metrics

- Conversion Rate สูงขึ้น
- Sign Up เพิ่มขึ้น
- จำนวนการกด CTA เพิ่มขึ้น
- ผู้ใช้ใช้เวลาอยู่ในเว็บไซต์นานขึ้น
- ค่าเป้าหมายเชิงตัวเลขและวิธีวัดผล: ไม่ระบุ

## 14. Acceptance Criteria (แยกตาม FR)

### AC--001 (สำหรับ FR--001)

GIVEN ผู้ใช้เข้าชม Landing Page  
WHEN หน้าเว็บแสดง Hero  
THEN ผู้ใช้เห็นข้อความหลักที่อธิบาย AI Hub และ AI Models ล่าสุด **[DRAFT: ยังไม่ระบุแหล่งข้อมูลหรือเกณฑ์ว่า Model ใดถือเป็นรายการล่าสุด]**

### AC--002 (สำหรับ FR--002)

GIVEN ผู้ใช้เข้าชม Landing Page  
WHEN ผู้ใช้ดูส่วนเนื้อหาและ Preview  
THEN หน้าเว็บแสดงรายการ AI Models, Feature Overview, Feature Cards, AI Agents Marketplace Preview, Dashboard Preview, FAQ และ Footer

### AC--003 (สำหรับ FR--003)

GIVEN ผู้ใช้เปิดดูส่วน Pricing  
WHEN ระบบแสดง Pricing  
THEN Pricing ที่แสดงมาจากระบบกลาง

### AC--004 (สำหรับ FR--004)

GIVEN ผู้ใช้ต้องการอ่าน Documentation  
WHEN ผู้ใช้เปิด Documentation โดยไม่ได้ล็อกอิน  
THEN ผู้ใช้เข้าถึง Documentation ได้

### AC--005 (สำหรับ FR--005)

GIVEN ผู้ใช้กด CTA บน Landing Page  
WHEN CTA เป็น Get Started, Explore Models หรือ View Documentation  
THEN ผู้ใช้ถูกนำไปหน้า Sign Up **[DRAFT: ข้อกำหนดการนำ View Documentation ไป Sign Up ยังขัดแย้งกับการเปิด Documentation โดยไม่ต้องล็อกอิน]**

### AC--006 (สำหรับ FR--006)

GIVEN ผู้ใช้เข้าชม Landing Page  
WHEN หน้าเว็บโหลดและผู้ใช้มีปฏิสัมพันธ์กับหน้า  
THEN Dark Mode เป็นค่าเริ่มต้น และหน้าเว็บมี Scroll Animation, Card Hover, Number Counter, Gradient Background Animation และ Smooth Transition

## 15. Open Questions

- จะใช้วิดีโอ Hero หรือ Illustration?
- จะมี AI Chat Assistant บนหน้าเว็บหรือไม่?
- รูปแบบ Pricing เป็นอย่างไร?
- จะเปิด AI Agent Marketplace ในเวอร์ชันแรกหรือเวอร์ชันถัดไป?
- CTA ทุกตัวต้องไปหน้า Sign Up รวมถึง View Documentation หรือไม่? ควรแยกพฤติกรรมของ CTA นี้จากการเข้าถึง Documentation โดยไม่ต้องล็อกอินอย่างไร?
- “AI Models ล่าสุด” นิยามอย่างไร และใช้แหล่งข้อมูลใด?
- ช่วงถอดเสียงเรื่องการจัดเรียง “Features Models” ตาม Popularity หมายถึงรายการใด ต้องจัดเรียง Models ทั้งหมดหรือเฉพาะบางส่วน และคำนวณ Popularity จากข้อมูลใด?
- Default Pricing ที่แสดงเมื่อ Pricing API ล่มคืออะไร?
- เป้าหมายเชิงตัวเลขและวิธีวัด Conversion Rate, Sign Up, การกด CTA และเวลาที่ผู้ใช้อยู่บนเว็บไซต์เป็นอย่างไร?
- Dashboard Preview ที่อยู่ใน Scope แตกต่างจาก Dashboard ที่อยู่นอก Release นี้อย่างไร?
- ไม่ระบุแหล่งข้อมูลหรือรายละเอียดการเชื่อมต่อระบบ Pricing กลาง
- ไม่ระบุ Owner ของ PRD, ผู้รับผิดชอบงานถัดไป หรือกำหนดส่ง

## 16. Changelog

- v1.0 - ดราฟต์แรกจาก discovery meeting
