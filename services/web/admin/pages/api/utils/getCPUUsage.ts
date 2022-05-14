import systemInformation from 'systeminformation';

//Types
import { ICPUUsage } from '../../../interfaces/endpoint';

const getCPUUsage = async (): Promise<ICPUUsage> => {
	const systemLoad: systemInformation.Systeminformation.CurrentLoadData =
		await systemInformation.currentLoad((systemLoad) => {
			return systemLoad.currentLoad;
		});

	return {
		usedPercentage: Math.round(systemLoad.currentLoad),
	};
};

export default getCPUUsage;
