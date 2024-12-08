import { PositionDomainService } from '../../domain/services/PositionDomainService';

export const getCandidatesForPosition = async (prisma: any, positionId: number) => {
    const positionService = new PositionDomainService(prisma);
    return await positionService.getCandidatesForPosition(positionId);
};

export const updateCandidateStage = async (prisma: any, candidateId: number, newStageId: number) => {
    const positionService = new PositionDomainService(prisma);
    await positionService.updateCandidateStage(candidateId, newStageId);
}; 