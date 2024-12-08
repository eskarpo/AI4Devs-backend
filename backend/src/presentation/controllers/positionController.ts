import { Request, Response } from 'express';
import { getCandidatesForPosition, updateCandidateStage } from '../../application/services/positionService';

export const getPositionCandidates = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        const candidates = await getCandidatesForPosition(req.prisma, positionId);
        res.json(candidates);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCandidateStageHandler = async (req: Request, res: Response) => {
    try {
        const candidateId = parseInt(req.params.id);
        const { newStageId } = req.body;

        if (!newStageId) {
            return res.status(400).json({ error: 'Se requiere newStageId' });
        }

        await updateCandidateStage(req.prisma, candidateId, newStageId);
        res.status(200).json({ message: 'Etapa actualizada correctamente' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}; 