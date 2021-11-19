from solve import solve


def test_solve_case1():
    assert solve(["ab", "bc", "cd"], "abcd") == ("ab", "cd")


def test_solve_case2():
    assert solve(["ab", "bc", "cd"], "cdab") == ("cd", "ab")


def test_solve_case3():
    assert solve(["ab", "bc", "cd"], "abab") == None


def test_solve_case4():
    assert solve(["ab", "bc", "cd"], "abcd") == ("ab", "cd")


def test_solve_case5():
    assert solve(["ab", "bc", "cd"], "abcdx") == None


def test_solve_case6():
    assert solve(["ab", "bc"], "abbc") == ("ab", "bc")


def test_solve_case7():
    assert solve(["ab"], "abbc") == None


def test_solve_case8():
    assert solve(["ab", "bb", "bc"], "bbbc") == ("bb", "bc")


def test_solve_case9():
    assert solve([""], "abbc") == None


def test_solve_case10():
    assert solve([], "") == None


if __name__ == "__main__":
    test_solve_case1()
    test_solve_case2()
    test_solve_case3()
    test_solve_case4()
    test_solve_case5()
    test_solve_case6()
    test_solve_case7()
    test_solve_case8()
    test_solve_case9()
    test_solve_case10()

    print("Everything working fine")
