# Full-Stack Portfolio with Layered Architecture

A modern, professional portfolio website with a **React/Next.js frontend** and **Spring Boot backend** following proper layered architecture principles.

## 🏗️ Architecture Overview

### Backend (Spring Boot + JPA)
```
┌─────────────────────────────────────┐
│     Controller Layer (REST API)     │  ← @RestController
├─────────────────────────────────────┤
│      Service Layer (Business)       │  ← @Service + @Transactional
├─────────────────────────────────────┤
│    Repository Layer (Data Access)   │  ← @Repository + JPA
├─────────────────────────────────────┤
│      Domain/Model Layer (Entities)  │  ← @Entity + JPA Annotations
└─────────────────────────────────────┘
```

### Frontend (React/Next.js)
```
┌─────────────────────────────────────┐
│        Components (UI Layer)        │
├─────────────────────────────────────┤
│        API Layer (Services)         │
├─────────────────────────────────────┤
│      Type Definitions (Models)      │
└─────────────────────────────────────┘
```

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Navigation.tsx   # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Projects.tsx     # Projects showcase
│   ├── Skills.tsx       # Skills display
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Footer
└── public/              # Static assets
```

## 🎨 Customization

- Update project information in `components/Projects.tsx`
- Modify skills in `components/Skills.tsx`
- Change color scheme in `tailwind.config.ts`
- Update personal information in `components/About.tsx` and `components/Contact.tsx`

## 📝 Featured Projects

- Real-Time Data Pipeline Architecture
- SplitTracker (Expense Tracking App)
- Enterprise Data Warehouse
- Tech Blog Platform
- ML Pipeline Orchestration
- Fitness Tracking App
- Cloud Cost Optimization Platform
- Customer Analytics Dashboard
- Distributed ETL Framework

## 🌟 Design Inspiration

This portfolio draws inspiration from modern component libraries like ReactBits, featuring:
- Smooth gradient animations
- Glass-morphism effects
- Micro-interactions
- Contemporary color schemes
- Professional typography

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with 💜 by a passionate Data Engineer
