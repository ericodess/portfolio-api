const os = require('os');

//Services
const byteToGigabyte = require('.').byteToGigabyte;

const getMemoryUsage = () => {
    const freeMemory = os.freemem(),
          totalMemory = os.totalmem();

    const usedMemoryInGB = byteToGigabyte(totalMemory - freeMemory),
          freeMemoryInGB = Math.round(byteToGigabyte(totalMemory));

    return {
        usedGB: usedMemoryInGB,
        usedPercentage: parseFloat((100 * (usedMemoryInGB / freeMemoryInGB)).toFixed(1))
    };
};

module.exports = getMemoryUsage;