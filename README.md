#  IS216 Web Application Development II

---

G3 Group 7 

---

## Group Members

| Photo | Full Name | Role / Features Responsible For |
|:--:|:--|:--|
| <img src="photos/anya.jpg" width="80"> | Anya Dharsan | Frontend + Backend Developer - Dashboard, Sidebar, Pet Selection, Responsiveness of pages|
| <img src="photos/joash.jpg" width="80"> | Joash Lau| Frontend + Backend Developer - API endpoints |
| <img src="photos/ethan.jpg" width="80"> | Ethan Ng| Frontend + Backend Developer - Layout & Color Themes |
| <img src="photos/Darren_Neo.jpg" width="80"> | Darren Neo Ming Zhou| Frontend + Backend Developer - Firebase Integration |
| <img src="photos/sandra.jpg" width="80"> | Sandra Yap Kah Xin| Frontend + Backend Developer - API endpoints |
| <img src="photos/venice.jpg" width="80"> | Venice Hoe  | Frontend + Backend Developer - Layout & Color Themes |
| <img src="photos/Joe.jpg" width="80"> | Joe Ye Di| Frontend + Backend Developer - Firebase Integration |
> Place all headshot thumbnails in the `/photos` folder (JPEG or PNG).

---

## Business Problem

Describe the **real-world business or community problem** your project addresses.

>Many students struggle to maintain a healthy balance between productivity and personal well-being. Existing apps often focus on only one aspect, >for instance, time management or mindfulness, without addressing how these areas intersect in daily student life. As a result, students  >experience burnout, poor mental health, and difficulty sustaining motivation. Our project tackles this gap by providing an integrated solution >that combines academic productivity with emotional wellness. By incorporating interactive and gamified features, it encourages consistency, >intentional resta and key challenges students face in managing both their performance and well-being.
---

## Web Solution Overview

### �� Intended Users
Primary: Students (secondary school, university, and postgraduate levels)
Secondary: Working adults seeking better work-life balance and study/wellness habits

### �� What Users Can Do & Benefits
Explain the core features and the benefit each provides.  

| Feature | Description | User Benefit |
|:--|:--|:--|

| Virtual Pet Wellness Companion | Tamagotchi-style virtual pet that evolves and thrives based on the user’s wellness and study habits | Builds emotional connection, promoting consistent engagement and self-care
| Enhanced Study Timer System | Pomodoro-based study timer with microbreak reminders for stretching, hydration, and eye rest	| Improves focus and prevents burnout through structured study-rest cycles
| Study Session Analytics & Productivity Insights | Tracks session data (task, subject, hours, progress, etc.) and generates productivity trends and completion insights | Helps users identify strengths, manage time effectively, and improve study performance
| Assignment Progress Tracker (Calendar View) | To-do list integrated into a calendar for organising assignments and reflecting on progress | 	Enhances time management and accountability for ongoing tasks
| Virtual Pet Gamification | Links study consistency and wellness habits to the pet’s well-being as you earn coins for your pet |	Encourages positive reinforcement and motivation through gamification
| User Profile & Login System | Personalised account setup and secure data storage	| Ensures data privacy while enabling personalized recommendations

---

## Tech Stack

| Logo | Technology | Purpose / Usage |
|:--:|:--|:--|
| <img src="https://raw.githubusercontent.com/github/explore/main/topics/html/html.png" width="40"> | **HTML5** | Structure and content |
| <img src="https://raw.githubusercontent.com/github/explore/main/topics/css/css.png" width="40"> | **CSS3 / Bootstrap** | Styling and responsiveness |
| <img src="https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png" width="40"> | **JavaScript (ES6)** | Client-side logic and interactivity |
| <img src="https://vitejs.dev/logo.svg" width="40"> | **Vite** | Development server and build tool |
| <img src="https://vuejs.org/images/logo.png" width="40"> | **Vue.js 3** | Component-based frontend framework |
| <img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png" width="40"> | **Firebase** | Authentication and database services |
| <img src="https://www.python.org/static/img/python-logo.png" width="40"> | **Python** | Backend |
| <img src="https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" width="40"> | **FastAPI** | API Framework |
| <img src="https://www.gstatic.com/marketing-cms/assets/images/f5/d3/a7f9db7045429cb6dc6be56bdcbe/google-logo-about.svg" width="40"> | **Google OAuth 2.0** | OAuth for user creation |
| <img src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-5sS0jg4waN13DonunGp4O5-4ed7c4785b1425173cf5914e32684fd3-Product_Logo_-_Calendar.svg" width="40"> | **Google Calendar** | Google Calendar integration |
| <img src="https://www.notificationapi.com/images/branding/Light%20NotificationAPI%20Horizontal.png" width="40"> | **Notification API** | Notification for Achievement |



---

## Use Case & User Journey

Provide screenshots and captions showing how users interact with your app.

