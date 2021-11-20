def solve(wordList, target):
    result = []

    if (len(wordList) == 1 and wordList[0] == ''):
        return None

    for word in wordList:
        splitWords = target.split(word)

        if ("" in splitWords):
            splitWords.remove("")
            result.append(splitWords[0])

    for i in range(len(result)-1):
        cur = result[i]
        next = result[i+1]

        if (cur+next == target):
            return (cur, next)
        elif (next+cur == target):
            return (next, cur)

    return None


def solve_slower(wordList, target):
    result = []

    for i in range(0, len(wordList)):
        for j in range(0, len(wordList)):
            if (i == j):
                continue

            tempWord = wordList[i] + wordList[j]

            if (tempWord == target):
                result.append(wordList[i])
                result.append(wordList[j])

                if (len(result) == 2):
                    return tuple(result)

    return None
