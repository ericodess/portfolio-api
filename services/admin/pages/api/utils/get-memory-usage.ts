import os from "os";

//Types
import { IMemoryUsage } from "../../../interfaces/endpoint";

//Services
import byteToGigabyte from "./byte-to-gigabyte";

const getMemoryUsage = (): IMemoryUsage => {
	const freeMemory: number = os.freemem(),
		  totalMemory: number = os.totalmem(),
		  usedMemoryInGB: number = byteToGigabyte((totalMemory - freeMemory)),
		  freeMemoryInGB: number =  Math.round(byteToGigabyte(totalMemory));

	return {
		usedMemory: usedMemoryInGB,
		usedMemoryPercentage: parseFloat((100 * (usedMemoryInGB / freeMemoryInGB)).toFixed(1))
	};
};

export default getMemoryUsage;