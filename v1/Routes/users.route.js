const express = require('express');
const { getUsersController, postUsersController, deleteUsersController, updateUsersController } = require('../Controllers/users.controller');

const router = express.Router();

router.route('/')
    .get(getUsersController)
    .delete(deleteUsersController)
    .patch(updateUsersController)

    
router.route('/:email')
.post(postUsersController)



module.exports = router;