import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:id', UserControllers.getSingleUser);

router.delete('/:id', UserControllers.deleteUser);

export const UserRoute = router;
