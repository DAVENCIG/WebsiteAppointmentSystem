SARMS – Parroquia de San Pedro Apostol Sacramental Appointment Website
(Parishioner-facing site — Figma design brief)

PROJECT CONTEXT
Design a responsive website (desktop + mobile) for parishioners of Parroquia de San Pedro
Apostol (PdSPA) in Vinzons, Camarines Norte, Philippines, to request sacramental certificates,
book pamisa (mass intentions), and look up burial records — without any online payment
gateway. The flow is modeled after University of Camarines Norte's own Online Appointment
Form (OAF) system: a 5-step wizard (Reminders → Information → Appointment → Review →
Finish) with a persistent "Quick Access" sidebar of parish links. Re-skin that same proven UX
pattern in the parish's own identity rather than the university's.

BRAND & VISUAL STYLE
- Primary color: dark forest green #1B4332
- Accent color: gold #B8860B
- Neutral backgrounds: off-white #F4F2EC, card white #FFFFFF, borders #C9C4B4
- Typography: clean sans-serif (e.g., Inter or Poppins), bold headings, generous line height
- Tone: warm, trustworthy, parish-appropriate — not corporate; subtle religious motifs okay
  (e.g., a simple cross or "P" monogram in the logo mark) but keep it understated
- Header: dark green bar, circular parish logo mark on the left, parish name + page subtitle,
  thin gold divider line beneath the header
- Buttons: rounded corners, dark green primary / light gray secondary, gold used sparingly
  for highlights (selected calendar date, active step, links)

GLOBAL COMPONENTS
1. Site header — logo, "Parroquia de San Pedro Apostol" wordmark, page subtitle
2. 5-step wizard navigation bar — Reminders / Information / Appointment / Review / Finish,
   with 3 states: completed (green fill), current (gold fill), upcoming (light gray fill)
3. "Quick Access" sidebar (right rail on desktop, collapsible drawer on mobile) — links to
   PdSPA Official FB Page, SOCCOMM FB Page, Coro de San Pedro FB Page, Youth Ministry FB
   Page, CFC – Youth for Christ Page, Parish Office Contact, Mass Schedule
4. Footer — parish address, office hours, contact number, social links

PAGES TO DESIGN

1. Landing / Home Page
   - Hero section with parish photo/banner, welcome message
   - Two clear entry points: "Request an Appointment" (primary CTA) and
     "Find a Name in Campo Santo" (secondary CTA)
   - Quick links to mass schedule and parish announcements

2. About PdSPA Page
   - Short parish history/background, office hours, location map embed placeholder

3. Service Type Selection Page
   - Grid or list of selectable cards: Baptismal Certificate, Confirmation Certificate,
     First Holy Communion Certificate, Certificate of Matrimony, Certificate of Burial/Death,
     Certificate of No Record, Certificate of Good Standing, and Pamisa (mass intention)
   - Selecting a card proceeds into the wizard flow below

4. Appointment Wizard — Step 1: Reminders
   - Plain-language checklist of requirements/reminders before booking (valid ID, minimum
     lead time, etc.), "I understand" acknowledgment, Next button

5. Appointment Wizard — Step 2: Information
   - Personal & Contact Information form: Last Name, First Name, Middle Name, Email,
     Province/City/Barangay/Street (cascading dropdowns + text), Mobile Number
   - Previous / Next buttons

6. Appointment Wizard — Step 3: Appointment (the calendar screen)
   - Select Service Type dropdown (pre-filled from step 3 if coming from Service Type page)
   - Select Preferred Date via an actual calendar month-grid widget (not a text field) —
     show month navigation arrows, day-of-week header row, selected date highlighted in
     green
   - Select Time Slot dropdown (Morning / Afternoon)
   - Payment Method radio: Bank Transfer / Pay in person — if Bank Transfer, reveal a
     "Bank Reference No." input field with parish bank details shown alongside
   - Purpose/Remarks text area
   - Previous / Next buttons

7. Bank Transfer Payment Instructions (modal or inline panel within Step 3)
   - Parish bank name, account name, account number, reference number format, note that
     staff will verify manually — no live payment processing

8. Appointment Wizard — Step 4: Review
   - Two-column summary: Personal & Contact Information | Appointment Details
   - "Edit" links back to each step
   - Prominent "Submit Appointment" button

9. Appointment Wizard — Step 5: Finish / Confirmation
   - Success state with a generated reference number, summary of the request,
     "Save/print this reference number" note, button to check status later

10. Request Status Tracker Page
    - Simple lookup form (reference number + email/mobile), returns current status
      (Pending / Verified / Rejected / Completed)

11. Funeral / Finding Names Search Page + Results Page
    - Search form: deceased name, approximate date of death/burial
    - Results list: name, date of burial, plot/section reference, "Request assistance"
      button linking back into the appointment flow

12. Contact / Parish Office Info Page
    - Office hours, address, phone/email, embedded map, links to parish social pages

DELIVERABLE
- Desktop frames (1440px) and mobile frames (390px) for all pages above
- Reusable component set: header, step navigation, form fields, calendar widget, buttons,
  Quick Access sidebar/drawer, service-type cards
- Keep the calendar widget as a distinct, reusable component since it's the system's
  signature interaction (replaces the plain date-dropdown pattern from the reference site)