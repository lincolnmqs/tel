const express   = require('express');
const CallValue = require('./controllers/callValueController');
const Flat      = require('./controllers/flatController');

const routers = express.Router();

routers.get('/api/callValue', CallValue.index);
routers.get('/api/callValueId:id', CallValue.indexId);
routers.post('/api/newCallValue', CallValue.store);
routers.put('/api/updateCallValue:id', CallValue.put);
routers.delete('/api/deleteCallValue:id', CallValue.delete);
routers.get('/api/flat', Flat.index);
routers.get('/api/flatId:id', Flat.indexId);
routers.post('/api/newFlat', Flat.store);
routers.put('/api/updateFlat:id', Flat.put);
routers.delete('/api/deleteFlat:id', Flat.delete);

module.exports = routers;