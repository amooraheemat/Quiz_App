-- quiz_schema.sql
DROP DATABASE IF EXISTS quizApp_DB;
CREATE DATABASE quizApp_DB;
USE quizApp_DB;

-- Questions table
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Options table (normalized)
CREATE TABLE options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,
  label CHAR(1) NOT NULL,           -- 'A', 'B', 'C', ...
  text VARCHAR(300) NOT NULL,
  is_correct TINYINT(1) DEFAULT 0,  -- 1 = correct option
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Example data
INSERT INTO questions (text) VALUES
('Which of these is a key mindset shift for backend developers?'),
('What is the purpose of logging in backend systems?'),
('Which tool is used for containerization in backend development?'),
('Which of the following is NOT a backend developer’s responsibility?'),
('As discussed in one of our classes, which command checks the installed Node.js version?'),
('Which principle states that a class should have only one reason to change?'),
('Which of the following is NOT true of Node.js?'),
('What is the correct way to run a Node.js script?'),
('Which of the following is NOT a valid JavaScript data type?'),
('What does the ?? operator do in JavaScript?'),
('Which method converts a string to an integer directly?'),
('What is the output of console.log(6 + "01");?'),
('Which function declaration is hoisted in JavaScript?'),
('What does GRIT emphasize for backend developers?'),
('What is the main goal of the DRY principle?'),
('What is the purpose of the else clause?'),
('What is the output of console.log(5 > 3 ? "No" : "Yes");?'),
('Which keyword is used to exit a switch case block or loop?'),
('Which principle suggests avoiding unnecessary features in code'),
('Which loop iterates over object properties?'),
('What is a closure in JavaScript?'),
('Which operator returns the right-hand value if the left-hand value is null or undefined?'),
('What does git branch -M branch-name do?'),
('Which method returns a new array with the results of calling a function on every element?'),
('What is the result of 5 + "5" in JavaScript?'),
('When creating a server with the Node.js HTTP module, which method is used to send a response and end the request-response cycle?'),
('What class is 3xx?'),
('Which Express.js method is used to define a route handler for HTTP GET requests?'),
('Which variable is not available in ES modules by default?'),
('In the context of a URL (https://www.example.com:8080/path?query=search#section), which component is typically omitted from the address bar for common protocols like HTTPS?');

INSERT INTO options (question_id, label, text, is_correct) VALUES
(1, 'A', 'Focus on visual design', 0),
(1, 'B', 'Prioritize frontend performance', 0),
(1, 'C', 'Think about scalability and security', 1),
(1, 'D', 'Avoid databases', 0),

(2, 'A', 'To improve UI design', 0),
(2, 'B', 'To track errors and system behaviour', 1),
(2, 'C', 'To increase database size', 0),
(2, 'D', 'To replace unit tests', 0),

(3, 'A', 'Git', 0),
(3, 'B', 'Docker', 1),
(3, 'C', 'Postman', 0),
(3, 'D', 'VS Code', 0),

(4, 'A', 'API development', 0),
(4, 'B', 'Database optimization', 0),
(4, 'C', 'Integration with frontend', 1),
(4, 'D', 'Authentication & security', 0),

(5, 'A', 'npm -v', 0),
(5, 'B', 'node --version', 1),
(5, 'C', 'node -install', 0),
(5, 'D', 'npm --version', 0),

(6, 'A', 'Dependency Inversion Principle', 0),
(6, 'B', 'Liskov Substitution Principle', 0),
(6, 'C', 'Open/Closed Principle', 0),
(6, 'D', 'Single Responsibility Principle', 1),

(7, 'A', 'Event-driven architecture and non-blocking I/O', 0),
(7, 'B', 'Performance can be improved by child processes and worker threads', 0),
(7, 'C', 'Single-threaded execution', 0),
(7, 'D', 'It is a programming language for chatting apps', 1),

(8, 'A', 'node script.js', 1),
(8, 'B', 'npm script.js', 0),
(8, 'C', 'run script.js', 0),
(8, 'D', 'start script.js', 0),

