# Interview Scheduler

## Description
Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Screenshots
![Alt text](/docs/home_page.png "Home Page")
![Alt text](/docs/add_edit.png "Add/Edit appointment")
![Alt text](/docs/result_delete.png "Result and Delete function")
![Alt text](/docs/error.png "Error Handling")

## Installation
1. Clone [this repository](https://github.com/Name-3R1C/scheduler.git) to your local machine.
2. Navigate to the project directory.
3. Install dependencies with `npm install`.
4. Setup backend sever by navigating to [scheduler-api](https://github.com/Name-3R1C/scheduler-api) and follow setup instructions 

## Running Webpack Development Server

```sh
npm start
```
Open your web browser and access the application at http://localhost:8000.

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
For storybook, navigate to http://localhost:9009/

## License

This project is licensed under the [MIT License](LICENSE.md).
