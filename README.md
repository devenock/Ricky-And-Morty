# Rick and Morty Character Explorer

## Project Overview
This is a Next.js application that allows users to browse characters from the Rick and Morty universe. The app supports infinite scrolling, local storage for custom character creation, and deletion functionalities. It is built using modern React best practices, including React Query for data fetching and caching.

## Technologies Used
- **Next.js** - A React framework for server-side rendering and static site generation.
- **TypeScript** - For type safety and improved development experience.
- **Tailwind CSS** - For styling and responsive design.
- **React Query (@tanstack/react-query)** - For efficient data fetching and caching.
- **Lucide-react** - For icons.
- **React Intersection Observer (@tanstack/react-query)** - For triggering infinite scrolling.

## Features
- Fetches characters from the [Rick and Morty API](https://rickandmortyapi.com/).
- Implements infinite scrolling to load more characters dynamically.
- Allows users to create custom characters and save them locally in `localStorage`.
- Enables users to delete locally stored characters.
- Responsive design for an optimal experience across all devices.


## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://yarnpkg.com/) or npm

### Clone the Repository
```sh
git clone https://github.com/your-username/rick-and-morty-explorer.git
cd rick-and-morty-explorer
```

### Install Dependencies
Using Yarn:
```sh
yarn install
```
Using npm:
```sh
npm install
```

### Run the Development Server
```sh
yarn dev
```
Or using npm:
```sh
npm run dev
```
The application will be available at `http://localhost:3000/`.

## Usage
- **Home Page (`/`)**: Displays an introduction.
- **Characters Page (`/characters`)**: Fetches and displays characters with infinite scrolling.
- **Create Character Page (`/create`)**: Allows users to create a new custom character.