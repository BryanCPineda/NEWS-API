export interface News {
  title: string;
  link: string;
  description: string;
  date: Date;
  image?: string;
  section: string;
  source: string;
  tags: string[];
}

export interface FeedSource {
  url: string;
  section: string;
}


export interface queryParamsPagination {
  page: number;
  limit: number;
}

export interface queryParamsSearch {
  title?: string;
  from?: string;
  to?: string;  
  page?: number;
  limit?: number;
}

