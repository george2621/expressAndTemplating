import members from '../members.js';
import { v4 as uuidv4 } from "uuid";

export const getAllMembers = (req, res) => {
    res.json(members);
}

export const getMemberById = (req, res) => {
    const selectedMember = members.some(member => member.id == req.params.id);

    if (selectedMember) {
        res.send(members.find(member => member.id == req.params.id));
    } else {
        res.status(400).json({ msg: `Member ${req.params.id} not found` })
    }
}


export const createMember = (req, res) => {
    const newMember = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        active: 'active'
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: "Please check name and email" })
    }
    members.push(newMember);
    res.redirect('/');
}

export const updateMember = (req, res) => {
    const selectedItemToUpdateFounded = members.some(member => member.id == req.params.id);

    if (selectedItemToUpdateFounded) {
        const selectedItemToUpdate = members.find(member => member.id == req.params.id);
        selectedItemToUpdate.name = req.body.name ? req.body.name : selectedItemToUpdate.name;
        selectedItemToUpdate.email = req.body.email ? req.body.email : selectedItemToUpdate.email;
        res.json({ msg: "Member added", members: members });
    } else {
        res.status(400).json({ msg: "Member doesn't exists" })
    }

}


export const deleteMember = (req, res) => {
    const selectedItemToUpdateFounded = members.some(member => member.id == req.params.id);

    if (selectedItemToUpdateFounded) {
        res.json({ msg: "Member Deleted", members: members.filter(member => member.id != req.params.id) });
    } else {
        res.status(400).json({ msg: "Member doesn't exists" })
    }

}