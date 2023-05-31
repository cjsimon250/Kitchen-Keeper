# Kitchen Keeper

![MIT LICENSE](https://img.shields.io/github/license/cjsimon/Kitchen-Keeper.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/cjsimon/Kitchen-Keeper.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/cjsimon/Kitchen-Keeper.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/cjsimon/Kitchen-Keeper.svg?style=social)

# PROJECT NAME

## Description

Kitchen Keeper is a fully functional prototype designed to streamline inventory management for restaurants. It automates inventory-related tasks, including tracking stock levels and generating alerts for restocking. The application uses daily sales data to determine which specific items need to be restocked, ensuring that the restaurant always has enough ingredients on hand to meet customer demand. This application has the potential to increase a restaurant's efficiency and profitability while saving time and reducing the chances of running out of essential ingredients.

_Duration: 2 Week Sprint_

To see the fully functional site, please visit: https://kitchenkeeper.herokuapp.com/

## Screen Shots

![Alt text](./documentation/images/dashboard.png?raw=true "User Dashboard")
![Alt text](./documentation/images/menuInventory.png?raw=true "User's Inventory & Menu")

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)
- [Express.js](https://expressjs.com/)

## Installation

1. Create a database named `kitchen-keeper`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.
3. Create a `.env` file and set "SERVER_SESSION_SECRET" to whatever you like as long as it is longer than 8 characters.
4. Open up your editor of choice and run an `npm install`.
5. Run `npm run server` in your terminal.
6. Run `npm run client` in your terminal.
7. The `npm run client` command will open up a new browser tab for you!

## Usage

1. As a new user, you will log in and upload all of your current menu and inventory in stock. The data needed consists of the current quantities of all inventory items in stock, the user's minimum desired stock, as well as how much of each inventory item is in every dish.
2. If the user has access to past sales data they can upload how much of each Menu Item was sold on a given day and view sales metrics over the last year as well as last seven days.
3. Users will also be able to track and add orders they recieve from suppliers so that they can restock their inventory.
4. At the end of every day, the user will upload how much of each menu item was sold and their current inventory will be adjusted accordingly.
5. Using the notifications about low quantity items, the user is able to see what items they need to restock so that their is no need to take inventory manually.

## Built With

<p align="center"> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
  <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> 
 <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>  </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a>  <a href="https://mui.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" alt="Material UI" width="40" height="40"/> </a></p>

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) and everyone who helped me to make this application a reality. Special thanks to Dane Smith, Key Clark, Edan Schwartz, and all of the Amethyst Cohort.

## Support

If you have suggestions or issues, please email me at [cjsimon615@gmail.com](www.google.com)

<!-- MARKDOWN LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[javascript]: https://img.shields.io/badge/JavaScript-20232A?style=for-the-badge&logo=Javascript&logoColor=F7DF1E
[javascript-url]: https://www.javascript.com/
[mui]: https://img.shields.io/badge/MUI-20232A?style=for-the-badge&logo=MUI&logoColor=007FFF
[mui-url]: https://mui.com/
[redux-saga]: https://img.shields.io/badge/Redux-Saga-20232A?style=for-the-badge&logo=Redux-Saga&logoColor=999999
[redux-saga-url]: https://redux-saga.js.org/
[express.js]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=Express&logoColor=000000
[express-url]: https://expressjs.com/
[node.js]: https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=Node.js&logoColor=339933
[node-url]: https://nodejs.org/en
[css]: https://img.shields.io/badge/CSS3-20232A?style=for-the-badge&logo=CSS3&logoColor=1572B6
[css-url]: https://www.w3.org/Style/CSS/Overview.en.html
[html]: https://img.shields.io/badge/HTML5-20232A?style=for-the-badge&logo=HTML5&logoColor=E34F26
[html-url]: https://html.spec.whatwg.org/multipage/
[postgres]: https://img.shields.io/badge/PostgreSQL-20232A?style=for-the-badge&logo=PostgreSQL&logoColor=4169E1
[postgres-url]: https://www.postgresql.org/
[chart.js]: https://img.shields.io/badge/Chart.js-20232A?style=for-the-badge&logo=Chart.js&logoColor=FF6384
[chart-url]: https://www.chartjs.org/