1. **Login**  
   <img src="screenshots/landing.png" width="600">  
   - Displays the homepage with navigation options.

2. **Pet Selection**  
   <img src="screenshots/landing.png" width="600">  
   - Displays the homepage with navigation options.

3. **Study Timer**  
   <img src="screenshots/landing.png" width="600">  
   - Displays the homepage with navigation options.

4. **Task Tracker**  
   <img src="screenshots/landing.png" width="600">  
   - Displays the homepage with navigation options.

5. **Progress**  
   <img src="screenshots/landing.png" width="600">  
   - Displays the homepage with navigation options.

6. **Daily Check-in**  
   <img src="screenshots/search.png" width="600">  
   - Users can browse and filter items by criteria.

7. **Pet**  
   <img src="screenshots/dashboard.png" width="600">  
   - Shows saved data and recent activities.

8. **Profile**  
   <img src="screenshots/dashboard.png" width="600">  
   - Shows saved data and recent activities.

> Save screenshots inside `/screenshots` with clear filenames.

---

## Developers Setup Guide

Comprehensive steps to help other developers or evaluators run and test your project.

---

### 0) Prerequisites
- [Git](https://git-scm.com/) v2.4+  
- [Node.js](https://nodejs.org/) v18+ and npm v9+  
- Access to backend or cloud services used (Firebase, MongoDB Atlas, AWS S3, etc.)

---

### 1) Download the Project
```bash
git clone https://github.com/<org-or-user>/<repo-name>.git
cd <repo-name>
npm install
```

---

### 2) Configure Environment Variables
Create a `.env` file in the root directory with the following structure:

```bash
VITE_API_URL=<your_backend_or_firebase_url>
VITE_FIREBASE_API_KEY=<your_firebase_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<your_auth_domain>
VITE_FIREBASE_PROJECT_ID=<your_project_id>
VITE_FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your_sender_id>
VITE_FIREBASE_APP_ID=<your_app_id>
```

> Never commit the `.env` file to your repository.  
> Instead, include a `.env.example` file with placeholder values.

---

### 3) Backend / Cloud Service Setup

#### Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project.
3. Enable the following:
   - **Authentication** → Email/Password sign-in
   - **Firestore Database** or **Realtime Database**
   - **Hosting (optional)** if you plan to deploy your web app
4. Copy the Firebase configuration into your `.env` file.

#### Optional: Express.js / MongoDB
If your app includes a backend:
1. Create a `/server` folder for backend code.
2. Inside `/server`, create a `.env` file with:
   ```bash
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```
3. Start the backend:
   ```bash
   cd server
   npm install
   npm start
   ```

---

### 4) Run the Frontend
To start the development server:
```bash
npm run dev
```
The project will run on [http://localhost:8080](http://localhost:5173) by default.

To build and preview the production version:
```bash
npm run build
npm run preview
```

---

### 5) Testing the Application

#### Manual Testing
Perform the following checks before submission:

| Area | Test Description | Expected Outcome |
|:--|:--|:--|
| Authentication | Register, Login, Logout | User successfully signs in/out |
| CRUD Operations | Add, Edit, Delete data | Database updates correctly |
| Responsiveness | Test on mobile & desktop | Layout adjusts without distortion |
| Navigation | All menu links functional | Pages route correctly |
| Error Handling | Invalid inputs or missing data | User-friendly error messages displayed |

#### Automated Testing (Optional)
If applicable:
```bash
npm run test
```

---

### 6) Common Issues & Fixes

| Issue | Cause | Fix |
|:--|:--|:--|
| `Module not found` | Missing dependencies | Run `npm install` again |
| `Firebase: permission-denied` | Firestore security rules not set | Check rules under Firestore → Rules |
| `CORS policy error` | Backend not allowing requests | Enable your domain in CORS settings |
| `.env` variables undefined | Missing `VITE_` prefix | Rename variables to start with `VITE_` |
| `npm run dev` fails | Node version mismatch | Check Node version (`node -v` ≥ 18) |

---

## Group Reflection

Each member should contribute 2–3 sentences on their learning and project experience.

> **Example Template:**  
> - *Anya:* Learned how to build responsiven websites and backend integration along with game features and working with animations  
> - *Joash:* Gained experience connecting frontend and backend APIs.  
> - *Ethan:* Improved UI/UX design workflow and collaboration using Figma.  
> - *Darren:* Understood how Firebase Authentication and Firestore integrate with modern SPAs.  
> - *Sandra:* Gained experience connecting frontend and backend APIs.  
> - *Venice:* Improved UI/UX design workflow and collaboration using Figma.  
> - *Joe:* Understood how Firebase Authentication and Firestore integrate with modern SPAs.  

As a team, reflect on:
- Key takeaways from working with real-world frameworks  
- Challenges faced and how they were resolved  
- Insights on teamwork, project management, and problem-solving  