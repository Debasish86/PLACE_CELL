PlaceCell – Campus Placement Portal
PlaceCell is a full-stack web application built to streamline the campus placement and training process. It enables students, colleges, and companies to interact within a single platform, allowing for efficient placement tracking, authentication, and collaboration.

Features
Student, College, and Company registration and login


Session-based authentication and access control


Flash messaging for success and error prompts


Persistent login state across all pages until logout


Placement statistics dashboard with real-time data


Integration with Google, GitHub, and LinkedIn OAuth login


Role-based dashboard redirection


Responsive frontend using EJS templates



Tech Stack
Frontend:
HTML, CSS


EJS Templating Engine


Backend:
Node.js


Express.js


MongoDB with Mongoose ODM


Express-Session for authentication


Connect-Flash for flash messaging


Passport.js for OAuth strategies


Authentication:
Local (Email and Password)


Google OAuth 2.0


GitHub OAuth


LinkedIn OAuth



Getting Started
1. Clone the Repository
bash
CopyEdit
git clone https://github.com/your-username/placecell.git
cd placecell

2. Install Dependencies
nginx
CopyEdit
npm install

3. Configure Environment Variables
Create a .env file in the root directory and add the following:
ini
CopyEdit
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

Ensure your Google, GitHub, and LinkedIn OAuth credentials are registered and the redirect URIs match:
bash
CopyEdit
http://localhost:3000/auth/google/callback
http://localhost:3000/auth/github/callback
http://localhost:3000/auth/linkedin/callback

4. Start the Application
sql
CopyEdit
npm start

Visit: http://localhost:3000

Project Structure
pgsql
CopyEdit
.
├── app.js
├── routes/
│   ├── student.js
│   ├── college.js
│   ├── company.js
│   └── auth.js
├── controllers/
│   ├── studentController.js
│   ├── collegeController.js
│   ├── companyController.js
│   ├── statisticsController.js
│   └── authController.js
├── models/
│   ├── Student.js
│   ├── College.js
│   ├── Company.js
│   └── Statistics.js
├── views/
│   ├── pages/
│   └── partials/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── config/
│   ├── db.js
│   └── passport.js
├── .env
└── package.json


Usage Flow
Students register and login using email/password or OAuth (Google/GitHub/LinkedIn).


Session is created and persisted on login until logout.


Flash messages guide users through login, signup, and error states.


College and Company accounts can also be created and login using separate routes.


A dashboard displays placement statistics and relevant student/company/college data.



Contribution
If you would like to contribute, fork this repository and submit a pull request. Suggestions and improvements are always welcome.

License
This project is licensed under the MIT License.

Developer
Sachin Samal
Rahul Samal
Debasish Nayak

