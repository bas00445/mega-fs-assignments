def solve(wordList, target):
    result = []

    if (len(wordList) == 1 and wordList[0] == ''):
        return None

    for word in wordList:
        splitWords = target.split(word)

        if ("" in splitWords):
            splitWords.remove("")
            result.append(splitWords[0])

    if (len(result) == 2):
        first = result[0]
        second = result[1]

        if (first+second == target):
            return (first, second)
        elif (second+first == target):
            return (second, first)

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
