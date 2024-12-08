import { PrismaClient } from '@prisma/client';
import { IPositionRepository } from '../interfaces/IPositionRepository';
import { CandidatePositionInfo } from '../interfaces/IPositionRepository';

export class PositionDomainService implements IPositionRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async findById(id: number) {
        return await this.prisma.position.findUnique({
            where: { id }
        });
    }

    async getCandidatesForPosition(positionId: number): Promise<CandidatePositionInfo[]> {
        const applications = await this.prisma.application.findMany({
            where: { positionId },
            include: {
                candidate: true,
                interviewStep: true,
                interviews: {
                    where: {
                        result: { not: null }
                    },
                    select: {
                        score: true
                    }
                }
            }
        });

        return applications.map(app => ({
            id: app.candidateId,
            fullName: `${app.candidate.firstName} ${app.candidate.lastName}`,
            currentStage: app.interviewStep.name,
            averageScore: this.calculateAverageScore(app.interviews)
        }));
    }

    async updateCandidateStage(candidateId: number, newStageId: number): Promise<void> {
        await this.prisma.application.updateMany({
            where: { candidateId },
            data: { currentInterviewStep: newStageId }
        });
    }

    private calculateAverageScore(interviews: { score: number | null }[]): number {
        const validScores = interviews.filter(i => i.score !== null).map(i => i.score as number);
        if (validScores.length === 0) return 0;
        return validScores.reduce((a, b) => a + b, 0) / validScores.length;
    }
}
