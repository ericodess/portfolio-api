import os from  "os";

const getCPUUsage = async () => {
	const cpuAverageUsageList: number[] = os.loadavg();

	const isWindowsEnvironment: boolean = (cpuAverageUsageList[0] === 0);

	if(isWindowsEnvironment){
		let usagePercentage: number = 0,
			initialCPUTicks: number = 0,
			finalCPUTicks: number = 0;

		const initialCPUTicksList: number[] = [],
			  finalCPUTicksList: number[] = [];

		const initialCPUInfoList: os.CpuInfo[] = os.cpus();
		
		await new Promise(resolve => setTimeout(resolve, 2000));

		const finalCPUInfoList: os.CpuInfo[] = os.cpus();

		for(let i: number = 0; i < finalCPUInfoList.length; i++){
			let preDelayCPUInfo: os.CpuInfo = initialCPUInfoList[i],
				postDelayCPUInfo: os.CpuInfo = finalCPUInfoList[i];

			Object.values(preDelayCPUInfo.times).forEach((value) => {
				initialCPUTicksList.push(value);
			});

			Object.values(postDelayCPUInfo.times).forEach((value) => {
				finalCPUTicksList.push(value);
			});

			finalCPUTicksList.forEach((tickValue, index) => {
				initialCPUTicks += initialCPUTicksList[index];
				finalCPUTicks += finalCPUTicksList[index];
			});

			Object.entries(postDelayCPUInfo.times).forEach(([CPUInfoType,], index) => {
				if(CPUInfoType === "system" || CPUInfoType === "user"){
					usagePercentage += ((1000 * (finalCPUTicksList[index] - initialCPUTicksList[index]) / (finalCPUTicks - initialCPUTicks)) * 0.5);
				};
			});
		};

		return Math.round(parseFloat((usagePercentage / finalCPUInfoList.length).toFixed(2)));
	}else{
		const CPUInfo = {
			cpuAverage1: cpuAverageUsageList[0],
			cpuAverage5: cpuAverageUsageList[1],
			cpuAverage15: cpuAverageUsageList[2],
			cores: Array.isArray(os.cpus()) ? os.cpus().length : 1
		};

		return Math.min(Math.floor((CPUInfo.cpuAverage5 * 100) / CPUInfo.cores), 100);
	};
};

export default getCPUUsage;