(9, 'A', 'Number', 0),
(9, 'B', 'String', 0),
(9, 'C', 'Boolean', 0),
(9, 'D', 'Float', 1),

(10, 'A', 'Logical OR', 0),
(10, 'B', 'Nullish operator', 1),
(10, 'C', 'Ternary operator', 0),
(10, 'D', 'Spread operator', 0),

(11, 'A', 'Number()', 0),
(11, 'B', 'parseInt()', 1),
(11, 'C', 'String()', 0),
(11, 'D', 'Boolean()', 0),

(12, 'A', '61', 0),
(12, 'B', '"601"', 1),
(12, 'C', 'Error', 0),
(12, 'D', '"61"', 0),

(13, 'A', 'Function declaration', 1),
(13, 'B', 'Arrow function', 0),
(13, 'C', 'Anonymous function', 0),
(13, 'D', 'Function expression', 0),

(14, 'A', 'Giving up easily when debugging fails', 0),
(14, 'B', 'Persistence and problem-solving', 1),
(14, 'C', 'Avoiding documentation', 0),
(14, 'D', 'Ignoring security best practices', 0),

(15, 'A', 'Avoid code duplication', 1),
(15, 'B', 'Keep code simple', 0),
(15, 'C', 'Optimize performance', 0),
(15, 'D', 'Use fewer dependencies', 0),

(16, 'A', 'To define an alternative condition', 0),
(16, 'B', 'To create a loop', 0),
(16, 'C', 'To terminate the program', 0),
(16, 'D', 'To execute code when the if condition is false', 1),

(17, 'A', 'Yes', 0),
(17, 'B', 'No', 1),
(17, 'C', 'true', 0),
(17, 'D', 'false', 0),

(18, 'A', 'stop', 0),
(18, 'B', 'exit', 0),
(18, 'C', 'return', 0),
(18, 'D', 'break', 1),

(19, 'A', 'KISS', 0),
(19, 'B', 'YAGNI', 1),
(19, 'C', 'DRY', 0),
(19, 'D', 'SOLID', 0),

(20, 'A', 'for', 0),
(20, 'B', 'while', 0),
(20, 'C', 'do...while', 0),
(20, 'D', 'for...in', 1),

(21, 'A', 'A function with no parameters', 0),
(21, 'B', 'A function that has access to its outer scope', 1),
(21, 'C', 'A global function', 0),
(21, 'D', 'An arrow function', 0),

(22, 'A', '||', 0),
(22, 'B', '&&', 0),
(22, 'C', '??', 1),
(22, 'D', '!', 0),

(23, 'A', 'Deletes a branch', 0),
(23, 'B', 'Renames the current branch', 1),
(23, 'C', 'Merges two branches', 0),
(23, 'D', 'Creates a new branch', 0),

(24, 'A', 'filter()', 0),
(24, 'B', 'map()', 1),
(24, 'C', 'reduce()', 0),
(24, 'D', 'forEach()', 0),

(25, 'A', '"10"', 0),
(25, 'B', 'NaN', 0),
(25, 'C', 'Error', 0),
(25, 'D', '55', 1),

(26, 'A', 'res.send()', 0),
(26, 'B', 'res.write()', 0),
(26, 'C', 'res.end()', 1),
(26, 'D', 'res.close(', 0),

(27, 'A', 'Client errors', 0),
(27, 'B', 'Server errors', 0),
(27, 'C', 'Redirects', 1),
(27, 'D', 'Success', 0),

(28, 'A', '`app.post()`', 0),
(28, 'B', 'app.get()', 1),
(28, 'C', 'app.use()', 0),
(28, 'D', 'app.set()', 0),

(29, 'A', 'import.meta.url', 0),
(29, 'B', '__dirname', 1),
(29, 'C', 'export', 0),
(29, 'D', 'import', 0),

(30, 'A', 'Protocol', 0),
(30, 'B', 'Host', 0),
(30, 'C', 'Port', 1),
(30, 'D', 'Path', 0);
