import { config } from '@/config/config';
import { createLogger } from '@/lib/logger';

export const logger = createLogger({ level: config.logLevel });
