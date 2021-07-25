export default {
  database: {
    mongo: {
      host: process.env.MONGO_HOST,
      port: Number(process.env.MONGO_PORT),
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      database: process.env.MONGO_NAME,
      config: undefined,
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
    ttl: Number(process.env.JWT_EXPIRATION_TIME),
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
