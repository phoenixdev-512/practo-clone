# Practo Clone 🩺

A modern, full-stack healthcare web application inspired by [Practo](https://www.practo.com/), built with **Next.js 14 (App Router)**, **Tailwind CSS**, **TRPC**, and a **Node.js backend**.  
Find doctors, book appointments, consult online, and manage health records—all with a beautiful, responsive, and interactive UI.

---

## ✨ Features

- **Practo-style UI**: Clean, trustworthy, and responsive design
- **Doctor Search**: Filter by location, specialty, experience, and more
- **Doctor Listings**: Cards with ratings, fees, patient stories, and booking options
- **Online Consultation**: Book video consults or in-clinic visits
- **Admin Panel**: Add/manage doctors (demo)
- **TRPC Integration**: Type-safe API calls (now pure JS)
- **No TypeScript**: 100% JavaScript codebase for easy onboarding
- **Tailwind CSS**: Utility-first, animated, and themeable styles
- **Mobile Friendly**: Works great on all devices

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, Tailwind CSS, TRPC client
- **Backend**: Node.js, Express, TRPC server, REST endpoints
- **UI**: Heroicons, Lucide, custom animated components
- **State/API**: React Query, TRPC
- **Styling**: Tailwind CSS, custom globals.css

---

## 🖥️ Screenshots

| Homepage | Doctor Listing |
|----------|---------------|
| ![Homepage Screenshot](./screenshots/homepage.png) | ![Doctor Listing Screenshot](./screenshots/doctor-listing.png) |

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/practo-clone.git
cd practo-clone
```

### 2. Install dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```

### 3. Start the backend

```bash
cd backend
npm start
# or
node src/index.js
```

### 4. Start the frontend

```bash
cd ../frontend
npm run dev
```

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend API: [http://localhost:3000](http://localhost:3000)

---

## 🧩 Project Structure

```
practo-clone/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── trpc/
│   │   └── ... (routers, controllers)
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   └── components/
│   │       ├── NavBar.jsx
│   │       ├── Hero.jsx
│   │       ├── DoctorCard.jsx
│   │       └── ...
│   ├── globals.css
│   ├── tailwind.config.js
│   └── package.json
```

---

## 🎨 Customization

- **Colors & Fonts**: Edit `tailwind.config.js` and `globals.css`
- **Doctor Data**: Update backend seed or API
- **Animations**: Add or tweak in `globals.css` and components

---

## 🧑‍💻 Contributing

Pull requests welcome!  
Open an issue for bugs, ideas, or improvements.

---

## 📄 License

MIT

---

## 🙏 Credits

- [Practo](https://www.practo.com/) for UI inspiration
- [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/),
