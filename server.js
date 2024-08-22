const { readFileSync } = require('fs');

const startServer = (crud) => {
  const server = require('http').createServer();
  const port = process.env.PORT || 3000;

  server.addListener('request', async (req, res) => {
    const { url, method } = req;

    if (url === '/') {
      const html = readFileSync('index.html');
      res.writeHead(200).end(html);
    } else if (url === '/style.css') {
      const css = readFileSync('style.css');
      res.writeHead(200).end(css);
    } else if (url === '/script.js') {
      const js = readFileSync('script.js');
      res.writeHead(200).end(js);
    }

    if (url === '/api/tasks') {
      if (method === 'GET') {
        const tasks = await crud.getTasks();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
      } else if (method === 'POST') {
        const body = await getBody(req);
        await crud.addTask(body.text);
        const tasks = await crud.getTasks();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
      }
    }
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

async function getBody(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }
  return JSON.parse(body);
}

exports.startServer = startServer;