# CRYPTOKNIGHT - Crypto Dashboard

This project is a crypto dashboard built with Next.js, TypeScript, and Tailwind CSS. It fetches data from the CoinGecko API to provide real-time cryptocurrency information. Zustand is used to manage the watchlist and recently watched states across the app.

## Features

### Home Page
1. **Market Cap Chart**: Displays the market cap of the top 3 cryptocurrencies.
2. **Trending Crypto Coins Table**: Shows the top 15 trending cryptocurrencies. Users can drag and drop coins into the watchlist. Clicking on any coin opens a detailed product page.

### Explore Page
1. **Top Cryptos by Market Cap**: Lists the top cryptocurrencies based on market cap.
2. **Watchlist and Categories**: Displays a watchlist and multiple categories for easy navigation.
3. **Pagination**: Fetches 20 coins at a time for better performance and user experience.

### Product Page
1. **Crypto Details**: Displays detailed information about a cryptocurrency based on the URL parameter.
   - **Chart Options**: View performance over 1 day, 1 week, 1 month, and more.
   - **Details**: Includes description, performance metrics, and fundamental data.

### Sidebar
1. **Recently Watched**: Updates every time a user opens a product page for a coin.
2. **Watchlist**: Users can drag and drop coins from other lists to the watchlist, which updates in real-time.

### Navbar
1. **Search**: Includes a debounced search feature with a 3-second delay.
2. **Theme Switcher**: A button to dynamically switch themes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dahighsky/Cryptonite.git
   ```
2. Install dependencies:
   ```bash
   cd Cryptonite
   npm install
   ```
3. Create a `.env` file in the root directory and add your CoinGecko API key:
   ```
   NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
   ```

## Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and statically generated websites.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **CoinGecko API**: An API for fetching real-time cryptocurrency data.
- **Zustand**: A small, fast, and scalable bearbones state management solution for React.