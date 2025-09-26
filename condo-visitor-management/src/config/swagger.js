const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Visitantes del Condominio',
      version: '1.0.0',
      description: 'API para gestionar anuncios de visitantes en un condominio integrado con WordPress',
    },
    servers: [
      {
        url: 'https://api.bonaventurecclub.com/visit',
        description: 'Servidor de producción',
      },
      {
        url: 'http://localhost:4000/visit',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      schemas: {
        VisitanteUnico: {
          type: 'object',
          required: ['wp_user_id', 'first_name', 'last_name', 'id_card', 'visit_date'],
          properties: {
            wp_user_id: {
              type: 'integer',
              description: 'ID de usuario de WordPress del residente',
              example: 123,
            },
            first_name: {
              type: 'string',
              description: 'Nombre del visitante',
              example: 'Juan',
            },
            last_name: {
              type: 'string',
              description: 'Apellido del visitante',
              example: 'Pérez',
            },
            id_card: {
              type: 'string',
              description: 'Número de cédula del visitante',
              example: '123456789',
            },
            visit_date: {
              type: 'string',
              format: 'date',
              description: 'Fecha de visita (AAAA-MM-DD)',
              example: '2023-10-15',
            },
          },
        },
        VisitanteFrecuente: {
          type: 'object',
          required: ['wp_user_id', 'first_name', 'last_name', 'id_card', 'frequent_visit_description'],
          properties: {
            wp_user_id: {
              type: 'integer',
              description: 'ID de usuario de WordPress del residente',
              example: 123,
            },
            first_name: {
              type: 'string',
              description: 'Nombre del visitante',
              example: 'Juan',
            },
            last_name: {
              type: 'string',
              description: 'Apellido del visitante',
              example: 'Pérez',
            },
            id_card: {
              type: 'string',
              description: 'Número de cédula del visitante',
              example: '123456789',
            },
            frequent_visit_description: {
              type: 'string',
              enum: ['Familia', 'Transporte Escolar', 'Proveedores', 'Otros'],
              description: 'Descripción de la visita frecuente',
              example: 'Familia',
            },
            frequent_visit_other_description: {
              type: 'string',
              description: 'Descripción adicional cuando se selecciona "Otros"',
              example: 'Amigo personal',
            },
          },
        },
        HistorialVisitantes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 1,
              },
              wp_user_id: {
                type: 'integer',
                example: 123,
              },
              first_name: {
                type: 'string',
                example: 'Juan',
              },
              last_name: {
                type: 'string',
                example: 'Pérez',
              },
              id_card: {
                type: 'string',
                example: '123456789',
              },
              visit_date: {
                type: 'string',
                format: 'date',
                example: '2023-10-15',
              },
              visit_type: {
                type: 'string',
                enum: ['unique', 'frequent'],
                example: 'unique',
              },
              frequent_visit_description: {
                type: 'string',
                example: 'Familia',
              },
              active: {
                type: 'boolean',
                example: true,
              },
              created_at: {
                type: 'string',
                format: 'date-time',
                example: '2023-10-10T10:00:00Z',
              },
              owner_name: {
                type: 'string',
                example: 'María López',
              },
            },
          },
        },
        RespuestaValidarVisitante: {
          type: 'object',
          properties: {
            valid: {
              type: 'boolean',
              example: true,
            },
            visitor: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  example: 1,
                },
                wp_user_id: {
                  type: 'integer',
                  example: 123,
                },
                first_name: {
                  type: 'string',
                  example: 'Juan',
                },
                last_name: {
                  type: 'string',
                  example: 'Pérez',
                },
                id_card: {
                  type: 'string',
                  example: '123456789',
                },
                visit_date: {
                  type: 'string',
                  format: 'date',
                  example: '2023-10-15',
                },
                visit_type: {
                  type: 'string',
                  enum: ['unique', 'frequent'],
                  example: 'unique',
                },
                frequent_visit_description: {
                  type: 'string',
                  example: 'Familia',
                },
                active: {
                  type: 'boolean',
                  example: true,
                },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  example: '2023-10-10T10:00:00Z',
                },
                owner_name: {
                  type: 'string',
                  example: 'María López',
                },
                owner_email: {
                  type: 'string',
                  example: 'maria@example.com',
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Archivos que contienen anotaciones
};

const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs),
};