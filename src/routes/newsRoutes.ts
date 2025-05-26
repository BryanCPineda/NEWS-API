import { Request, Response, Router } from 'express';
import NewsController from '../controllers/newsController';
import { queryParamsPagination, queryParamsSearch } from '../interfaces/interfaces';
import { deleteLimiter, fetchLimiter, generalLimiter, searchLimiter } from '../middleware/rateLimit';

const NewsRouter = Router();
const newsController = new NewsController();

NewsRouter.use(generalLimiter);

/**
 * @swagger
 * /news/fetch:
 *   post:
 *     summary: Actualiza noticias desde el feed
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Noticias actualizadas exitosamente
 */
NewsRouter.post('/fetch', fetchLimiter, (req: Request, res: Response) => newsController.fetchNews(req, res));

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Obtiene lista de noticias paginadas
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Cantidad de items por página
 *     responses:
 *       200:
 *         description: Lista de noticias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                 news:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     results:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/News'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
NewsRouter.get('/', (req: Request<unknown,queryParamsPagination,unknown >, res: Response) => newsController.getNews(req, res));

/**
 * @swagger
 * /news/search:
 *   get:
 *     summary: Busca noticias por título o fechas
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Título o tag a buscar
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha inicial (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha final (YYYY-MM-DD)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Cantidad de items por página
 *     responses:
 *       200:
 *         description: Noticias encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 */
NewsRouter.get('/search', searchLimiter, (req: Request<unknown,queryParamsSearch , unknown>, res: Response) => newsController.searchNews(req, res));

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Obtiene una noticia por ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la noticia
 *     responses:
 *       200:
 *         description: Noticia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/News'
 */
NewsRouter.get('/:id', (req: Request<{id: string}>, res: Response) => newsController.getNewsById(req, res));


/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Elimina una noticia por ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la noticia
 *     responses:
 *       200:
 *         description: Noticia eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/News'
 */
NewsRouter.delete('/:id', deleteLimiter,  (req: Request<{id: string}>, res: Response) => newsController.deleteNews(req, res));

export default NewsRouter;
