# BeReading — Where Books Come Alive

The premium reading engagement platform for private schools. BeReading transforms physical books into interactive reading journeys with missions, progress tracking, and elegant gamification — designed for 6th-9th grade.

## Product Vision

BeReading adds a smart digital layer to physical reading. Students read real books and engage through the app — completing missions, earning XP, building streaks, and leveling up. Teachers assign books with zero friction. Parents follow along without hovering. Schools measure reading culture impact.

**Not** a generic LMS. **Not** a toy. A premium product schools actually want to pilot.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4** + shadcn/ui
- **Framer Motion** (premium animations)
- **Lucide React** (icons)
- Mock data layer structured for Supabase migration

## How to Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Premium landing page |
| `/app/student` | Student journey — reading progress, missions, XP |
| `/app/student/books` | Book library and current reading |
| `/app/student/missions` | Mission timeline with checkpoints |
| `/app/student/profile` | Personal profile and badge collection |
| `/app/teacher` | Teacher dashboard — class overview |
| `/app/teacher/classes` | Class management |
| `/app/teacher/missions` | Mission creation and library |
| `/app/teacher/library` | Book library for assignment |
| `/app/family` | Family view — child's progress |
| `/app/family/activity` | Activity timeline |
| `/app/admin` | School overview dashboard |
| `/app/admin/classes` | All classes performance |
| `/app/admin/settings` | School settings |

## Modules

### Landing Page
- Hero with live product preview
- Features grid (6 core features)
- How it Works (3-step flow)
- Audience cards (teacher, student, family, school)
- Pricing (Pilot / School / Network)
- CTA section + Footer

### Student Experience
- Reading journey with current book progress
- XP, levels, streaks, badges
- Mission timeline (checkpoints, reflections, challenges, discussions)
- Personal profile and badge collection

### Teacher Experience
- Class overview with engagement scores
- Student progress monitoring (ahead/on-track/behind indicators)
- Mission library with creation flow
- Book library with assignment capability

### Family Experience
- Child's reading overview
- Weekly reading bar chart
- Recent activity timeline

### Admin / School
- School-wide metrics
- Class performance breakdown
- Top books ranking
- Settings management

## Design Language

- Warm literary palette (amber/gold accents, deep navy, cream surfaces)
- Playfair Display headings + Inter body text
- Premium card-based layouts with Framer Motion
- Glass morphism navigation
- Responsive (mobile bottom nav + desktop sidebar)
- Role switcher for demo navigation

## Next Steps

1. Supabase integration (Auth + PostgreSQL)
2. Mission completion interactive flow
3. Real-time progress updates
4. Teacher mission builder
5. Family email notifications
6. School onboarding flow
7. Analytics deep-dive
8. Production deployment

## Monetization

- **Pilot**: Free 30 days, 1 class
- **School**: R$ 12/student/month
- **Network**: Custom pricing for school groups
