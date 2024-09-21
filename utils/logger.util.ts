import { consoleTransport, logger, configLoggerType } from 'react-native-logs'
import { InteractionManager } from 'react-native'

const config: configLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  transport: consoleTransport,
  severity: __DEV__ ? 'debug' : 'error',
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright'
    }
  },
  async: true,
  asyncFunc: InteractionManager.runAfterInteractions,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true
}

export const log = logger.createLogger<'debug' | 'info' | 'warn' | 'error'>(config)
