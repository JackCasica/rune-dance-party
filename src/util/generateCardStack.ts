import { Card } from "../types/types";
import { LimbEnum } from "../types/types";

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/* GENERATES AN ARRAY OF CARD OBJECTS. THE CARD OBJECT CONISTS OF A COLOR AND LIMBS ARRAY */
export const generateCardStack = (totalCards: number): Card[] => {
  const colors = ["pink", "yellow", "orange", "purple"];
  const stack: Card[] = [];
  for (let i = 0; i < totalCards; i++) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const limbs = Array(4)
      .fill(0)
      .map(() => getRandomNumber(1, 3));
    stack.push({ color: colors[randomIndex], limbs: limbs });
  }
  return stack;
};