import { DataSource, DataSourceOptions } from 'typeorm';
import ormConfig from './orm.config';

function getConfig() {
  return { ...ormConfig } as DataSourceOptions;
}
const datasource = new DataSource(getConfig()); // config is one that is defined in datasource.config.ts file
export default datasource;
