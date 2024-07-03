import Classroom from '../models/classroom.model.js';

export const createclassroom = async (classroomData) => {
    try {
        if (classroomData.number.toString().length === 1) {
            classroomData.number = `0${classroomData.number}`;
        }

        const classroom = await Classroom.create(classroomData);
        return classroom;
    } catch (error) {
        throw new Error(`Error creating classroom: ${error.message}`);
    }
};


export const getAllclassrooms = async () => {
    try {
        const classrooms = await Classroom.findAll();

        classrooms.forEach(classroom => {
            const { type, year, number } = classroom.dataValues;
            classroom.dataValues.full = `${type} ${year}${number}`;
        });

        return classrooms;
    } catch (error) {
        throw new Error(`Error fetching classrooms: ${error.message}`);
    }
};

export const getclassroomById = async (classroomId) => {
    try {
        const classroom = await Classroom.findByPk(classroomId);
        if (!classroom) throw new Error('classroom not found');
        return classroom;
    } catch (error) {
        throw new Error(`Error fetching classroom: ${error.message}`);
    }
};

export const updateclassroom = async (classroomId, updateData) => {
    try {
        const classroom = await Classroom.findByPk(classroomId);
        if (!classroom) throw new Error('classroom not found');

        if (updateData.year.toString().length === 1) {
            updateData.year = `0${updateData.year}`;
        }
        
        await Classroom.update(updateData);
        return classroom;
    } catch (error) {
        throw new Error(`Error updating classroom: ${error.message}`);
    }
};

export const deleteclassroom = async (classroomId) => {
    try {
        const classroom = await Classroom.findByPk(classroomId);
        if (!classroom) throw new Error('classroom not found');
        
        await Classroom.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting classroom: ${error.message}`);
    }
};