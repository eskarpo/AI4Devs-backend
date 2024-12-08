import express from 'express';
import { getPositionCandidates, updateCandidateStageHandler } from '../presentation/controllers/positionController';

const router = express.Router();

router.get('/:id/candidates', getPositionCandidates);
router.put('/candidates/:id/stage', updateCandidateStageHandler);

export default router; 