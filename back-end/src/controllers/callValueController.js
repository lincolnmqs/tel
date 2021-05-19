const CallValue = require('../models/callValue');

class CallValueController {
    async index(req, res) {
        try {
            await CallValue.find(function(err, values) {
                if(err)
                    res.send(err);
     
                res.json(values);
            });

        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' })
        }
    }

    async indexId(req, res) {
        try {
            const { id } = req.params;

            await CallValue.findById({ _id: id }, function(err, value) {
                if(err)
                    res.send(err);
     
                res.json(value);
            });

        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' })
        }
    }
    
    async store(req, res) {
        try {
            const callValue = await CallValue.create(req.body);
            
            return res.send({ callValue });
        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' });
        }
    }

    async put(req, res) {
        try {
            const { id } = req.params;
            
            const callValue = await CallValue.updateOne({ _id: id }, req.body);

            return res.send( callValue );
        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await CallValue.remove({ _id: id });

            return res.send({ message: 'Successfully deleted!' });
        } catch (error) {
            return res.status(500).json({ error: 'Unknown error.' });
        }
    }
}

module.exports = new CallValueController();