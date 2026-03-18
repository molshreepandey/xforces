import { prisma } from "../src/index";

async function main() {
  // Clear existing problems to start fresh
  await prisma.problems.deleteMany();

  const classCode = `class Solution {
private:
    vector<vector<int>> all_states;

    void backtrack(const vector<int>& candidates, int target, vector<int>& current, int index, vector<vector<int>>& results) {
        vector<char> bloat(1024 * 1024, 0); // 1MB leak per frame

        if (target == 0) {
            results.push_back(current);
            all_states.push_back(current);
            return;
        }

        for (int i = index; i < (int)candidates.size(); ++i) {
            if (target - candidates[i] >= 0) {
                current.push_back(candidates[i]);
                all_states.push_back(current);
                backtrack(candidates, target - candidates[i], current, i, results);
                current.pop_back();
            }
        }
    }

public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> results;
        vector<int> current;
        backtrack(candidates, target, current, 0, results);
        return results;
    }
};`;

  const mainCode = `#include <competition.h>

using namespace std;

// The class code will be injected right here
{{classcode}}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int fd3 = 3;
    int num_testcases;
    if (!(cin >> num_testcases)) return 0;

    while (num_testcases--) {
        int n, target;
        cin >> n >> target;

        vector<int> candidates(n);
        for (int i = 0; i < n; ++i) cin >> candidates[i];

        sort(candidates.begin(), candidates.end());
        candidates.erase(unique(candidates.begin(), candidates.end()), candidates.end());

        // Instantiate the injected class and call the main logic
        Solution sol;
        vector<vector<int>> results = sol.combinationSum(candidates, target);

        string final_output = "[";
        for (size_t i = 0; i < results.size(); ++i) {
            final_output += "[";
            for (size_t j = 0; j < results[i].size(); ++j) {
                final_output += to_string(results[i][j]);
                if (j < results[i].size() - 1) final_output += ",";
            }
            final_output += "]";
            if (i < results.size() - 1) final_output += ",";
        }
        final_output += "]\\n";

        write(fd3, final_output.c_str(), final_output.length());
    }

    fsync(fd3);
    return 0;
}`;

  const testcases = [
    { input: "4 7\n2 3 6 7\n", output: "[[2,2,3],[7]]" },
    { input: "3 8\n2 3 5\n", output: "[[2,2,2,2],[2,3,3],[3,5]]" },
    { input: "1 2\n1\n", output: "[[1,1]]" },
    { input: "1 1\n2\n", output: "[]" },
    { input: "2 3\n1 2\n", output: "[[1,1,1],[1,2]]" },
    { input: "3 6\n2 3 4\n", output: "[[2,2,2],[2,4],[3,3]]" },
    {
      input: "4 5\n1 2 3 4\n",
      output: "[[1,1,1,1,1],[1,1,1,2],[1,1,3],[1,2,2],[1,4],[2,3]]",
    },
    { input: "2 10\n5 10\n", output: "[[5,5],[10]]" },
    { input: "3 9\n3 6 9\n", output: "[[3,3,3],[3,6],[9]]" },
    { input: "2 1\n1 2\n", output: "[[1]]" },
    { input: "4 8\n2 4 6 8\n", output: "[[2,2,2,2],[2,2,4],[2,6],[4,4],[8]]" },
    { input: "3 7\n2 4 6\n", output: "[]" },
    { input: "4 8\n2 4 6 8\n", output: "[[2,2,2,2],[2,2,4],[2,6],[4,4],[8]]" },
    { input: "2 4\n2 3\n", output: "[[2,2]]" },
    { input: "1 10\n2\n", output: "[[2,2,2,2,2]]" },
    { input: "3 10\n3 5 7\n", output: "[[3,7],[5,5]]" },
    {
      input: "4 6\n1 2 5 6\n",
      output: "[[1,1,1,1,1,1],[1,1,1,1,2],[1,1,2,2],[1,5],[2,2,2],[6]]",
    },
    { input: "2 2\n2 3\n", output: "[[2]]" },
    { input: "3 4\n1 1 1\n", output: "[[1,1,1,1]]" },
    {
      input: "4 12\n3 4 6 12\n",
      output: "[[3,3,3,3],[3,3,6],[4,4,4],[6,6],[12]]",
    },
    { input: "3 10\n2 3 5\n", output: "[[2,2,2,2,2],[2,2,3,3],[2,3,5],[5,5]]" },
    {
      input: "5 10\n2 4 6 8 10\n",
      output: "[[2,2,2,2,2],[2,2,2,4],[2,2,6],[2,4,4],[2,8],[4,6],[10]]",
    },
    { input: "3 11\n3 4 5\n", output: "[[3,3,5],[3,4,4]]" },
    { input: "2 7\n3 5\n", output: "[]" },
    { input: "4 9\n2 3 5 7\n", output: "[[2,2,2,3],[2,2,5],[2,7],[3,3,3]]" },
    { input: "1 5\n5\n", output: "[[5]]" },
    { input: "3 12\n4 8 12\n", output: "[[4,4,4],[4,8],[12]]" },
    { input: "2 15\n5 10\n", output: "[[5,5,5],[5,10]]" },
    { input: "3 2\n2 4 6\n", output: "[[2]]" },
    {
      input: "4 10\n1 3 7 10\n",
      output:
        "[[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,3],[1,1,1,1,3,3],[1,1,1,7],[1,3,3,3],[3,7],[10]]",
    },
  ];

  const problem = await prisma.problems.create({
    data: {
      title: "Combination Sum",
      statement:
        "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.\n\nThe same number may be chosen from `candidates` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
      timelimit: 2000,
      memorylimit: 256,
      codes: {
        create: {
          classcode: classCode,
          maincode: mainCode,
          language: "cpp",
        },
      },
      testcases: {
        create: testcases,
      },
    },
  });

  console.log(`Created problem with id: ${problem.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
