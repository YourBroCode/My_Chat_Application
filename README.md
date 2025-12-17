# My Chat Application

A modern real-time chat web application built with **Next.js**, **MongoDB**, **Pusher**, and **Gemini API** — enabling seamless messaging, group chats, and AI-powered interactions.

---

## Features

### Authentication
- Login and Signup pages with a clean and modern UI.  
- OTP-based email authentication for secure user verification.  
- Session handling using NextAuth.

### Chat System
- One-on-one messaging between users.  
- Group chat creation and participation.  
- Real-time messaging powered by **Pusher** for instant updates.  
- Media sharing (images, files, etc.) via **Cloudinary**.

### User Profile
- Edit username and profile picture anytime.  
- Smooth UI for managing user settings and personal details.

### AI Assistant - Ask Me
- Integrated AI Chatbot using **Gemini API (Google)**.  
- Users can ask any type of question, and the assistant provides instant answers within the app.  
- Available across all screens as a floating button for quick access.

---

## Tech Stack

- **Frontend:** Next.js, React.js, Tailwind CSS  
- **Backend:** Node.js, Next.js API Routes  
- **Database:** MongoDB  
- **Real-time Engine:** Pusher API  
- **Media Storage:** Cloudinary  
- **AI Assistant:** Gemini API (Google Generative AI)

---

## Prerequisites

Before setting up the project locally, ensure you have the following:
- Node.js  
- npm  
- MongoDB  
- Cloudinary account  
- Pusher account  
- Gemini API key

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YourBroCode/My_Chat_Application.git
   ```
2. Navigate to the Project Directory

    ```bash
    cd My_Chat_Application
    ```
4. Install Dependencies
   
  ```bash
     npm install
  ```

5. Configure Environment Variables
```.env
  MONGODB_URL=
  NEXTAUTH_SECRET=
  NEXTAUTH_URL=http://localhost:3000
  PUSHER_APP_ID=
  NEXT_PUBLIC_PUSHER_APP_KEY=
  PUSHER_SECRET=
  PUSHER_CLUSTER=
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
  NEXT_PUBLIC_UPLOAD_PRESET=
  NEXT_PUBLIC_GCP_API_KEY=
  EMAIL=
  EMAIL_PASSWORD=
  ```

6. Start the Development Server
  ```bash
    npm run dev
  ```

---


## Login Credential for checking only:
- Email: seven7@gmail.com
- Password: seven7@
- OR  You can sign up too using your own email id :)
