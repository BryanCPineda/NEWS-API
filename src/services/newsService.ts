import { News, queryParamsPagination, queryParamsSearch } from '../interfaces/interfaces';
import newsRepository from '../Repository/newsRepository';
import { parseFeed } from '../utils/parseFeed';

export class newsService {

  public async getAllNews(params: queryParamsPagination): Promise<{ news: News[]; total: number }> {
    
    const { page, limit } = params;
    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      newsRepository.find({ skip, limit }),
      newsRepository.count()
    ]);

    return { news, total };


  }
  public async getNewsById(id: string): Promise<News | null> {
    return await newsRepository.findById(id);
  }
  public async searchNews(query: queryParamsSearch): Promise<News[] | undefined> {
    
    const { title, from, to, page = 1, limit = 20 } = query;
    const results: News[] | undefined = []
    if(title){
      const titleQuery = await newsRepository.search(title);
      if(titleQuery) results.push(...titleQuery); 
    }
  
    if(from || to){
      const dateQuery = await newsRepository.search({ from, to });
      if(dateQuery) results.push(...dateQuery);
    }

    return results.flat().slice((page - 1) * limit, page * limit);

  }
  public async loadNews(): Promise<void> {
    try {
      const newsFeed = await parseFeed();
      for (const news of newsFeed) {

        if(!news.title || !news.link || !news.description || !news.date || !news.image || !news.section || !news.source) continue
        const existingNews = await newsRepository.findByLink(news.link);
        if (!existingNews) {
          await newsRepository.saveNews(news);
        }
      }
    } 
    catch (error) {
      console.error('Error loading news:', error);
      throw error;
    }
  }

  public async deleteNews(id: string): Promise<News | null> {
    return await newsRepository.deleteById(id);
  }
}

export default new newsService();
