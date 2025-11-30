import pino from 'pino';
import pinoHttp from 'pino-http';



const transport = pino.transport({
    targets: [
        {target: 'pino/file', level: 'info', options: { destination: './src/logs/all-logs.log', mkdir: true }},
        {target: 'pino/file', level: 'error', options: { destination: './src/logs/error.log', mkdir: true }},
        {target: 'pino/file', level: 'warn', options: { destination: './src/logs/warn.log', mkdir: true }},
        {target: 'pino-pretty',level: 'info', options: { colorize: true }},
    ]
});

export const logger = pino(transport);

export const pinoHttpMiddleware = pinoHttp({
    logger,
}
);

