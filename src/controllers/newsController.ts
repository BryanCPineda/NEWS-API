import { Request, Response } from 'express';
import newsService from '../services/newsService';
import { News, queryParamsPagination, queryParamsSearch } from '../interfaces/interfaces';

class NewsController {

  public getNews = async (req: Request<unknown, queryParamsPagination, unknown>, res: Response): Promise<void> => {
    try {
      
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result: { news: News[], total: number}  = await newsService.getAllNews({ page, limit });
      res.status(200).json({
        message: 'Get all News',
        news:{
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
          results: result.news,
        },

      });
    } catch (error) {
      res.status(500).json({ message: 'News load error', error });
    }
  };

  public getNewsById = async (req: Request<{id: string}>, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const news: News | null = await newsService.getNewsById(id);
      res.status(200).json({
        message: 'Get News by ID',
        data: news
      });
    } catch (error) {
      res.status(500).json({ message: 'News load error', error });
    }
  };

  public searchNews = async (req: Request<unknown,queryParamsSearch , unknown>, res: Response): Promise<void> => {
    try {
      
      if (Object.keys(req.query).length === 0) {
        res.status(400).json({ message: 'Query parameter is required', options: {
          title: 'tag or title',
          from: 'YYYY-MM-DD',
          to: 'YYYY-MM-DD',
          page: '1 by default',
          limit: '20 by default',
          example: 'http://localhost:3000/news/search?title=example&from=2023-01-01&to=2023-12-31&page=1&limit=20'
        } });
        return;
      }
      const news: News[] | undefined = await newsService.searchNews(req.query);
      res.status(201).json({
        message: 'Load News',
        data: news
      });
    } catch (error) {
      res.status(500).json({ message: 'Error search news ', error });
    }
  };

  public fetchNews = async (req: Request, res: Response): Promise<void> => {
    try {
      await newsService.loadNews();
      res.status(200).json({
        message: 'News fetched successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching news', error });
    }
  };

  public deleteNews = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const news: News | null = await newsService.deleteNews(id);
      res.status(200).json({
        message: 'Delete News',
        data: news
      });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting news', error });
    }
  };
}

export default NewsController;
