import Schedule from '../models/schedule.model.js';
import Turn from '../models/turn.model.js';

export const createSchedule = async (scheduleData) => {
    try {
        const schedule = await Schedule.create(scheduleData);
        return schedule;
    } catch (error) {
        throw new Error(`Error creating schedule: ${error.message}`);
    }
};

export const getAllSchedules = async () => {
    try {
        const schedules = await Schedule.findAll();
        return schedules;
    } catch (error) {
        throw new Error(`Error fetching schedules: ${error.message}`);
    }
};

export const getScheduleById = async (scheduleId) => {
    try {
        const schedule = await Schedule.findByPk(scheduleId,{
            include: {
                model: Turn,
                as: 'turns'
            }
        });
        if (!schedule) throw new Error('Schedule not found');
        return schedule;
    } catch (error) {
        throw new Error(`Error fetching schedule: ${error.message}`);
    }
};

export const updateSchedule = async (scheduleId, updateData) => {
    try {
        const schedule = await Schedule.findByPk(scheduleId);
        if (!schedule) throw new Error('Schedule not found');
        
        await schedule.update(updateData);
        return schedule;
    } catch (error) {
        throw new Error(`Error updating schedule: ${error.message}`);
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        const schedule = await Schedule.findByPk(scheduleId);
        if (!schedule) throw new Error('Schedule not found');
        
        await schedule.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting schedule: ${error.message}`);
    }
};
