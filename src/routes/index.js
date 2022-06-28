const { Router } = require('express');
const router = Router()



router.get('/test', (req, res) => {
    const data = {
        "name": "Computadora",
        "cost": "780"
    }
    res.json(data);
})

module.exports = router;