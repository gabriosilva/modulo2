const http = require("http");
const hostname = "127.0.0.1";
const port = 3011;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(
    '<!DOCTYPE html> <head> <title>Etapa 0 - INSTALACAO</title></head> \
              <body>\
                <div id="main"> \
                      <h1>Gabrio Lina</h1> \
                      <p>Fullname: Gabrio Lina da Silva</p>\
                      <p> Phone: +55 62 98214-5560 </p> \
                      <p> Email: gabriosilva123@gmail.com </p> \
                      </div> \
              </body> \
          </html>'
  );
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
