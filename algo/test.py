from solve import solve

import unittest


class TestSolve(unittest.TestCase):
    def test_solve_case1(self):
        self.assertEqual(solve(["ab", "bc", "cd"], "abcd"), ("ab", "cd"))

    def test_solve_case2(self):
        self.assertEqual(solve(["ab", "bc", "cd"], "cdab"), ("cd", "ab"))

    def test_solve_case3(self):
        self.assertEqual(solve(["ab", "bc", "cd"], "abab"), None)

    def test_solve_case4(self):
        self.assertEqual(solve(["ab", "bc", "cd"], "abcd"), ("ab", "cd"))

    def test_solve_case5(self):
        self.assertEqual(solve(["ab", "bc", "cd"], "abcdx"), None)

    def test_solve_case6(self):
        self.assertEqual(solve(["ab", "bc"], "abbc"), ("ab", "bc"))

    def test_solve_case7(self):
        self.assertEqual(solve(["ab"], "abbc"), None)

    def test_solve_case8(self):
        self.assertEqual(solve(["ab", "bb", "bc"], "bbbc"), ("bb", "bc"))

    def test_solve_case9(self):
        self.assertEqual(solve([""], "abbc"), None)

    def test_solve_case10(self):
        self.assertEqual(solve([], ""), None)


if __name__ == '__main__':
    unittest.main()
