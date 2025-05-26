import { model } from 'mongoose';
import newsSchema from '../Schema/newsSchema';
import { News } from '../interfaces/interfaces';


const newsModel = model<News>('Noticia', newsSchema);

export default newsModel;

