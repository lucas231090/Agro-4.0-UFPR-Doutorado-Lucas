const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require('date-fns');

const current = new Date();
/* eslint-disable no-undef */
const Sensor = require('../../models/Sensor');
// const User = require('../../models/User');

module.exports = {
  /*

  async index(request, response) {
    const sensores = await Sensor.find();

    return response.json(sensores);
  },

  */

  // listando sensores só por user_id

  async index(request, response) {
    const sensores = await Sensor.find();

    return response.json(sensores);
  },

  async indextoday(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfDay(current), $lte: endOfDay(current) },
    });

    return response.status(200).json(sensores);
  },

  async indexweek(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfWeek(current), $lte: endOfWeek(current) },
    });

    return response.status(200).json(sensores);
  },

  async indexmonth(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfMonth(current), $lte: endOfMonth(current) },
    });

    return response.status(200).json(sensores);
  },

  async indexyear(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfYear(current), $lte: endOfYear(current) },
    });

    return response.status(200).json(sensores);
  },

  async indexTemperatura(request, response) {
    const sensores = await Sensor.find().where({
      tipoMedida2: 'Temperatura',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor2);

    return response.status(200).json(arrayNumeros);
  },

  async indextodayTemperatura(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfDay(current), $lte: endOfDay(current) },
    }).where({
      tipoMedida2: 'Temperatura',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor2);

    return response.status(200).json(arrayNumeros);
  },

  async indexweekTemperatura(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfWeek(current), $lte: endOfWeek(current) },
    }).where({
      tipoMedida2: 'Temperatura',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor2);

    return response.status(200).json(arrayNumeros);
  },

  async indexmonthTemperatura(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfMonth(current), $lte: endOfMonth(current) },
    }).where({
      tipoMedida2: 'Temperatura',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor2);

    return response.status(200).json(arrayNumeros);
  },

  async indexyearTemperatura(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfYear(current), $lte: endOfYear(current) },
    }).where({
      tipoMedida2: 'Temperatura',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor2);

    return response.status(200).json(arrayNumeros);
  },

  async indexUmidade(request, response) {
    const sensores = await Sensor.find().where({
      tipoMedida1: 'Umidade',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indextodayUmidade(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfDay(current), $lte: endOfDay(current) },
    }).where({
      tipoMedida1: 'Umidade',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indexweekUmidade(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfWeek(current), $lte: endOfWeek(current) },
    }).where({
      tipoMedida1: 'Umidade',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indexmonthUmidade(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfMonth(current), $lte: endOfMonth(current) },
    }).where({
      tipoMedida1: 'Umidade',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indexyearUmidade(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfYear(current), $lte: endOfYear(current) },
    }).where({
      tipoMedida1: 'Umidade',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indexGasesCO2(request, response) {
    const sensores = await Sensor.find().where({
      tipoMedida1: 'CO2',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indextodayGasesCO2(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfDay(current), $lte: endOfDay(current) },
    }).where({
      tipoMedida1: 'CO2',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indexweekGasesCO2(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfWeek(current), $lte: endOfWeek(current) },
    }).where({
      tipoMedida1: 'CO2',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indexmonthGasesCO2(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfMonth(current), $lte: endOfMonth(current) },
    }).where({
      tipoMedida1: 'CO2',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async indexyearGasesCO2(request, response) {
    const sensores = await Sensor.find({
      timestamp: { $gte: startOfYear(current), $lte: endOfYear(current) },
    }).where({
      tipoMedida1: 'CO2',
    });

    const arrayNumeros = sensores.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async store(request, response) {
    const {
      tipoMedida1,
      tipoMedida2,
      unidadeMedida1,
      unidadeMedida2,
      modeloSensor,
      valor1,
      valor2,
      ipArduino,
    } = request.body;

    const { user_id } = request.headers;

    sensores = await Sensor.create({
      user_id,
      tipoMedida1,
      tipoMedida2,
      unidadeMedida1,
      unidadeMedida2,
      modeloSensor,
      valor1,
      valor2,
      ipArduino,
    });

    return response.status(200).json({ sensores });
  },

  async temperaturas(request, response) {
    const temperatura = await Sensor.find().where({
      tipoMedida2: 'Temperatura',
    });

    const arrayNumeros = temperatura.map((temp) => temp.valor2);

    return response.status(200).json(arrayNumeros);
  },

  async ultimaTemperatura(request, response) {
    const ultimatemperatura = await Sensor.find()
      .sort({ _id: -1 })
      .limit(1)
      .where({
        tipoMedida2: 'Temperatura',
      })
      .select({
        valor2: 1,
        _id: 0,
      });

    const arrayNumeros = ultimatemperatura.map((temp) => temp.valor2);

    return response.status(200).json(arrayNumeros);
  },

  async timesTampTemperatura(request, response) {
    const timestampTemperatura = await Sensor.find().where({
      tipoMedida2: 'Temperatura',
    });

    const arrayNumeros = timestampTemperatura.map((umid) => umid.timestamp);

    return response.status(200).json(arrayNumeros);
  },

  async umidades(request, response) {
    const umidade = await Sensor.find().where({ tipoMedida1: 'Umidade' });

    const arrayNumeros = umidade.map((umid) => umid.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async ultimaUmidade(request, response) {
    const ultimaumidade = await Sensor.find()
      .sort({ _id: -1 })
      .limit(1)
      .where({
        tipoMedida1: 'Umidade',
      })
      .select({
        valor1: 1,
        _id: 0,
      });

    const arrayNumeros = ultimaumidade.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async timesTampUmidade(request, response) {
    const timestampUmidade = await Sensor.find().where({
      tipoMedida1: 'Umidade',
    });

    const arrayNumeros = timestampUmidade.map((umid) => umid.timestamp);

    return response.status(200).json(arrayNumeros);
  },

  async gasesCO2(request, response) {
    const co2 = await Sensor.find().where({ tipoMedida1: 'CO2' });

    const arrayNumeros = co2.map((gco2) => gco2.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async ultimaGasesCO2(request, response) {
    const ultimaGasesCO2 = await Sensor.find()
      .sort({ _id: -1 })
      .limit(1)
      .where({
        tipoMedida1: 'CO2',
      })
      .select({
        valor1: 1,
        _id: 0,
      });

    const arrayNumeros = ultimaGasesCO2.map((temp) => temp.valor1);

    return response.status(200).json(arrayNumeros);
  },

  async timesTampGasesCO2(request, response) {
    const timestampGasesCO2 = await Sensor.find().where({
      tipoMedida1: 'CO2',
    });

    const arrayNumeros = timestampGasesCO2.map((umid) => umid.timestamp);

    return response.status(200).json(arrayNumeros);
  },

  async objetoGraficoXY(request, response) {
    const temperatura = await Sensor.find()
      .where({ tipoMedida1: 'Umidade' })
      .select({
        valor1: 1,
        valor2: 1,
        _id: 0,
      });

    const temperaturaXY = JSON.parse(
      JSON.stringify(temperatura)
        .split('"valor1"')
        .join('"x"')
        .split('"valor2"')
        .join('"y"')
    );

    return response.status(200).json(temperaturaXY);
  },
};

// const temperatura = await Sensor.find({}, { valor1: 1 });
// const temperatura = await Sensor.find();

// const temperatura = await Sensor.find().select('valor1');
