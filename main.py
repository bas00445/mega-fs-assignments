from solve import solve


def main():
    r1 = solve(["ab", "bc", "cd"], "abcd")  # ("ab", "cd")
    r2 = solve(["ab", "bc", "cd"], "cdab")  # ("cd", "ab")
    r3 = solve(["ab", "bc", "cd"], "abab")  # None

    print(r1)
    print(r2)
    print(r3)


main()
