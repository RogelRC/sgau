import Subject from '../models/subject.model.js';

export const createSubject = async (subjectData) => {
    try {
        const subject = await Subject.create(subjectData);
        return subject;
    } catch (error) {
        throw new Error(`Error creating subject: ${error.message}`);
    }
};

export const getAllSubjects = async () => {
    try {
        const subjects = await Subject.findAll();
        return subjects;
    } catch (error) {
        throw new Error(`Error fetching subjects: ${error.message}`);
    }
};

export const getSubjectById = async (subjectId) => {
    try {
        const subject = await Subject.findByPk(subjectId);
        if (!subject) throw new Error('Subject not found');
        return subject;
    } catch (error) {
        throw new Error(`Error fetching subject: ${error.message}`);
    }
};

export const updateSubject = async (subjectId, updateData) => {
    try {
        const subject = await Subject.findByPk(subjectId);
        if (!subject) throw new Error('Subject not found');

        await subject.update(updateData);
        return subject;
    } catch (error) {
        throw new Error(`Error updating subject: ${error.message}`);
    }
};

export const deleteSubject = async (subjectId) => {
    try {
        const subject = await Subject.findByPk(subjectId);
        if (!subject) throw new Error('Subject not found');

        await subject.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting subject: ${error.message}`);
    }
};
