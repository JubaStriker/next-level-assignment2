import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

router.delete('/:userId', UserControllers.deleteUser);

router.put('/:userId/orders', UserControllers.addProduct);

router.get('/:userId/orders', UserControllers.getProducts);

router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRoute = router;
