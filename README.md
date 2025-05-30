# NannyMatch Lite

👩🏽‍💻 This is a frontend-only project for now. All data is stored in `localStorage`.

NannyMatch Lite is a lightweight matchmaking app that allows families to post their childcare needs and nannies to browse, express interest, and apply for roles. It’s designed to demonstrate interactive frontend development with React, using only browser storage for data persistence.

## ✨ Features

- Create nanny or family profiles
- Save (“Interested”) profiles for later
- Apply to family profiles (if you're a nanny)
- View submitted applications in the admin panel
- Message system between families and nannies
- Dashboard views for different user roles
- Preview new profiles before submission
- Simple filtering and clear filters
- 404 page for unmatched routes

## 📁 Getting Started

These instructions will get a copy of the project up and running on your local machine.

### Prerequisites

You’ll need:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nannymatch-lite.git

# Navigate into the project folder
cd nannymatch-lite

# Install dependencies
npm install

# Start the development server
npm start

#### Project Structure

nannymatch-lite/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminDashboard.jsx
│   │   ├── CreateProfile.jsx
│   │   ├── FamilyDashboard.jsx
│   │   ├── Inbox.jsx
│   │   ├── InterestedList.jsx
│   │   ├── MessageThread.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProfileCard.jsx
│   │   └── ProfileList.jsx
│   ├── App.jsx
│   ├── styles.css
│   └── index.js
└── README.md

##### 🛠 Tech Stack
React

JavaScript (ES6+)

HTML/CSS

localStorage API

###### 🚧 Limitations
No backend or database

All data will be lost on browser clear or device switch

No user authentication

🧠 Future Enhancements
Backend API with user login

Real-time chat functionality

Profile image uploads

Calendar integration for availability

Sorting and advanced search

####### 📃 License
MIT License

Built With Love by Nataki Skinner



---

Let me know if you want this exported as a `.md` file or if you'd like to include badges, screenshots, or a demo GIF later.
```
