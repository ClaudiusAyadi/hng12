import { Hono } from 'hono';

interface NumberClassification {
	number: number;
	is_prime: boolean;
	is_perfect: boolean;
	properties: string[];
	digit_sum: number;
	fun_fact: string;
}

const router = new Hono().get('/', async c => {
	const { number } = c.req.query();

	if (isNaN(+number) || number === undefined) {
		return c.json({ number: 'alphabet', error: true }, 400);
	}

	const num = parseInt(number, 10);

	if (!Number.isInteger(num)) {
		return c.json({ number: number, error: true }, 400);
	}
	const isPrime = (num: number): boolean => {
		if (num <= 1) return false;
		for (let i = 2; i <= Math.sqrt(num); i++) {
			if (num % i === 0) return false;
		}
		return true;
	};

	const isPerfect = (num: number): boolean => {
		if (num <= 1) return false;
		let sum = 1;
		for (let i = 2; i * i <= num; i++) {
			if (num % i === 0) {
				sum += i;
				if (i * i !== num) {
					sum += num / i;
				}
			}
		}
		return sum === num;
	};

	const getDigitSum = (num: number): number => {
		let sum = 0;
		let temp = num;
		while (temp > 0) {
			sum += temp % 10;
			temp = Math.floor(temp / 10);
		}
		return sum;
	};

	const isArmstrong = (num: number): boolean => {
		const numStr = num.toString();
		const numDigits = numStr.length;
		let sum = 0;
		for (let i = 0; i < numDigits; i++) {
			sum += Math.pow(parseInt(numStr[i]), numDigits);
		}
		return sum === num;
	};

	const getFunFact = async (num: number): Promise<string> => {
		try {
			const response = await fetch(`http://numbersapi.com/${num}/math`);

			if (!response.ok) {
				console.error(`Numbers API error: ${response.status}`);
				return 'Could not retrieve fun fact.';
			}

			const fact = await response.text();

			return fact;
		} catch (error) {
			console.error('Error fetching fun fact:', error);
			return 'Could not retrieve fun fact.';
		}
	};

	const properties: string[] = [];
	if (isArmstrong(num)) {
		properties.push('armstrong');
	}
	if (num % 2 === 0) {
		properties.push('even');
	} else {
		properties.push('odd');
	}
	const funFact = await getFunFact(num);

	const responseData: NumberClassification = {
		number: num,
		is_prime: isPrime(num),
		is_perfect: isPerfect(num),
		properties: properties,
		digit_sum: getDigitSum(num),
		fun_fact: funFact,
	};

	return c.json(responseData);
});

export default router;
