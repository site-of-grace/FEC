# Grace Outfitters

![GitHub top language](https://img.shields.io/github/languages/top/site-of-grace/FEC?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/site-of-grace/FEC?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/site-of-grace/FEC?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr/site-of-grace/FEC?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/site-of-grace/FEC?style=flat-square)

![demo](https://user-images.githubusercontent.com/110412045/230535719-953d6827-dd61-45b9-be81-a5cb264e54e4.gif)

Grace Outfitters is a web app displaying relevant information for a single product in the catalog of an online retailer. It is organized by products, which can have many sizes and styles that result in unique SKUs (stock keeping units). The product detail page presents items at the product level and allows further breakdown by style or size within the page.

Grace Outfitters is composed of four modules: Product Overview, Ratings & Reviews, Questions & Answers, and Related Items & Outfit Creation. Each module displays information related to the product being viewed and provides functionality for users to interact with the product.

## Table of Contents

- [Preview](#preview)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Status](#status)
- [License](#license)
- [Contact](#contact)

## Tech Stack

Grace Outfitters is built with the following technologies, frameworks, libraries, and tools:

- React
- Redux
- Node.js
- Express
- MongoDB
- Axios
- Jest
- Webpack
- Babel

## Installation

To install and run Grace Outfitters locally, follow these steps:

1. Clone this repository to your local machine.
   ```
   git clone https://github.com/site-of-grace/FEC.git
   ```
2. Navigate to the root directory of the project.
   ```
   cd FEC
   ```
3. Install the dependencies with npm.
   ```
   npm install
   ```
4. Build the Frontend and Serve with npm.
   ```
   npm run build
   npm run start
   ```
5. Open your browser and go to http://localhost:3000 to view the app.

## Usage

To use Grace Outfitters, you can either browse through the products in the catalog or search for a specific product by its name or ID. Once you select a product, you will see its details on the product detail page. You can also interact with the product by:

- Zooming in and out of the product image
- Selecting a different style or size of the product
- Adding the product to your cart or your outfit list
- Rating and reviewing the product
- Asking and answering questions about the product
- Comparing the product with other related products

## Features

Grace Outfitters has many features and functionalities that enhance the user experience and provide useful information about the products. Some of them are:

- Responsive design that adapts to different screen sizes and devices
- Dynamic rendering of data from an API based on user input and selection
- Sorting and filtering options for reviews and questions
- Rating breakdown and product breakdown charts that show statistics and averages of ratings and characteristics
- Modal windows that allow users to write new reviews or answer questions without leaving the page
- Carousel component that displays related products and outfit items in a scrollable list
- Comparison table that shows the differences and similarities between two products


## Status

Grace Outfitters is currently in progress. Some features or improvements that are planned for the future are:

- Implementing authentication and authorization for users and admins
- Adding more tests and code coverage for all modules
- Optimizing performance and accessibility of the app
- Deploying the app to a cloud platform like Heroku or AWS

## License

Grace Outfitters is licensed under the MIT License.
