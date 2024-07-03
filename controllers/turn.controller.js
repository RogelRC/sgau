import Turn from '../models/turn.model.js';
import Subject from '../models/subject.model.js'

export const createOrUpdateTurn = async (turnData) => {
    try {
        const { index, schedule_id, ...restTurnData } = turnData;

        let turn = await Turn.findOne({
            where: { index, schedule_id }
        });

        if (turn) {
            await turn.update(restTurnData);
        } else {
            turn = await Turn.create({
                index,
                schedule_id,
                ...restTurnData
            });
        }

        return turn;
    } catch (error) {
        throw new Error(`Error creating or updating turn: ${error.message}`);
    }
};

export const getAllTurns = async (turnData) => {
    try {
        const { schedule_id, ...restTurnData } = turnData;

        // Obtener todos los turnos para el schedule_id dado
        const turns = await Turn.findAll({
            where: { schedule_id, ...restTurnData }
        });

        // Crear un mapa de los turns existentes para acceso rápido
        const turnMap = new Map();
        turns.forEach(turn => {
            turnMap.set(turn.index, turn);
        });

        // Crear una lista de 30 objetos, con índices de 0 a 29
        const allTurns = await Promise.all(Array.from({ length: 30 }, async (_, index) => {
            if (turnMap.has(index)) {
                const turn = turnMap.get(index);
                // Obtener la abreviatura del subject_id
                const subject = await Subject.findOne({
                    where: { id: turn.subject_id },
                    attributes: ['abbreviation']
                });
                return {
                    ...turn.get({ plain: true }),
                    abbreviation: subject ? subject.abbreviation : ""
                };
            } else {
                return {
                    id: "",
                    index,
                    description: "",
                    task: "",
                    subject_id: "",
                    user_id: "",
                    classroom_id: "",
                    schedule_id: "",
                    abbreviation: ""
                };
            }
        }));

        return allTurns;
    } catch (error) {
        throw new Error(`Error fetching turns: ${error.message}`);
    }
};


export const getTurnById = async (turnId) => {
    try {
        const turn = await Turn.findByPk(turnId);
        if (!turn) throw new Error('Turn not found');
        return turn;
    } catch (error) {
        throw new Error(`Error fetching turn: ${error.message}`);
    }
};

export const updateTurn = async (turnId, updateData) => {
    try {
        const turn = await Turn.findByPk(turnId);
        if (!turn) throw new Error('Turn not found');
        
        await turn.update(updateData);
        return turn;
    } catch (error) {
        throw new Error(`Error updating turn: ${error.message}`);
    }
};

export const deleteTurn = async (turnId) => {
    try {
        const turn = await Turn.findByPk(turnId);
        if (!turn) throw new Error('Turn not found');
        
        await turn.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting turn: ${error.message}`);
    }
};
