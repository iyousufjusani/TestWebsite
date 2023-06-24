const argEnvIndex = process.argv.indexOf('--env')
let argEnv = (argEnvIndex !== -1 && process.argv[argEnvIndex + 1]) || ''

const RUN_ENV_MAP = {
    local: {
        instances: 1,
        max_memory_restart: '250M'
    },
    development: {
        instances: 1,
        max_memory_restart: '250M'
    },
    production: {
        instances: 2,
        max_memory_restart: '1000M'
    }
}

if (!(argEnv in RUN_ENV_MAP)) {
    argEnv = 'production'
}

module.exports = {
    apps: [
        {
            name: 'navigo-drive-web',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',


            instances: RUN_ENV_MAP[argEnv].instances,
            exec_mode: 'cluster',
            watch: false,
            max_memory_restart: RUN_ENV_MAP[argEnv].max_memory_restart,
            env_local: {
                NODE_ENV: 'local',
                PORT: 6001
            },
            env_development: {
                NODE_ENV: "development",
                PORT: 6001

            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 6001

            }
        }
    ]
}