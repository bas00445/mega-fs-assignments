def solve(wordList, target):
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
