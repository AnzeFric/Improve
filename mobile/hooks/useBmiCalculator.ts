export function useBmiCalculator() {
  function getBmiCategory(bmi: number): string {
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) return "Healthy Weight";
    else if (bmi >= 25.0 && bmi <= 29.9) return "Overweight";
    else if (bmi >= 30.0 && bmi <= 34.9) return "Obese, Class 1";
    else if (bmi >= 35.0 && bmi <= 39.9) return "Obese, Class 2";
    else return "Obese, Class 3";
  }

  function getBmiColor(bmi: number): string {
    if (bmi < 18.5) return "red";
    else if (bmi >= 18.5 && bmi <= 24.9) return "green";
    else if (bmi >= 25.0 && bmi <= 29.9) return "#ebad02";
    else if (bmi >= 30.0 && bmi <= 34.9) return "red";
    else if (bmi >= 35.0 && bmi <= 39.9) return "red";
    else return "#830001";
  }

  function calculateBmi(weight: number, heightCm: number): number {
    const heightM = heightCm / 100;
    const heightM2 = Math.pow(heightM, 2);
    const bmi = weight / heightM2;

    return parseFloat(bmi.toFixed(1));
  }

  return {
    getBmiCategory,
    getBmiColor,
    calculateBmi,
  };
}
