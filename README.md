## CareMonitor Angular App

A sample Angular application demonstrating login, authentication, dashboard, and list page with mock API integration.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup Instructions](#setup-instructions)  
- [Running the Application](#running-the-application)
- [Architecture & Approach](#architecture--approach)  
- [Testing](#testing)  

---

## Overview

CareMonitor is a demo Angular application built as part of an interview assignment. The app demonstrates:  

- User login and authentication  
- Dashboard displaying logged-in user details  
- List page fetching items via a mock API  
- State management using Angular Component Store  
- Mock API using HTTP interceptor  

---

## Features

1. **Login Page**  
   - Reactive form with email and password  
   - Authentication using mock API  
   - Stores token and email in cookies  
   - Redirects to dashboard on successful login  

2. **Dashboard Page**  
   - Displays logged-in user’s email  
   - Navigation to List page  
   - Logout button clears cookies  

3. **List Page**  
   - Fetches items from mock API  
   - Handles loading and error states  
   - Uses Angular Component Store for state management  

4. **Mock API Integration**  
   - Implemented using HTTP Interceptor  
   - `/api/login` and `/api/items` return mock data  

5. **Loader & UX**  
   - Loading spinner during API calls  
   - Transparent overlay while loading  

---

## Tech Stack

- Angular 20+ (Standalone Components)  
- Angular Material  
- RxJS  
- @ngrx/component-store  
- ngx-cookie-service  

---

## Project Structure

<pre> ```text src/app/ ├── auth/ │ ├── login/ │ │ ├── login.html │ │ ├── login.scss │ │ ├── login.spec.ts │ │ ├── login.ts │ ├── auth.spec.ts │ ├── auth.ts │ ├── auth.guard.spec.ts │ ├── auth.guard.ts ├── dashboard/ │ ├── dashboard.html │ ├── dashboard.scss │ ├── dashboard.spec.ts │ ├── dashboard.ts ├── list/ │ ├── list.html │ ├── list.scss │ ├── list.spec.ts │ ├── list.ts │ ├── list.store.spec.ts │ ├── list.store.ts ├── mocks/ │ ├── mock-api.interceptor.spec.ts │ ├── mock-api.interceptor.ts ├── services/ │ ├── item.spec.ts │ ├── item.ts ├── app.config.ts ├── app.html ├── app.routes.ts ├── app.scss ├── app.spec.ts ├── app.ts ``` </pre>

---

## Setup Instructions

1. Clone the repository

git clone https://github.com/MohiniReddiwar/caremonitor-app.git
cd caremonitor-app

2. Install dependencies

npm install

3. Run the application

Run the application

Open your browser at http://localhost:4200

---

## Architecture & Approach

> Standalone Components: Each component has its own template, style, and imports, making the app modular and reusable.

> State Management: ListStore (Angular Component Store) handles items, loading, and error state for the List page.

> Authentication:

    1. Auth service handles login, logout, token storage, and user info in cookies

    2. AuthGuard protects routes for authenticated users only

> Mock API: HTTP Interceptor simulates /api/login and /api/items responses, so backend is not required.

> Reactive Forms: Login form uses Angular reactive forms with validation.

> Angular Material: For consistent UI and responsive layout.

> Testing: Unit tests cover services, stores, and components. Router and HTTP calls are mocked for reliable tests.

---

## Testing

Run unit tests:

ng test

---

## License

MIT License


