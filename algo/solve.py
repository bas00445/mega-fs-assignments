def solve(wordList, target):
    if (len(wordList) == 0 or (len(wordList) == 1 and wordList[0] == '')):
        return None

    pairs = {}

    for word in wordList:
        splitWord = target.split(word)

        if (len(splitWord) == 1):
            # Can't split target by word
            continue

        matchingWord = splitWord[1] if splitWord[0] == '' else splitWord[0]
        pairs[matchingWord] = True

        if (word in pairs):
            if (splitWord[0] == ''):
                return (word, matchingWord)
            if (splitWord[1] == ''):
                return (matchingWord, word)

    return None


# This is a brute force version
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
