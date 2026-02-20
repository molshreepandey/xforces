import {prisma} from "../src/index";

async function main() {
  console.log('Start seeding...');

  await prisma.questions.deleteMany();
  const questions = [
    {
      title: "Factorial Calculation",
      content: `# Factorial Calculation\n\nWrite a program to calculate the factorial of a given non-negative integer \`n\`. The factorial of a number is the product of all integers from 1 to that number.\n\n---\n\n### Example 1\n* **Input:** \`5\`\n* **Output:** \`120\`\n* **Explanation:** 5 * 4 * 3 * 2 * 1 = 120\n\n### Example 2\n* **Input:** \`0\`\n* **Output:** \`1\``,
      headercode: `#include <iostream>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int factorial(int n) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        Solution obj;\n        cout << obj.factorial(n) << endl;\n    }\n    return 0;\n}`,
      input: "5",
      output: "120",
    },
    {
      title: "Check Prime Number",
      content: `# Check Prime Number\n\nDetermine if a given integer \`n\` is a prime number. A prime number is a number greater than 1 that has no positive divisors other than 1 and itself.\nPrint "True" if it is prime, "False" otherwise.\n\n---\n\n### Example 1\n* **Input:** \`7\`\n* **Output:** \`True\`\n\n### Example 2\n* **Input:** \`10\`\n* **Output:** \`False\``,
      headercode: `#include <iostream>\n#include <string>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    string isPrime(int n) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        Solution obj;\n        cout << obj.isPrime(n) << endl;\n    }\n    return 0;\n}`,
      input: "7",
      output: "True",
    },
    {
      title: "GCD of Two Numbers",
      content: `# Greatest Common Divisor\n\nFind the Greatest Common Divisor (GCD) of two integers \`a\` and \`b\`.\n\n---\n\n### Example 1\n* **Input:** \`12 18\`\n* **Output:** \`6\`\n\n### Example 2\n* **Input:** \`101 103\`\n* **Output:** \`1\``,
      headercode: `#include <iostream>\n#include <numeric>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int gcd(int a, int b) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int a, b;\n    if (cin >> a >> b) {\n        Solution obj;\n        cout << obj.gcd(a, b) << endl;\n    }\n    return 0;\n}`,
      input: "12 18",
      output: "6",
    },
    {
      title: "Leap Year Checker",
      content: `# Leap Year Checker\n\nWrite a program to check if a year is a leap year. \n* A year is a leap year if it is divisible by 4.\n* However, if the year is divisible by 100, it is NOT a leap year, unless...\n* The year is also divisible by 400.\n\nPrint "True" or "False".\n\n---\n\n### Example 1\n* **Input:** \`2000\`\n* **Output:** \`True\`\n\n### Example 2\n* **Input:** \`1900\`\n* **Output:** \`False\``,
      headercode: `#include <iostream>\n#include <string>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    string isLeapYear(int year) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int year;\n    if (cin >> year) {\n        Solution obj;\n        cout << obj.isLeapYear(year) << endl;\n    }\n    return 0;\n}`,
      input: "2000",
      output: "True",
    },
  
    {
      title: "Maximum Element in Array",
      content: `# Find Maximum Element\n\nGiven an integer \`n\` followed by an array of \`n\` integers, find the largest element.\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n5\n1 4 2 9 5\n\`\`\`\n* **Output:** \`9\``,
      headercode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int findMax(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) cin >> nums[i];\n        Solution obj;\n        cout << obj.findMax(nums) << endl;\n    }\n    return 0;\n}`,
      input: "5\n1 4 2 9 5",
      output: "9",
    },
    {
      title: "Sum of Array Elements",
      content: `# Sum of Array\n\nGiven an integer \`n\` and \`n\` integers, output the sum of all elements.\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n3\n10 20 30\n\`\`\`\n* **Output:** \`60\``,
      headercode: `#include <iostream>\n#include <vector>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int sumArray(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) cin >> nums[i];\n        Solution obj;\n        cout << obj.sumArray(nums) << endl;\n    }\n    return 0;\n}`,
      input: "3\n10 20 30",
      output: "60",
    },
    {
      title: "Rotate Array Left",
      content: `# Rotate Array Left\n\nGiven an array of size \`n\` and an integer \`k\`, rotate the array to the left by \`k\` positions.\nInput format: First line \`n\` and \`k\`. Second line \`n\` integers.\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n5 2\n1 2 3 4 5\n\`\`\`\n* **Output:** \`3 4 5 1 2\``,
      headercode: `#include <iostream>\n#include <vector>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    vector<int> rotateLeft(vector<int>& nums, int k) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n, k;\n    if (cin >> n >> k) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) cin >> nums[i];\n        Solution obj;\n        vector<int> res = obj.rotateLeft(nums, k);\n        for(size_t i=0; i<res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");\n        cout << endl;\n    }\n    return 0;\n}`,
      input: "5 2\n1 2 3 4 5",
      output: "3 4 5 1 2",
    },
    {
      title: "Find Missing Number",
      content: `# Find Missing Number\n\nGiven an array containing \`n\` distinct numbers taken from \`0, 1, 2, ..., n\`, find the one that is missing from the array.\nInput format: First line \`n\`. Second line \`n\` integers (the list with one missing).\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n3\n3 0 1\n\`\`\`\n* **Output:** \`2\``,
      headercode: `#include <iostream>\n#include <vector>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) cin >> nums[i];\n        Solution obj;\n        cout << obj.missingNumber(nums) << endl;\n    }\n    return 0;\n}`,
      input: "3\n3 0 1",
      output: "2",
    },
    {
      title: "Move Zeroes",
      content: `# Move Zeroes\n\nGiven an array of size \`n\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n5\n0 1 0 3 12\n\`\`\`\n* **Output:** \`1 3 12 0 0\``,
      headercode: `#include <iostream>\n#include <vector>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    vector<int> moveZeroes(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) cin >> nums[i];\n        Solution obj;\n        vector<int> res = obj.moveZeroes(nums);\n        for(size_t i=0; i<res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");\n        cout << endl;\n    }\n    return 0;\n}`,
      input: "5\n0 1 0 3 12",
      output: "1 3 12 0 0",
    },
  
    {
      title: "Reverse String",
      content: `# Reverse String\n\nGiven a string, print it in reverse order.\n\n---\n\n### Example\n* **Input:** \`hello\`\n* **Output:** \`olleh\``,
      headercode: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    string reverseString(string s) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    string s;\n    if (cin >> s) {\n        Solution obj;\n        cout << obj.reverseString(s) << endl;\n    }\n    return 0;\n}`,
      input: "hello",
      output: "olleh",
    },
    {
      title: "Valid Anagram",
      content: `# Valid Anagram\n\nGiven two strings \`s\` and \`t\`, return "True" if \`t\` is an anagram of \`s\`, and "False" otherwise.\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.\n\n---\n\n### Example\n* **Input:** \`anagram nagaram\`\n* **Output:** \`True\``,
      headercode: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    string isAnagram(string s, string t) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    string s, t;\n    if (cin >> s >> t) {\n        Solution obj;\n        cout << obj.isAnagram(s, t) << endl;\n    }\n    return 0;\n}`,
      input: "anagram nagaram",
      output: "True",
    },
    {
      title: "Count Vowels",
      content: `# Count Vowels\n\nCount the number of vowels (a, e, i, o, u) in a given string (case insensitive).\n\n---\n\n### Example\n* **Input:** \`Education\`\n* **Output:** \`5\``,
      headercode: `#include <iostream>\n#include <string>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int countVowels(string s) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    string s;\n    if (cin >> s) {\n        Solution obj;\n        cout << obj.countVowels(s) << endl;\n    }\n    return 0;\n}`,
      input: "Education",
      output: "5",
    },
    {
      title: "Longest Common Prefix",
      content: `# Longest Common Prefix\n\nGiven an integer \`n\` and an array of \`n\` strings, find the longest common prefix string amongst them. If there is no common prefix, return an empty string.\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n3\nflower flow flight\n\`\`\`\n* **Output:** \`fl\``,
      headercode: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        vector<string> strs(n);\n        for(int i=0; i<n; i++) cin >> strs[i];\n        Solution obj;\n        cout << obj.longestCommonPrefix(strs) << endl;\n    }\n    return 0;\n}`,
      input: "3\nflower flow flight",
      output: "fl",
    },
  
    {
      title: "Binary Search",
      content: `# Binary Search\n\nGiven a sorted array of \`n\` integers and a \`target\` value, return the index of the target. If not found, return -1.\nInput: First line \`n\` and \`target\`. Second line \`n\` sorted integers.\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n6 9\n-1 0 3 5 9 12\n\`\`\`\n* **Output:** \`4\``,
      headercode: `#include <iostream>\n#include <vector>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n, target;\n    if (cin >> n >> target) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) cin >> nums[i];\n        Solution obj;\n        cout << obj.search(nums, target) << endl;\n    }\n    return 0;\n}`,
      input: "6 9\n-1 0 3 5 9 12",
      output: "4",
    },
    {
      title: "Selection Sort",
      content: `# Selection Sort\n\nGiven an array of \`n\` integers, sort them in ascending order using any sorting algorithm (Selection Sort recommended for practice).\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n5\n64 25 12 22 11\n\`\`\`\n* **Output:** \`11 12 22 25 64\``,
      headercode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) cin >> nums[i];\n        Solution obj;\n        vector<int> res = obj.sortArray(nums);\n        for(size_t i=0; i<res.size(); i++) cout << res[i] << (i == res.size()-1 ? "" : " ");\n        cout << endl;\n    }\n    return 0;\n}`,
      input: "5\n64 25 12 22 11",
      output: "11 12 22 25 64",
    },
  
    {
      title: "Single Number",
      content: `# Single Number\n\nGiven a non-empty array of integers where every element appears twice except for one. Find that single one.\n\n---\n\n### Example\n* **Input:** \n\`\`\`\n5\n4 1 2 1 2\n\`\`\`\n* **Output:** \`4\``,
      headercode: `#include <iostream>\n#include <vector>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        vector<int> nums(n);\n        for(int i=0; i<n; i++) cin >> nums[i];\n        Solution obj;\n        cout << obj.singleNumber(nums) << endl;\n    }\n    return 0;\n}`,
      input: "5\n4 1 2 1 2",
      output: "4",
    },
    {
      title: "Counting Bits",
      content: `# Counting Bits\n\nGiven an integer \`n\`, return the number of '1' bits (set bits) it has (also known as the Hamming weight).\n\n---\n\n### Example\n* **Input:** \`11\` (Binary: 1011)\n* **Output:** \`3\``,
      headercode: `#include <iostream>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int countBits(int n) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        Solution obj;\n        cout << obj.countBits(n) << endl;\n    }\n    return 0;\n}`,
      input: "11",
      output: "3",
    },
  
    {
      title: "Climbing Stairs",
      content: `# Climbing Stairs\n\nYou are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n---\n\n### Example\n* **Input:** \`3\`\n* **Output:** \`3\`\n* **Explanation:** (1+1+1), (1+2), (2+1)`,
      headercode: `#include <iostream>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        Solution obj;\n        cout << obj.climbStairs(n) << endl;\n    }\n    return 0;\n}`,
      input: "3",
      output: "3",
    },
    {
      title: "Power of Two",
      content: `# Power of Two\n\nGiven an integer \`n\`, return "True" if it is a power of two. Otherwise, return "False".\n\n---\n\n### Example 1\n* **Input:** \`16\`\n* **Output:** \`True\`\n\n### Example 2\n* **Input:** \`3\`\n* **Output:** \`False\``,
      headercode: `#include <iostream>\n#include <string>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    string isPowerOfTwo(int n) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    int n;\n    if (cin >> n) {\n        Solution obj;\n        cout << obj.isPowerOfTwo(n) << endl;\n    }\n    return 0;\n}`,
      input: "16",
      output: "True",
    },
    {
      title: "Valid Parentheses",
      content: `# Valid Parentheses\n\nGiven a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\nOpen brackets must be closed by the same type of brackets in the correct order.\n\n---\n\n### Example\n* **Input:** \`()[]{}\`\n* **Output:** \`True\``,
      headercode: `#include <iostream>\n#include <stack>\n#include <string>\nusing namespace std;`,
      code: `class Solution {\npublic:\n    string isValid(string s) {\n        // Write your code here\n        \n    }\n};`,
      maincode: `int main() {\n    string s;\n    if (cin >> s) {\n        Solution obj;\n        cout << obj.isValid(s) << endl;\n    }\n    return 0;\n}`,
      input: "()[]{}",
      output: "True",
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