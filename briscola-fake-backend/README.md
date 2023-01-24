# Briscola Fake Backend Project
Node.js backend developed with TypeScript and Express framework used by Briscola 2 : Electric Boogaloo frontend application in development/testing environment

## Project Structure
- [Index.ts](/src/index.ts) - Main file (entry point), *DEFINES ALL ROUTES AT BACKEND APPLICATION*
- [Route Actions/*](/src/routes/) - Folder containing all route handlers/functions with detailed comments describing logic
- [DTO/*](/src/dto/) - Folder with all Data Transfer Objects used by frontend and backend for communication over HTTP/WS
- [Errors](/src/error/error-list.ts) - File with all error codes sent by backend application

## How To Use
1. Clone with `git clone [url]`
2. `npm start dev` to start _nodemon_ watch-mode server