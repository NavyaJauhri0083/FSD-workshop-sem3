const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/') {

        fs.readFile('index.html', 'utf8', (err, data) => {

            if (err) {
            server
              res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading HTML file');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });

    }

    else if (req.method === 'POST' && req.url === '/add-student') {

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {

            const formData = new URLSearchParams(body);

            const student = {
                name: formData.get('name'),
                roll: formData.get('roll'),
                course: formData.get('course'),
                email: formData.get('email')
            };

            fs.readFile('students.json', 'utf8', (err, data) => {

                let students = [];

                if (!err && data) {
                    students = JSON.parse(data);
                }

                students.push(student);

                fs.writeFile(
                    'students.json',
                    JSON.stringify(students, null, 2),
                    (err) => {

                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error saving student');
                            return;
                        }

                        res.writeHead(200, { 'Content-Type': 'text/html' });

                        res.end(`
                            <h1>Student Added Successfully!</h1>
                            <a href="/">Add Another Student</a>
                            <br><br>
                            <a href="/students">View Students</a>
                       `);
                    }
                );
            });
        });
    }

    // Display all students
    else if (req.method === 'GET' && req.url === '/students') {

        fs.readFile('students.json', 'utf8', (err, data) => {

            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading student records');
                return;
            }

            const students = JSON.parse(data);

            let html = `
                <html>
                <head>
                    <title>Student Records</title>
                </head>
                <body>
                    <h1>Student Records</h1>

                    <table border="1" cellpadding="10">
                        <tr>
                            <th>Student Name</th>
                            <th>Roll Number</th>
                            <th>Course</th>
                            <th>Email</th>
                        </tr>
            `;

            students.forEach((student) => {
                html += `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.roll}</td>
                        <td>${student.course}</td>
                        <td>${student.email}</td>
                    </tr>
                `;
            });

            html += `
                    </table>

                    <br>
                    <a href="/">Add Another Student</a>
                </body>
                </html>
            `;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});