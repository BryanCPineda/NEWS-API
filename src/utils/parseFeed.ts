import axios from "axios";
import { FeedSource, News } from "../interfaces/interfaces";
import { parseStringPromise } from "xml2js";

function extractKeywords(text: string): string[] {
  const cleanText = text.replace(/<[^>]*>/g, '').toLowerCase();
  const words = cleanText.split(/\W+/).filter(word => 
    word.length > 3 && 
    !['para', 'como', 'este', 'esta', 'pero', 'más', 'ante', 'tras'].includes(word)
  );
  return Array.from(new Set(words)).slice(0, 5);
}

export async function parseFeed(): Promise<News[]> {
  try {
    const allNews: News[] = [];
    const feedSources: FeedSource[] = [
      { 
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/chile/portada',
        section: 'Chile'
      },
      { 
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/argentina/portada',
        section: 'Argentina'
      },
      { 
        url: 'https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/mexico/portada',
        section: 'México'
      },
      { 
        url: 'https://elpais.com/rss/tecnologia/portada.xml',
        section: 'Tecnología'
      }
  ];

  for (const source of feedSources) {
      const response = await axios.get(source.url);
      const result = await parseStringPromise(response.data);
      
      const items = result.rss.channel[0].item;
      
      const parsedNews = items.map((item: any) => {
        const mediaContent = item['media:content'] || [];
        const enclosure = item.enclosure || [];
        const imageUrl = mediaContent[0]?.$.url || enclosure[0]?.$.url || '';
        const categories = item.category || [];
        const tags = categories.map((cat: any) => cat.toString()).filter(Boolean);

        const news: News = {
          title: item.title[0],
          link: item.link[0],
          description: item.description[0].replace(/<[^>]*>/g, ''), 
          date: new Date(item.pubDate[0]),
          image: imageUrl,
          section: source.section,
          source: 'El País',
          tags: tags.length > 0 ? tags : extractKeywords(item.title[0] + ' ' + item.description[0])
        };

        return news;
      });

      allNews.push(...parsedNews);
    }

    return allNews;

  } catch (error) {
    console.error('Error parsing feeds:', error);
    throw error;
  }
}