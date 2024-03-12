import { QuerySqlToken } from 'slonik';

import { create_users_table } from './1_create_user_table';

export const migrations: QuerySqlToken[] = [create_users_table];
