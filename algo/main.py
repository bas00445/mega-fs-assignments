from solve import solve


def main():
    r1 = solve(["ab", "bc"], "abcd")  # ("ab", "cd")
    print(r1)

    r2 = solve(["ab", "bc", "cd"], "cdab")  # ("cd", "ab")
    print(r2)

    r3 = solve(["ab", "bc", "cd"], "abab")  # None
    print(r3)


main()
