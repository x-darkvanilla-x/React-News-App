# NewsSearch React Component

A React component for searching and displaying news articles using the NewsAPI.

## Features

- Search news articles by keyword
- Filter articles by date range
- Sort articles by relevancy, popularity, or published date
- Click on articles to read more

## Installation

To use this component in your React project, install it via npm:

```bash
npm install --save @mui/material @mui/icons-material
```

## Usage

Import the component into your project and use it like this:

```jsx
import React from "react";
import NewsSearch from "./NewsSearch";

function App() {
  return (
    <div>
      <h1>News Search</h1>
      <NewsSearch />
    </div>
  );
}

export default App;
```

## Configuration

You need to obtain an API key from [NewsAPI](https://newsapi.org/) and replace the `apiKey` variable in the component with your API key.

## Credits

This component was created by Dipesh Adelkar.