import { Position } from '@prisma/client';

export interface CandidatePositionInfo {
    id: number;
    fullName: string;
    currentStage: string;
    averageScore: number;
}

export interface IPositionRepository {
    findById(id: number): Promise<Position | null>;
    getCandidatesForPosition(positionId: number): Promise<CandidatePositionInfo[]>;
    updateCandidateStage(candidateId: number, newStageId: number): Promise<void>;
}