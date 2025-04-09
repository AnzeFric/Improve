# Improve - Health & Fitness App

Improve is a comprehensive health and fitness application built with React Native for the mobile frontend and Java Spring Boot for the backend.

<div align="center">
  <img src="https://github.com/user-attachments/assets/86c305e0-6d44-41c0-a2fb-28b17ced7098" width="300" alt="Home Screen">
  <img src="https://github.com/user-attachments/assets/b92da2a0-e042-4152-b947-310b89c5623d" width="300" alt="Settings Screen">
</div>

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/yourusername/Improve.git
cd Improve
```

### Frontend Setup

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to set your backend API URL and other configuration

4. Launch the mobile app on Android:
   ```bash
   npx expo run:android
   ```
   
   For iOS:
   ```bash
   npx expo run:ios
   ```

### Backend Setup

1. Return to the project root:
   ```bash
   cd ..
   ```

2. Start the backend services:
   ```bash
   docker compose up --build -d
   ```
   This will start both the Spring Boot application and PostgreSQL database.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

