Trippi Safar - Travel Website Home Page
Trippi Safar is a modern travel website home page built with React and JavaScript. It features beautiful destinations, testimonials, and interactive components to inspire your next adventure.

Tech Stack:
React (JSX), JavaScript ,Vite (for fast development and build), CSS Modules



<img width="1807" height="935" alt="travel-webiste" src="https://github.com/user-attachments/assets/53b21469-2333-4d8e-8612-46d102b462e6" />






<img width="1849" height="939" alt="Screenshot 2025-08-25 071315" src="https://github.com/user-attachments/assets/5ce35ecb-0913-4f97-9550-9fb31c32d37b" />







Follow these steps to install and run the project locally:
Prerequisites
Node.js (v16 or above recommended)
npm (comes with Node.js)

Installation
Clone the repository:
git clone <your-repo-url>
Install dependencies:
npm install
Running the Project
npm run dev
Open your browser and visit http://localhost:5173 to view the website.






Trippi-Planner 🧳
A smart travel planner that generates personalized itineraries using the Gemini API. Built with React, Tailwind CSS, and modern ES Modules—no build tools required.






https://github.com/user-attachments/assets/2185d47c-c2be-4c75-bde9-0be7f5b5db6a









 Setup Instructions
1. Clone & Organize
Place all project files in a folder like /trippi-planner. Key files include:

/trippi-planner
|-- /components
|   |-- /icons
|   |-- ... (other component files)
|-- /services
|   |-- geminiService.ts
|-- App.tsx
|-- constants.ts
|-- index.html
|-- index.tsx
|-- metadata.json
|-- types.ts
|-- (and all other files)

2. Add API Keys
Create env.js in the root:
Google Gemini API (@google/genai)
OpenAI DALL-E 3 API

// env.js
window.process = {
  env: {
    // Replace with your actual Google Gemini API key
    API_KEY: 'YOUR_GEMINI_API_KEY_HERE',

    // Replace with your actual OpenAI API key (used for image fallback)
    OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY_HERE'
  }
};

Update index.html:


<!-- index.html -->

<!-- ... inside the <body> tag ... -->
    <div id="root"></div>

    <!-- ADD THIS LINE -->
    <script src="/env.js"></script>

    <script type="module" src="/index.tsx"></script>
  </body>
</html>

3. Start Local Server
bash
cd path/to/trippi-planner
npm install
npx http-server .
4. Launch App
Visit http://localhost:8080 in your browser to start planning your dream trip.







<img width="1257" height="1022" alt="Screenshot 2025-08-25 074159" src="https://github.com/user-attachments/assets/9d09fcce-f67f-49c6-a517-33b17af85569" />



<img width="1219" height="1034" alt="Screenshot 2025-08-25 074143" src="https://github.com/user-attachments/assets/69eb3b91-f8f9-4c9d-8e4d-184ca8a018de" />



<img width="1053" height="954" alt="Screenshot 2025-08-25 074118" src="https://github.com/user-attachments/assets/0bbb83fd-b761-4b60-9ee0-85143808e6c2" />



<img width="1365" height="1000" alt="Screenshot 2025-08-25 074054" src="https://github.com/user-attachments/assets/dd0a57e6-04ad-4ac9-859e-16a828d7a3e6" />





