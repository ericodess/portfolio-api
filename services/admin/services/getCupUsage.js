const getCpuUsage = async () => {
    const os = require('os');

    const cpuAverageUsageList = os.loadavg();

    if(cpuAverageUsageList[0] === 0){
        let usagePercentage = 0,
            initialTicks = 0,
            initialCPU,
            finalTicks = 0,
            finalCPU;

        initialCPU = os.cpus();

        await new Promise(resolve => setTimeout(resolve, 2000));

        finalCPU = os.cpus();

        for(let i = 0; i < finalCPU.length; i++) {
            const cpu = finalCPU[i],
                  pastCPU = initialCPU[i];
            
            for(const type in cpu.times) {
                initialTicks += pastCPU.times[type];
                finalTicks += cpu.times[type];
            };

            for(type in cpu.times) {
                if(type === 'system' || type === "user"){
                    usagePercentage += ((1000 * (cpu.times[type] - pastCPU.times[type]) / (finalTicks - initialTicks)) * 0.5);
                };
            }
        };

        return Math.round(parseFloat((usagePercentage / finalCPU.length).toFixed(1)));
    }else{
        const cpu = {
            cpuAverage1: cpuAverageUsageList[0],
            cpuAverage5: cpuAverageUsageList[1],
            cpuAverage15: cpuAverageUsageList[2],
            cores: Array.isArray(os.cpus()) ? os.cpus().length : null,
        };

        return Math.min(Math.floor(cpu.cpuAverage5 * 100 / cpu.cores), 100);
    }
};

module.exports = getCpuUsage;