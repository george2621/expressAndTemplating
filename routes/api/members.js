import express from "express";
const router = express.Router();
import { getAllMembers, getMemberById, createMember, updateMember, deleteMember } from '../../controllers/members.js'

//Get all members 
router.get('/', getAllMembers);

//Get member by id
router.get('/:id', getMemberById)

//Add member
router.post('/', createMember)

//Update member
router.put('/:id', updateMember)

//Delete member
router.post('/:id', deleteMember)


export default router;
