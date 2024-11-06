import express from 'express'
import { checkUser, createUser, deleteUser, getUserByUsername, getUsers, updateUser } from '../controllers/user';

const router = express.Router();

// router.use(express.json())

router.get('/users',getUsers);

router.get('/users/check',checkUser)

router.get('/users/:username',getUserByUsername)

router.put('/users/:username', updateUser)

router.post('/users/', createUser)

router.delete('/users/:username', deleteUser)

export default router;