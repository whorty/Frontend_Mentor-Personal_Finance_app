# 💸 Personal Finance App

This repository contains my solution to the Frontend Mentor challenge: Personal Finance App.

The goal of this project was to build a fully accessible, responsive personal finance dashboard that closely matches the provided design while delivering a complete, interactive user experience.

## 🚀 Tech Stack

- React + Vite
- TypeScript
- Supabase – user authentication & backend services
- Vercel – deployment
- Charting library (React-based) for data visualization

## ✨ Features

- Overview dashboard with all financial data at a glance
- Transactions page with:
  - Pagination (10 transactions per page)
  - Search, sort, and filter functionality
- Budgets management:
  - Create, read, update, and delete (CRUD) budgets
  - View the latest three transactions per budget category
- Saving pots:
  - Track progress toward goals
  - Add and withdraw money
- Recurring bills:
  - View current month status
  - Search and sort functionality
- Responsive layout optimized for all screen sizes
- Hover and focus states for all interactive elements
- Form validation with user-friendly error messages
- User authentication using Supabase (login & protected access)

Future Improvements [ reminder ]

- Fully keyboard-navigable UI [future update]
- Add more animations, including:
  - Intro animations
  - Page transitions
- Enhance micro-interactions for an even smoother user experience
- Continue refining accessibility and performance

## Deployment

- Vercel: https://frontend-mentor-personal-finance-ap-eight.vercel.app/

## 📊 Charts & Visualizations

An interesting part of this project was the pie chart implementation:

- I built three different pie chart components (using div and svg to render the pie-charts)
- Two of them matched the design 100%
- Ultimately, I chose to use the third version, built with a React charting library, for better maintainability and scalability

This decision balanced visual and custom utilities with long-term flexibility.

```ts
├─ routes
│  ├─ Budgets.tsx
│  │  ├─ // Chart Version 1 (custom – matches design 100%)
│  │  ├─ // Chart Version 2 (custom – matches design 100%)
│  │  └─ // Chart Version 3 (react chart library – currently used)
│  └─ ...
└─ ...
```

## 🏁 Conclusion

This project was a great opportunity to practice building a production-ready React + TypeScript application, integrate authentication with Supabase, and make thoughtful design vs. implementation trade-offs.

Feedback and suggestions are always welcome!
