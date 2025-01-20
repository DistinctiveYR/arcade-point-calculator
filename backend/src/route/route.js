const query = require('../handlers/query/query');

const router = require('express').Router();

router.post('/queries', query)

module.exports = router;