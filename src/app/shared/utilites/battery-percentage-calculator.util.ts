
const totalCapacity: number = 2400;  // mAh
function getSocFromVoltage(voltage: number): number {
  // Example discharge curve for a Li-ion battery
  const dischargeCurve: { [key: number]: number } = {
    4.2: 1.00,
    3.9: 0.75,
    3.7: 0.50,
    3.4: 0.25,
    3.0: 0.00
  };

  // Find the closest voltage in the curve
  const closestVoltage = (Object.keys(dischargeCurve) as unknown as number[]).reduce((prev, curr) => {
    return (Math.abs(curr - voltage) < Math.abs(prev - voltage) ? curr : prev);
  });

  const soc = dischargeCurve[closestVoltage];
  return soc;
}

function calculateCurrentCapacity(totalCapacity: number, voltage: number): number {
  const soc = getSocFromVoltage(voltage);
  const currentCapacity = totalCapacity * soc;
  return (currentCapacity / totalCapacity) * 100;
}

/**
 * 
 * @param battery Battery data volt
 * @param isStyle Applying style for battery accordingly calculation this is a optional field
*/
export const calculateBatteryPercentage = (battery: number, isStyle?: boolean): number | string => {
  
  const currentCapacity = calculateCurrentCapacity(totalCapacity, battery);
  return isStyle ?
    (currentCapacity > 81 ? 'fa-battery-full text-success'
      : currentCapacity > 60 ? 'fa-battery-three-quarters text-success'
      : currentCapacity > 41 ? 'fa-battery-half text-success'
        : currentCapacity > 30 ? 'fa-battery-half text-warn-orange'
          : currentCapacity > 15 ? 'fa-battery-quarter text-warn-red'
            : 'fa-battery-empty text-warn-red')
    : currentCapacity;
}
