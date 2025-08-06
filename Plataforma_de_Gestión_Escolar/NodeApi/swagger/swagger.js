import swaggerJsdoc from 'swagger-jsdoc';
  
  
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School API',
            version: '1.0.0',
            description: `

Una aplicación para mejorar la comunicación entre las escuelas y los padres.
`,
            
            contact: {
                name: [ 'Leonardo Dillon', 'Ticiano Piccino' ]
            },
            servers: [
                {
                    url: 'http://localhost:5000',
                    description: 'Local server'
                }
            ]
        },
        
    },
    apis: ['./routes/*']
};

const specs = swaggerJsdoc(options);
export default specs;