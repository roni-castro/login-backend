import * as http from 'http';
import * as debug from 'debug';

import App from './App';

const port  = (process.env.PORT || 3000);
App.set('port', port);
const server = http.createServer(App)
server.listen(port);
server.on('error', onErrorListener);
server.on('listening', onListening);


function onErrorListener(error: NodeJS.ErrnoException): void {
    console.log(error.code, console.log(error.message));
    throw error;
}

function onListening(): void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}`: `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

