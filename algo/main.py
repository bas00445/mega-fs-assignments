from solve import solve


def main():
    r1 = solve(["ab", "bc", "cd"], "abcd")
    r2 = solve(["ab", "bc", "cd"], "cdab")
    r3 = solve(["ab", "bc", "cd"], "abab")

    print("r1", r1)
    print("r2", r2)
    print("r3", r3)


main()
