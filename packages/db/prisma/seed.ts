import {prisma} from "../src/index";

async function main() {
  console.log('Start seeding...');

  // Optional: Clear existing data to avoid duplicates
  await prisma.questions.deleteMany();

 const questions = [
    // --- MATHEMATICS & BASICS ---
    {
      title: "Factorial Calculation",
      content: `# Factorial Calculation
  
  Write a program to calculate the factorial of a given non-negative integer \`n\`. 
  The factorial of a number is the product of all integers from 1 to that number.
  
  ---
  
  ### Example 1
  * **Input:** \`5\`
  * **Output:** \`120\`
  * **Explanation:** 5 * 4 * 3 * 2 * 1 = 120
  
  ### Example 2
  * **Input:** \`0\`
  * **Output:** \`1\`
  `,
      code: `#include <iostream>
  using namespace std;
  
  int main() {
      int n;
      if (cin >> n) {
          // Write your code here
      }
      return 0;
  }`,
      input: "5",
      output: "120",
    },
    {
      title: "Check Prime Number",
      content: `# Check Prime Number
  
  Determine if a given integer \`n\` is a prime number. A prime number is a number greater than 1 that has no positive divisors other than 1 and itself.
  Print "True" if it is prime, "False" otherwise.
  
  ---
  
  ### Example 1
  * **Input:** \`7\`
  * **Output:** \`True\`
  
  ### Example 2
  * **Input:** \`10\`
  * **Output:** \`False\`
  `,
      code: `#include <iostream>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "7",
      output: "True",
    },
    {
      title: "GCD of Two Numbers",
      content: `# Greatest Common Divisor
  
  Find the Greatest Common Divisor (GCD) of two integers \`a\` and \`b\`.
  
  ---
  
  ### Example 1
  * **Input:** \`12 18\`
  * **Output:** \`6\`
  
  ### Example 2
  * **Input:** \`101 103\`
  * **Output:** \`1\`
  `,
      code: `#include <iostream>
  #include <numeric>
  using namespace std;
  
  int main() {
      int a, b;
      cin >> a >> b;
      // Write your code here
      return 0;
  }`,
      input: "12 18",
      output: "6",
    },
    {
      title: "Leap Year Checker",
      content: `# Leap Year Checker
  
  Write a program to check if a year is a leap year. 
  * A year is a leap year if it is divisible by 4.
  * However, if the year is divisible by 100, it is NOT a leap year, unless...
  * The year is also divisible by 400.
  
  Print "True" or "False".
  
  ---
  
  ### Example 1
  * **Input:** \`2000\`
  * **Output:** \`True\`
  
  ### Example 2
  * **Input:** \`1900\`
  * **Output:** \`False\`
  `,
      code: `#include <iostream>
  using namespace std;
  
  int main() {
      int year;
      cin >> year;
      // Write your code here
      return 0;
  }`,
      input: "2000",
      output: "True",
    },
  
    // --- ARRAYS ---
    {
      title: "Maximum Element in Array",
      content: `# Find Maximum Element
  
  Given an integer \`n\` followed by an array of \`n\` integers, find the largest element.
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    5
    1 4 2 9 5
    \`\`\`
  * **Output:** \`9\`
  `,
      code: `#include <iostream>
  #include <vector>
  #include <algorithm>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "5\n1 4 2 9 5",
      output: "9",
    },
    {
      title: "Sum of Array Elements",
      content: `# Sum of Array
  
  Given an integer \`n\` and \`n\` integers, output the sum of all elements.
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    3
    10 20 30
    \`\`\`
  * **Output:** \`60\`
  `,
      code: `#include <iostream>
  #include <vector>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "3\n10 20 30",
      output: "60",
    },
    {
      title: "Rotate Array Left",
      content: `# Rotate Array Left
  
  Given an array of size \`n\` and an integer \`k\`, rotate the array to the left by \`k\` positions.
  Input format: First line \`n\` and \`k\`. Second line \`n\` integers.
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    5 2
    1 2 3 4 5
    \`\`\`
  * **Output:** \`3 4 5 1 2\`
  `,
      code: `#include <iostream>
  #include <vector>
  using namespace std;
  
  int main() {
      int n, k;
      cin >> n >> k;
      // Write your code here
      return 0;
  }`,
      input: "5 2\n1 2 3 4 5",
      output: "3 4 5 1 2",
    },
    {
      title: "Find Missing Number",
      content: `# Find Missing Number
  
  Given an array containing \`n\` distinct numbers taken from \`0, 1, 2, ..., n\`, find the one that is missing from the array.
  Input format: First line \`n\`. Second line \`n\` integers (the list with one missing).
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    3
    3 0 1
    \`\`\`
  * **Output:** \`2\`
  `,
      code: `#include <iostream>
  #include <vector>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "3\n3 0 1",
      output: "2",
    },
    {
      title: "Move Zeroes",
      content: `# Move Zeroes
  
  Given an array of size \`n\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    5
    0 1 0 3 12
    \`\`\`
  * **Output:** \`1 3 12 0 0\`
  `,
      code: `#include <iostream>
  #include <vector>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "5\n0 1 0 3 12",
      output: "1 3 12 0 0",
    },
  
    // --- STRINGS ---
    {
      title: "Reverse String",
      content: `# Reverse String
  
  Given a string, print it in reverse order.
  
  ---
  
  ### Example
  * **Input:** \`hello\`
  * **Output:** \`olleh\`
  `,
      code: `#include <iostream>
  #include <string>
  #include <algorithm>
  using namespace std;
  
  int main() {
      string s;
      cin >> s;
      // Write your code here
      return 0;
  }`,
      input: "hello",
      output: "olleh",
    },
    {
      title: "Valid Anagram",
      content: `# Valid Anagram
  
  Given two strings \`s\` and \`t\`, return "True" if \`t\` is an anagram of \`s\`, and "False" otherwise.
  An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.
  
  ---
  
  ### Example
  * **Input:** \`anagram nagaram\`
  * **Output:** \`True\`
  `,
      code: `#include <iostream>
  #include <string>
  #include <algorithm>
  using namespace std;
  
  int main() {
      string s, t;
      cin >> s >> t;
      // Write your code here
      return 0;
  }`,
      input: "anagram nagaram",
      output: "True",
    },
    {
      title: "Count Vowels",
      content: `# Count Vowels
  
  Count the number of vowels (a, e, i, o, u) in a given string (case insensitive).
  
  ---
  
  ### Example
  * **Input:** \`Education\`
  * **Output:** \`5\`
  `,
      code: `#include <iostream>
  #include <string>
  using namespace std;
  
  int main() {
      string s;
      cin >> s;
      // Write your code here
      return 0;
  }`,
      input: "Education",
      output: "5",
    },
    {
      title: "Longest Common Prefix",
      content: `# Longest Common Prefix
  
  Given an integer \`n\` and an array of \`n\` strings, find the longest common prefix string amongst them. If there is no common prefix, return an empty string.
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    3
    flower flow flight
    \`\`\`
  * **Output:** \`fl\`
  `,
      code: `#include <iostream>
  #include <vector>
  #include <string>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "3\nflower flow flight",
      output: "fl",
    },
  
    // --- SEARCHING & SORTING ---
    {
      title: "Binary Search",
      content: `# Binary Search
  
  Given a sorted array of \`n\` integers and a \`target\` value, return the index of the target. If not found, return -1.
  Input: First line \`n\` and \`target\`. Second line \`n\` sorted integers.
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    6 9
    -1 0 3 5 9 12
    \`\`\`
  * **Output:** \`4\`
  `,
      code: `#include <iostream>
  #include <vector>
  using namespace std;
  
  int main() {
      int n, target;
      cin >> n >> target;
      // Write your code here
      return 0;
  }`,
      input: "6 9\n-1 0 3 5 9 12",
      output: "4",
    },
    {
      title: "Selection Sort",
      content: `# Selection Sort
  
  Given an array of \`n\` integers, sort them in ascending order using any sorting algorithm (Selection Sort recommended for practice).
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    5
    64 25 12 22 11
    \`\`\`
  * **Output:** \`11 12 22 25 64\`
  `,
      code: `#include <iostream>
  #include <vector>
  #include <algorithm>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "5\n64 25 12 22 11",
      output: "11 12 22 25 64",
    },
  
    // --- BIT MANIPULATION ---
    {
      title: "Single Number",
      content: `# Single Number
  
  Given a non-empty array of integers where every element appears twice except for one. Find that single one.
  
  ---
  
  ### Example
  * **Input:** \`\`\`
    5
    4 1 2 1 2
    \`\`\`
  * **Output:** \`4\`
  `,
      code: `#include <iostream>
  #include <vector>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "5\n4 1 2 1 2",
      output: "4",
    },
    {
      title: "Counting Bits",
      content: `# Counting Bits
  
  Given an integer \`n\`, return the number of '1' bits (set bits) it has (also known as the Hamming weight).
  
  ---
  
  ### Example
  * **Input:** \`11\` (Binary: 1011)
  * **Output:** \`3\`
  `,
      code: `#include <iostream>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "11",
      output: "3",
    },
  
    // --- RECURSION & OTHERS ---
    {
      title: "Climbing Stairs",
      content: `# Climbing Stairs
  
  You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
  
  ---
  
  ### Example
  * **Input:** \`3\`
  * **Output:** \`3\`
  * **Explanation:** (1+1+1), (1+2), (2+1)
  `,
      code: `#include <iostream>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "3",
      output: "3",
    },
    {
      title: "Power of Two",
      content: `# Power of Two
  
  Given an integer \`n\`, return "True" if it is a power of two. Otherwise, return "False".
  
  ---
  
  ### Example 1
  * **Input:** \`16\`
  * **Output:** \`True\`
  
  ### Example 2
  * **Input:** \`3\`
  * **Output:** \`False\`
  `,
      code: `#include <iostream>
  using namespace std;
  
  int main() {
      int n;
      cin >> n;
      // Write your code here
      return 0;
  }`,
      input: "16",
      output: "True",
    },
    {
      title: "Valid Parentheses",
      content: `# Valid Parentheses
  
  Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
  Open brackets must be closed by the same type of brackets in the correct order.
  
  ---
  
  ### Example
  * **Input:** \`()[]{}\`
  * **Output:** \`True\`
  `,
      code: `#include <iostream>
  #include <stack>
  #include <string>
  using namespace std;
  
  int main() {
      string s;
      cin >> s;
      // Write your code here
      return 0;
  }`,
      input: "()[]{}",
      output: "True",
    },
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