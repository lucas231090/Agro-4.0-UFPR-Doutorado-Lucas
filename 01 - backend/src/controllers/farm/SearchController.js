/* eslint-disable import/no-unresolved */
const Farm = require('../../models/Farm');
const parseStringAsArray = require('../../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const { cultivos } = request.query;

    // const { latitude, longitude, techs } = request.query;

    const cultivosArray = parseStringAsArray(cultivos);

    const farms = await Farm.find({
      cultivos: {
        $in: cultivosArray,
      },
    });

    return response.json({ farms });
  },
};

// dentro de Farm.find()

/**

{
        techs: {
          $in: techsArray,
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: 10000,
          },
        },
      }

*/
