/* eslint-disable prettier/prettier */

// https://apiagro-backend.herokuapp.com/

const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const FarmController = require('./controllers/farm/FarmController');
const UserController = require('./controllers/user/UserController');
const SessionController = require('./controllers/session/SessionController');
const HelpController = require('./controllers/help/HelpController');
const SensorController = require('./controllers/sensor/SensorController');
const DashboardController = require('./controllers/farm/DashboardController');
// const authMiddleware = require('./middlewares/auth');
const SearchController = require('./controllers/farm/SearchController');
const ActuatorController = require('./controllers/actuator/ActuatorController');
const NotificationController = require('./controllers/notification/NotificationController')

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

// todas as rotas abaixo do middleware precisam estar autenticadas

// routes.use(authMiddleware);

routes.get('/users', UserController.index);
// routes.put('/users', UserController.update);

routes.get('/farms', FarmController.index);
routes.post('/farms', upload.single('avatar_url'), FarmController.store);
routes.put('/farms/:farm_id', upload.single('avatar_url'), FarmController.update);
routes.delete('/farms', FarmController.destroy);

routes.get('/dashboard', DashboardController.index);
routes.get('/dashboard/cidade', DashboardController.indexCidade);
routes.get('/dashboard/cultivo', DashboardController.indexCultivo);
routes.get('/dashboard/today', DashboardController.indextoday);
routes.get('/dashboard/yesterday', DashboardController.indexyesterday)
routes.get('/dashboard/week', DashboardController.indexweek);
routes.get('/dashboard/month', DashboardController.indexmonth);
routes.get('/dashboard/year', DashboardController.indexyear);


routes.post('/helps', HelpController.store);
routes.get('/helps', HelpController.index);
routes.get('/helps/week', HelpController.indexweek);
routes.get('/helps/month', HelpController.indexmonth);
routes.get('/helps/year', HelpController.indexyear);

routes.post('/sensores', SensorController.store);
routes.get('/sensores/all', SensorController.index);
routes.get('/sensores/today', SensorController.indextoday);
routes.get('/sensores/week', SensorController.indexweek);
routes.get('/sensores/month', SensorController.indexmonth);
routes.get('/sensores/year', SensorController.indexyear);

// ---------------------------------------------------------------------------------------//

routes.get('/sensores/all/temperatura', SensorController.indexTemperatura);
routes.get('/sensores/today/temperatura', SensorController.indextodayTemperatura);
routes.get('/sensores/week/temperatura', SensorController.indexweekTemperatura);
routes.get('/sensores/month/temperatura', SensorController.indexmonthTemperatura);
routes.get('/sensores/year/temperatura', SensorController.indexyearTemperatura);

routes.get('/sensores/all/umidade', SensorController.indexUmidade);
routes.get('/sensores/today/umidade', SensorController.indextodayUmidade);
routes.get('/sensores/week/umidade', SensorController.indexweekUmidade);
routes.get('/sensores/month/umidade', SensorController.indexmonthUmidade);
routes.get('/sensores/year/umidade', SensorController.indexyearUmidade);

routes.get('/sensores/all/gasesCO2', SensorController.indexGasesCO2);
routes.get('/sensores/today/gasesCO2', SensorController.indextodayGasesCO2);
routes.get('/sensores/week/gasesCO2', SensorController.indexweekGasesCO2);
routes.get('/sensores/month/gasesCO2', SensorController.indexmonthGasesCO2);
routes.get('/sensores/year/gasesCO2', SensorController.indexyearGasesCO2);

// ---------------------------------------------------------------------------------------//
routes.get('/sensores/temperaturas', SensorController.temperaturas)
routes.get('/sensores/ultimatemperatura', SensorController.ultimaTemperatura)
routes.get('/sensores/temperaturatimestamp', SensorController.timesTampTemperatura)

routes.get('/sensores/umidades', SensorController.umidades)
routes.get('/sensores/ultimaumidade', SensorController.ultimaUmidade)
routes.get('/sensores/umidadetimestamp', SensorController.timesTampUmidade)

routes.get('/sensores/gasesCO2', SensorController.gasesCO2)
routes.get('/sensores/ultimagasesCO2', SensorController.ultimaGasesCO2)
routes.get('/sensores/gasesCO2timestamp', SensorController.timesTampGasesCO2)

// --------------------------------------------------------------------------------------//

routes.get('/sensores/objeto', SensorController.objetoGraficoXY) // lista x: dado1 e y: dado2 para graficos que requerem 2 parâmetro

/// ///////////atuadores
routes.post('/actuator', ActuatorController.active)
routes.get('/actuator', ActuatorController.index)
routes.put('/actuator/:actuator_id', ActuatorController.update)


routes.post('/notification', NotificationController.store)
routes.get('/notification', NotificationController.index)

// rota de busca no mapa da aplicação
routes.get('/search', SearchController.index);

module.exports = routes;
