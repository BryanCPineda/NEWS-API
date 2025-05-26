import { News, queryParamsSearch } from '../interfaces/interfaces';
import newsModel from '../models/newsModel';

class newsRepository {

  public async find(options: { skip: number; limit: number } = { skip: 0, limit: 10 }): Promise<News[]> {
  return await newsModel
    .find()
    .sort({ date: -1 })
    .skip(options.skip)
    .limit(options.limit)
    .exec();
  }

  async count(): Promise<number> {
    return await newsModel.countDocuments();
  }

  async findById(id: string): Promise<News | null> {
    return await newsModel.findById(id);
  }

  async search(query: queryParamsSearch | string | undefined): Promise<News[] | undefined> {

    if (!query) return await newsModel.find();
    if (typeof query === 'string') {
      const titleSearch = await newsModel.find({ title: { $regex: query, $options: 'i' } });
      const tagSearch = await newsModel.find({ tags: { $regex: query, $options: 'i' } });
      return [...titleSearch, ...tagSearch]
    }
    if(typeof query === 'object') {
      const { from, to } = query;
      const dateQuery = {
        $gte: new Date(from || '1970-01-01'),
        $lte: new Date(to || new Date())
      };

      const newsByDate = await newsModel.find({
        date: dateQuery
      });

      return newsByDate
    }

  }

  async findByLink(link: string): Promise<News | null> {
    return await newsModel.findOne({ link });
  }

  async saveNews(data: News): Promise<News> {
      const news = new newsModel(data);
      return await news.save();
  }

  async deleteById(id: string): Promise<News | null> {
    return await newsModel.findByIdAndDelete(id);
  }
}

export default new newsRepository();
