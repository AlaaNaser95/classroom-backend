import { registerAs } from '@nestjs/config';
import ormConfig from './orm.config';

export default registerAs('databaseConfig', () => ormConfig);
