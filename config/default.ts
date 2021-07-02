export default {
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_NAME,
      dialect: 'postgres',
    },
  },
  cache: {
    lru: {
      max: process.env.LRU_MAX_ITEMS,
      maxAge: process.env.LRU_MAX_AGE, // milliseconds
    },
  },
  encryption: {
    secret: process.env.ENCRYPTION_SECRET,
    algorithm: process.env.ENCRYPTION_ALGORITHM,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: Number(process.env.JWT_EXPIRATION_TIME),
  },
  bcrypt: {
    saltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 8,
  },
  log: {
    log4js: {
      appenders: {
        file: {
          type: "dateFile",
          pattern: ".yyyyMMdd",
          filename: "../logs/api.pet_rescue.log",
          daysToKeep: 15,
          layout: {
            type: "pattern",
            pattern: "%[[%d] [%p] [%c]%] - %m"
          }
        },
        out: {
          type: "stdout",
          layout: {
            type: "pattern",
            pattern: "%[[%d] [%p] [%c]%] - %m"
          }
        }
      },
      categories: {
        APP_DEV: {
          appenders: ["out"],
          level: "debug",
        },
        default: {
          appenders: ["out"],
          level: "debug",
        },
        APP_PROD: {
          appenders: ["out", "file"],
          level: "info",
        }
      }
    }
  },
  http: {
    server: {
      host: process.env.HTTP_SERVER_HOST,
      port: Number(process.env.HTTP_SERVER_PORT),
    },
    request: {
      payloadLimit: process.env.PAYLOAD_LIMIT,
    },
  },
};
