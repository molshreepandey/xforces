import {prisma} from "../src/index";

async function main() {
  console.log('Start seeding...');

  // Optional: Clear existing data to avoid duplicates
  await prisma.questions.deleteMany();

  const questions = [
    {
      title: "Two Sum",
      content: `# Two Sum
      
      Given an array of integers \`nums\` and an integer \`target\`, return **indices** of the two numbers such that they add up to \`target\`.
      
      You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.
      
      ---
      
      ### Test Case 1
      * **Input:** \`nums = [2, 7, 11, 15]\`, \`target = 9\`
      * **Output:** \`[0, 1]\`
      * **Explanation:** Because \`nums[0] + \`nums[1]\` == 9, we return \`[0, 1]\`.
      
      ### Test Case 2
      * **Input:** \`nums = [3, 2, 4]\`, \`target = 6\`
      * **Output:** \`[1, 2]\`
      * **Explanation:** Because \`nums[1] + \`nums[2]\` == 6, we return \`[1, 2]\`.`,
      code:'#include<iostream>\nusing namespace std;\nint main(){\n// write your code here\n};',
      input: "2 7 11 15 9",
      output: "0 1",
    },
    {
      title: "Palindrome Number",
      content: `# Palindrome Number
      
      Determine whether an integer is a **palindrome**. An integer is a palindrome when it reads the same backward as forward.
      
      ---
      
      ### Example 1
      * **Input:** \`x = 121\`
      * **Output:** \`true\`
      * **Explanation:** \`121\` reads as \`121\` from left to right and from right to left.
      
      ### Example 2
      * **Input:** \`x = -121\`
      * **Output:** \`false\`
      * **Explanation:** From left to right, it reads \`-121\`. From right to left, it becomes \`121-\`. Therefore it is not a palindrome.`,
      code:'#include<iostream>\nusing namespace std;\nint main(){\n\\\\write your code here\n};',
      input: "121",
      output: "true",
    },
    {
      title: "Fibonacci Sequence",
      content: `# Fibonacci Sequence
        
      The **Fibonacci numbers**...
      * \`F(0) = 0\`, \`F(1) = 1\`
      * \`F(n) = F(n - 1) + F(n - 2)\`...
      
      ---
      
      ### Example 1
      * **Input:** \`x = 1\`
      * **Output:** \`1\`
      
      ### Example 2
      * **Input:** \`x = 2\`
      * **Output:** \`3\`
      `,
      code:'#include<iostream>\nusing namespace std;\nint main(){\n\\\\write your code here\n};',
      input: "10",
      output: "55",
    }
  ];

  for (const q of questions) {
    const question = await prisma.questions.create({
      data: q,
    });
    console.log(`Created question with id: ${question.id}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });