import * as fs from 'fs/promises';
import {prepareData} from './htmlmanipulate.mjs'; 

export async function routes (fastify, options){
    fastify.get('/', async (request, reply) => {
        return {hello: 'world'};
    })
    fastify.get('/main.html', async (request, reply) => {
        try {
            const filename = `./main.html`;
            let data = await fs.readFile(filename);
            let date;

            if (typeof request.query.year !== 'undefined' && typeof request.query.month !== 'undefined'){
                let date_string = `${request.query.year}-${request.query.month}-01`;
                date = new Date(date_string);
            }
            else 
                date = new Date();

            data = prepareData(data, date);
            reply.type('text/html').code(200);

            return data;
        }
        catch(err) {
            reply.type('text/html').code(404);
            return err;
        }
    })
    fastify.get('/dommanipulate.js', async (request, reply) => {
        const filename = './dommanipulate.js';
        let data;
        //const {err, data} = await fs.readFile(filename);
        try {
            data = await fs.readFile(filename);
            reply.type('application/javascript').code(200);
            return data;
        }
        catch(err) {
            reply.type('text/html').code(404);
            return "Fehler";
        }
    })
    //fastify.post('/main.html:params', async (request, reply) => {
          //console.log(request.body)
          //console.log(request.query)
          //console.log(request.params)
          //console.log(request.headers)
          //console.log(request.raw)
          //console.log(request.id)
          //request.log.info('some info')}
    //)
}

//module.exports = routes;


