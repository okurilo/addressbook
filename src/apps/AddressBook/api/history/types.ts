export enum SearchContextEnum {
  all = 'all',
  persons = 'persons',
  employee = 'employee',
  sberpeople = 'sberpeople',
  learningcatalog = 'learningcatalog',
  service = 'service',
  supportfaq = 'supportfaq',
  landingsupport = 'landingsupport',
  orgstructure = 'orgstructure',
  reportsstatementscopies = 'reportsstatementscopies',
}

export type SearchHistoryPath =
  | 'all'
  | SearchContextEnum.persons
  | SearchContextEnum.employee
  | SearchContextEnum.sberpeople
  | SearchContextEnum.learningcatalog
  | SearchContextEnum.service
  | SearchContextEnum.supportfaq
  | SearchContextEnum.landingsupport
  | SearchContextEnum.orgstructure
  | SearchContextEnum.reportsstatementscopies;

export type SearchHistoryKey = {
  context: SearchHistoryPath;
  id: string;
};

export type SearchHistoryItem = {
  id: string;
  path: string;
  text: string;
  key: SearchHistoryKey;
};

export type PutSearchHistoryBody = {
  text: string;
  key: SearchHistoryKey;
  tags: string[];
};

